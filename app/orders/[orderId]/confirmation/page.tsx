import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Truck, Phone, Mail, MapPin, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface OrderConfirmationProps {
  params: Promise<{
    orderId: string;
  }>;
}

// This would normally fetch from your API
async function getOrder(orderId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/orders/${orderId}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const { orderId } = await params;
  const orderData = await getOrder(orderId);

  if (!orderData) {
    notFound();
  }

  const { order, items } = orderData;

  return (
    <div className="min-h-screen bg-brand-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-brand-accent" />
          </div>
          <h1 className="text-3xl font-light text-brand-primary mb-2 tracking-wide">Order Confirmed!</h1>
          <p className="text-brand-primary/60 font-light tracking-wide">
            Thank you for your order. We'll prepare your items and contact you soon.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="p-6 bg-white border-brand-light shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-light text-brand-primary uppercase tracking-widest">
                Order Details
              </h2>
              <p className="text-brand-primary/60 font-light tracking-wide">
                Order #{order.orderNumber}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-sm text-brand-primary/60 font-light tracking-wide">Order Date</p>
              <p className="text-brand-primary font-light tracking-wide">
                {new Date(order.createdAt).toLocaleDateString('en-UG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="flex items-center gap-3 p-4 bg-brand-cream border border-brand-accent/30 mb-6">
            <Package className="h-5 w-5 text-brand-accent" />
            <div>
              <p className="font-light text-brand-primary tracking-wide">Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
              <p className="text-sm text-brand-primary/60 font-light">Your order is being processed</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-light text-brand-primary uppercase tracking-widest">Items Ordered</h3>
            {items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-brand-light">
                <div>
                  <h4 className="font-light text-brand-primary tracking-wide">{item.productName}</h4>
                  <p className="text-sm text-brand-primary/60 font-light">Quantity: {item.quantity}</p>
                </div>
                <p className="text-brand-accent font-light tracking-wide">
                  UGX {(parseFloat(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="space-y-2 border-t border-brand-light pt-4">
            <div className="flex justify-between">
              <span className="text-brand-primary/60 font-light">Subtotal</span>
              <span className="text-brand-primary font-light tracking-wide">UGX {parseFloat(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-primary/60 font-light">Delivery Fee</span>
              <span className="text-brand-primary font-light tracking-wide">
                {parseFloat(order.shippingAmount) === 0 ? 'FREE' : `UGX ${parseFloat(order.shippingAmount).toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-lg border-t border-brand-light pt-2">
              <span className="text-brand-primary font-light uppercase tracking-widest">Total</span>
              <span className="text-brand-accent font-light tracking-wide">UGX {parseFloat(order.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Customer & Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Customer Information */}
          <Card className="p-6 bg-white border-brand-light shadow-soft">
            <h3 className="text-lg font-light text-brand-primary mb-4 uppercase tracking-widest">
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-accent" />
                <span className="text-brand-primary font-light tracking-wide">{order.customerPhone}</span>
              </div>
              {order.customerEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-brand-accent" />
                  <span className="text-brand-primary font-light tracking-wide">{order.customerEmail}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Delivery Information */}
          <Card className="p-6 bg-white border-brand-light shadow-soft">
            <h3 className="text-lg font-light text-brand-primary mb-4 uppercase tracking-widest">
              Delivery Address
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-brand-accent mt-1" />
              <div className="text-brand-primary font-light leading-relaxed tracking-wide">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address}</p>
                {order.shippingAddress.parish && <p>{order.shippingAddress.parish}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.district}</p>
                {order.shippingAddress.landmark && (
                  <p className="text-sm text-brand-primary/60">Near {order.shippingAddress.landmark}</p>
                )}
                {order.shippingAddress.deliveryNotes && (
                  <p className="text-sm text-brand-primary/60 mt-2">Note: {order.shippingAddress.deliveryNotes}</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Information */}
        <Card className="p-6 bg-white border-brand-light shadow-soft mb-8">
          <h3 className="text-lg font-light text-brand-primary mb-4 uppercase tracking-widest">
            Payment Information
          </h3>
          <div className="flex items-center gap-3 p-4 bg-brand-cream border border-brand-accent/30">
            <Clock className="h-5 w-5 text-brand-accent" />
            <div>
              <p className="font-light text-brand-primary tracking-wide">Cash on Delivery</p>
              <p className="text-sm text-brand-primary/60 font-light">
                Pay UGX {parseFloat(order.totalAmount).toLocaleString()} when your order arrives
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 bg-white border-brand-light shadow-soft mb-8">
          <h3 className="text-lg font-light text-brand-primary mb-4 uppercase tracking-widest">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-accent text-white flex items-center justify-center text-sm font-light">1</div>
              <div>
                <p className="font-light text-brand-primary tracking-wide">Order Processing</p>
                <p className="text-sm text-brand-primary/60 font-light">We'll prepare your order and verify stock availability</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-accent text-white flex items-center justify-center text-sm font-light">2</div>
              <div>
                <p className="font-light text-brand-primary tracking-wide">Confirmation Call</p>
                <p className="text-sm text-brand-primary/60 font-light">We'll call you within 24 hours to confirm your order and delivery details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brand-accent text-white flex items-center justify-center text-sm font-light">3</div>
              <div>
                <p className="font-light text-brand-primary tracking-wide">Fast Delivery</p>
                <p className="text-sm text-brand-primary/60 font-light">Your order will be delivered within 1-3 business days</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-minimal">
            <Link href="/products">CONTINUE SHOPPING</Link>
          </Button>
          <Button 
            variant="outline" 
            asChild 
            className="border-brand-accent/30 text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
          >
            <Link href={`/orders/${order.id}/track`}>TRACK ORDER</Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 p-6 bg-white border border-brand-light shadow-soft">
          <h3 className="text-lg font-light text-brand-primary mb-4 uppercase tracking-widest">
            Need Help?
          </h3>
          <p className="text-brand-primary/60 font-light tracking-wide mb-4">
            Contact us if you have any questions about your order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-accent" />
              <span className="text-brand-primary font-light tracking-wide">+256 758 306 513</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-accent" />
              <span className="text-brand-primary font-light tracking-wide">info@yourduka.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}