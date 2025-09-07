import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/drizzle';
import { carts, cartItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Schema for cart operations
const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  sessionId: z.string(),
});

const UpdateCartSchema = z.object({
  productId: z.string(),
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

    return NextResponse.json({
      cartId: cart.id,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0),
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, sessionId } = CartItemSchema.parse(body);

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

    // Get product details
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
      // Update quantity
      await db
        .update(cartItems)
        .set({ 
          quantity: existingItem.quantity + quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Add new item
      await db
        .insert(cartItems)
        .values({
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
        });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
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

    if (quantity === 0) {
      // Remove item from cart
      await db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, productId)
          )
        );
    } else {
      // Update quantity
      await db
        .update(cartItems)
        .set({ 
          quantity,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, productId)
          )
        );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating cart:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear cart or remove specific item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const productId = searchParams.get('productId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
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

    if (productId) {
      // Remove specific item
      await db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, productId)
          )
        );
    } else {
      // Clear entire cart
      await db
        .delete(cartItems)
        .where(eq(cartItems.cartId, cart.id));
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting from cart:', error);
    return NextResponse.json(
      { error: 'Failed to delete from cart' },
      { status: 500 }
    );
  }
}