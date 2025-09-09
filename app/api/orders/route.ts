import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db/connection';
import { eq, desc, and, count, inArray } from 'drizzle-orm';
import { z } from 'zod';

const { orders, orderItems, products, users } = schema;

// Order creation schema
const createOrderSchema = z.object({
  customerInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().optional(),
  }),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.string().regex(/^\d+(\.\d{2})?$/, 'Invalid price format'),
  })).min(1, 'At least one item is required'),
  paymentMethod: z.enum(['cash_on_delivery', 'mobile_money', 'bank_transfer']).default('cash_on_delivery'),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Calculate total amount
    let totalAmount = 0;
    for (const item of validatedData.items) {
      totalAmount += parseFloat(item.price) * item.quantity;
    }

    // Validate products exist and have enough stock
    const productIds = validatedData.items.map(item => item.productId);
    const productList = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        quantity: products.quantity,
      })
      .from(products)
      .where(inArray(products.id, productIds));

    // Check if all products exist
    if (productList.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 400 }
      );
    }

    // Check stock availability
    for (const item of validatedData.items) {
      const product = productList.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 400 }
        );
      }
      if (product.quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}` },
          { status: 400 }
        );
      }
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create the order
    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        status: 'pending',
        paymentStatus: 'pending',
        shippingStatus: 'not_shipped',
        subtotal: totalAmount.toFixed(2),
        taxAmount: '0.00',
        shippingAmount: '0.00',
        discountAmount: '0.00',
        totalAmount: totalAmount.toFixed(2),
        currency: 'UGX',
        paymentMethod: validatedData.paymentMethod,
        customerName: validatedData.customerInfo.name,
        customerEmail: validatedData.customerInfo.email,
        customerPhone: validatedData.customerInfo.phone,
        shippingAddress: {
          address: validatedData.customerInfo.address,
          city: validatedData.customerInfo.city,
          postalCode: validatedData.customerInfo.postalCode || '',
        },
        billingAddress: {
          address: validatedData.customerInfo.address,
          city: validatedData.customerInfo.city,
          postalCode: validatedData.customerInfo.postalCode || '',
        },
        notes: validatedData.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Create order items and update product quantities
    const orderItemsData = validatedData.items.map(item => {
      const product = productList.find(p => p.id === item.productId);
      return {
        orderId: newOrder.id,
        productId: item.productId,
        productName: product?.name || 'Unknown Product',
        productSku: '', // We don't have SKU in the current data
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: (parseFloat(item.price) * item.quantity).toFixed(2),
        productSnapshot: {
          name: product?.name,
          price: product?.price,
        },
      };
    });

    await db.insert(orderItems).values(orderItemsData);

    // Update product quantities
    for (const item of validatedData.items) {
      const product = productList.find(p => p.id === item.productId);
      if (product) {
        await db
          .update(products)
          .set({
            quantity: product.quantity - item.quantity,
            updatedAt: new Date(),
          })
          .where(eq(products.id, item.productId));
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: newOrder.id,
        orderNumber: newOrder.orderNumber,
        totalAmount: newOrder.totalAmount,
        status: newOrder.status,
      },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid order data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const offset = (page - 1) * limit;

    // Filters
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');

    // Build conditions
    const conditions = [];
    
    if (status) {
      conditions.push(eq(orders.status, status));
    }
    
    if (paymentStatus) {
      conditions.push(eq(orders.paymentStatus, paymentStatus));
    }

    // Build base query
    let query = db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        shippingStatus: orders.shippingStatus,
        subtotal: orders.subtotal,
        totalAmount: orders.totalAmount,
        currency: orders.currency,
        paymentMethod: orders.paymentMethod,
        customerName: orders.customerName,
        customerEmail: orders.customerEmail,
        customerPhone: orders.customerPhone,
        shippingAddress: orders.shippingAddress,
        billingAddress: orders.billingAddress,
        notes: orders.notes,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
      })
      .from(orders);

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply ordering and pagination
    const result = await query
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    let countQuery = db.select({ count: count() }).from(orders);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const [{ count: totalCount }] = await countQuery;

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      orders: result,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}