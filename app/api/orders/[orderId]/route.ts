import { NextRequest, NextResponse } from 'next/server';
import { createBuildSafeResponse } from '@/lib/build-utils';
import { getDb, getSchema, getDrizzleORM } from '@/lib/db/safe-drizzle';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse(null);
    
    if (buildResponse) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // Get safe database references
    const db = getDb();
    const schema = getSchema();
    const drizzleORM = getDrizzleORM();
    
    if (!db || !schema || !drizzleORM) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }
    
    const { orders, orderItems } = schema;
    const { eq } = drizzleORM;

    const { orderId } = await params;

    // Get order details
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(orderId)))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get order items
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    return NextResponse.json({
      order,
      items,
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[orderId] - Update order status (for admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({ success: true });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse);
    }
    
    // Get safe database references
    const db = getDb();
    const schema = getSchema();
    const drizzleORM = getDrizzleORM();
    
    if (!db || !schema || !drizzleORM) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }
    
    const { orders } = schema;
    const { eq } = drizzleORM;
    
    const { orderId } = await params;
    const body = await request.json();
    const { orderStatus, paymentStatus } = body;

    // Validate status values
    const validOrderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

    if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
      return NextResponse.json(
        { error: 'Invalid order status' },
        { status: 400 }
      );
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json(
        { error: 'Invalid payment status' },
        { status: 400 }
      );
    }

    // Update order
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, parseInt(orderId)))
      .returning();

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}