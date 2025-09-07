import { NextRequest, NextResponse } from 'next/server';
import { createBuildSafeResponse } from '@/lib/build-utils';
import { z } from 'zod';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Schema for order creation
const CustomerInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  parish: z.string().optional(),
  district: z.string().min(1, 'District is required'),
  landmark: z.string().optional(),
  deliveryNotes: z.string().optional(),
});

const OrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  productName: z.string(),
});

const CreateOrderSchema = z.object({
  customerInfo: CustomerInfoSchema,
  items: z.array(OrderItemSchema).min(1, 'At least one item is required'),
  subtotal: z.number().min(0),
  deliveryFee: z.number().min(0),
  total: z.number().min(0),
  paymentMethod: z.literal('cash_on_delivery'),
});

// Generate order number
function generateOrderNumber(): string {
  const prefix = 'YD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({
      success: true,
      orderId: 'build-time-order',
    });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse, { status: 201 });
    }

    const body = await request.json();
    const orderData = CreateOrderSchema.parse(body);

    // Validate that all products exist and have sufficient stock
    for (const item of orderData.items) {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 404 }
        );
      }

      const availableQuantity = product.quantity || 0;
      if (availableQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${availableQuantity}, Requested: ${item.quantity}` },
          { status: 400 }
        );
      }
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const customerName = `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`;
    const shippingAddress = {
      firstName: orderData.customerInfo.firstName,
      lastName: orderData.customerInfo.lastName,
      address: orderData.customerInfo.address,
      city: orderData.customerInfo.city,
      parish: orderData.customerInfo.parish,
      district: orderData.customerInfo.district,
      landmark: orderData.customerInfo.landmark,
      deliveryNotes: orderData.customerInfo.deliveryNotes,
    };
    
    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        customerEmail: orderData.customerInfo.email || 'no-email@example.com',
        customerPhone: orderData.customerInfo.phone,
        shippingAddress,
        subtotal: orderData.subtotal.toString(),
        shippingAmount: orderData.deliveryFee.toString(),
        totalAmount: orderData.total.toString(),
        paymentMethod: 'cash_on_delivery',
        status: 'pending',
        paymentStatus: 'pending',
      })
      .returning();

    // Create order items and update product quantities
    for (const item of orderData.items) {
      // Add order item
      await db
        .insert(orderItems)
        .values({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price.toString(),
          totalPrice: (item.price * item.quantity).toString(),
          productName: item.productName,
        });

      // Update product quantity
      const [currentProduct] = await db
        .select({ quantity: products.quantity })
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);
        
      const currentQuantity = currentProduct.quantity || 0;
      await db
        .update(products)
        .set({
          quantity: currentQuantity - item.quantity,
          updatedAt: new Date(),
        })
        .where(eq(products.id, item.productId));
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      message: 'Order created successfully',
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid order data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get orders (for admin or customer)
export async function GET(request: NextRequest) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({
      orders: [],
    });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const phone = searchParams.get('phone');

    // Add pagination
    const offset = (page - 1) * limit;
    
    // Build query with conditions
    let ordersList;
    if (status && phone) {
      ordersList = await db
        .select()
        .from(orders)
        .where(and(eq(orders.status, status as any), eq(orders.customerPhone, phone)))
        .orderBy(orders.createdAt)
        .limit(limit)
        .offset(offset);
    } else if (status) {
      ordersList = await db
        .select()
        .from(orders)
        .where(eq(orders.status, status as any))
        .orderBy(orders.createdAt)
        .limit(limit)
        .offset(offset);
    } else if (phone) {
      ordersList = await db
        .select()
        .from(orders)
        .where(eq(orders.customerPhone, phone))
        .orderBy(orders.createdAt)
        .limit(limit)
        .offset(offset);
    } else {
      ordersList = await db
        .select()
        .from(orders)
        .orderBy(orders.createdAt)
        .limit(limit)
        .offset(offset);
    }

    // Get total count for pagination
    const totalQuery = db.select().from(orders);
    const total = (await totalQuery).length;

    return NextResponse.json({
      orders: ordersList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
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