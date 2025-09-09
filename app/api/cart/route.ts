import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db, carts, cartItems, products } from '@/lib/db/connection';
import { eq, and } from 'drizzle-orm';

// Schema for cart operations
const CartItemSchema = z.object({
  productId: z.number().or(z.string().transform(val => parseInt(val, 10))),
  quantity: z.number().min(1),
  sessionId: z.string(),
});

const UpdateCartSchema = z.object({
  productId: z.number().or(z.string().transform(val => parseInt(val, 10))),
  quantity: z.number().min(0),
  sessionId: z.string(),
});

// GET /api/cart - Get cart items for session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get or create cart for session
    let [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.sessionId, sessionId))
      .limit(1);

    if (!cart) {
      [cart] = await db
        .insert(carts)
        .values({
          sessionId,
          userId: null, // Guest cart
        })
        .returning();
    }

    // Get cart items with product details
    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        price: cartItems.price,
        productId: cartItems.productId,
        product: {
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          images: products.images,
          brand: products.brand,
          size: products.size,
          color: products.color,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cart.id));

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    return NextResponse.json({
      cartId: cart.id,
      items,
      totalItems,
      totalAmount: totalAmount.toFixed(2),
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, sessionId } = CartItemSchema.parse(body);

    // Verify product exists
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if product has enough stock
    if (product.quantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock available' },
        { status: 400 }
      );
    }

    // Get or create cart for session
    let [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.sessionId, sessionId))
      .limit(1);

    if (!cart) {
      [cart] = await db
        .insert(carts)
        .values({
          sessionId,
          userId: null, // Guest cart
        })
        .returning();
    }

    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cart.id),
          eq(cartItems.productId, productId)
        )
      )
      .limit(1);

    if (existingItem) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.quantity < newQuantity) {
        return NextResponse.json(
          { error: 'Insufficient stock for requested quantity' },
          { status: 400 }
        );
      }

      await db
        .update(cartItems)
        .set({
          quantity: newQuantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Add new item to cart
      await db
        .insert(cartItems)
        .values({
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Item added to cart successfully',
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to add item to cart', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, sessionId } = UpdateCartSchema.parse(body);

    // Get cart for session
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.sessionId, sessionId))
      .limit(1);

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Get cart item
    const [cartItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cart.id),
          eq(cartItems.productId, productId)
        )
      )
      .limit(1);

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      // Remove item from cart
      await db
        .delete(cartItems)
        .where(eq(cartItems.id, cartItem.id));

      return NextResponse.json({
        success: true,
        message: 'Item removed from cart',
      });
    } else {
      // Verify product has enough stock
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      if (product.quantity < quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock available' },
          { status: 400 }
        );
      }

      // Update item quantity
      await db
        .update(cartItems)
        .set({
          quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, cartItem.id));

      return NextResponse.json({
        success: true,
        message: 'Cart item updated successfully',
      });
    }

  } catch (error) {
    console.error('Error updating cart:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update cart item', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = parseInt(searchParams.get('productId') || '0');
    const sessionId = searchParams.get('sessionId');

    if (!productId || !sessionId) {
      return NextResponse.json(
        { error: 'Product ID and Session ID are required' },
        { status: 400 }
      );
    }

    // Get cart for session
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.sessionId, sessionId))
      .limit(1);

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Delete cart item
    const deleted = await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cart.id),
          eq(cartItems.productId, productId)
        )
      );

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
    });

  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart', details: error.message },
      { status: 500 }
    );
  }
}