'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Truck, Clock, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  parish: string;
  district: string;
  landmark: string;
  deliveryNotes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, getItemCount, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    parish: '',
    district: '',
    landmark: '',
    deliveryNotes: '',
  });

  const total = getTotal();
  const itemCount = getItemCount();
  const deliveryFee = total >= 200000 ? 0 : 15000; // Free delivery over 200k UGX
  const finalTotal = total + deliveryFee;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/products');
    }
  }, [items, router]);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const required = ['firstName', 'lastName', 'phone', 'address', 'city', 'district'];
    
    for (const field of required) {
      if (!customerInfo[field as keyof CustomerInfo].trim()) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    // Validate phone format (Uganda format)
    const phoneRegex = /^(\+256|0)[37]\d{8}$/;
    if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid Ugandan phone number');
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Transform customer info to match API schema
      const apiCustomerInfo = {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
        email: customerInfo.email || 'noemail@yourduuka.com', // API requires email
        phone: customerInfo.phone,
        address: `${customerInfo.address}, ${customerInfo.landmark}`.replace(', ,', ',').replace(/,$/, ''),
        city: `${customerInfo.city}, ${customerInfo.district}`,
        postalCode: customerInfo.parish || '',
      };

      const orderData = {
        customerInfo: apiCustomerInfo,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.price.toString(),
        })),
        paymentMethod: 'cash_on_delivery',
        notes: customerInfo.deliveryNotes || undefined,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      // Clear cart and redirect
      await clearCart();
      
      toast.success('Order placed successfully!');
      router.push(`/orders/${result.order.id}/confirmation`);

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-brand-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-light tracking-wide uppercase text-sm">Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-light text-brand-primary tracking-wide">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="p-6 bg-white border-brand-light shadow-soft">
              <h2 className="text-xl font-light text-brand-primary mb-6 uppercase tracking-widest">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="Enter your email (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="+256 XXX XXX XXX"
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Information */}
            <Card className="p-6 bg-white border-brand-light shadow-soft">
              <h2 className="text-xl font-light text-brand-primary mb-6 uppercase tracking-widest">
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="Enter your street address"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="e.g., Kampala"
                  />
                </div>
                <div>
                  <Label htmlFor="parish" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Parish/Suburb
                  </Label>
                  <Input
                    id="parish"
                    value={customerInfo.parish}
                    onChange={(e) => handleInputChange('parish', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="e.g., Nakasero"
                  />
                </div>
                <div>
                  <Label htmlFor="district" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    District *
                  </Label>
                  <Input
                    id="district"
                    value={customerInfo.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="e.g., Kampala"
                  />
                </div>
                <div>
                  <Label htmlFor="landmark" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Nearest Landmark
                  </Label>
                  <Input
                    id="landmark"
                    value={customerInfo.landmark}
                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="e.g., Near Garden City Mall"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="deliveryNotes" className="text-sm font-light text-brand-primary/70 uppercase tracking-widest">
                    Delivery Notes
                  </Label>
                  <Input
                    id="deliveryNotes"
                    value={customerInfo.deliveryNotes}
                    onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                    className="mt-2 border-b border-brand-light bg-transparent focus:border-brand-accent"
                    placeholder="Any special delivery instructions"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 bg-white border-brand-light shadow-soft">
              <h2 className="text-xl font-light text-brand-primary mb-6 uppercase tracking-widest">
                Payment Method
              </h2>
              <div className="flex items-center gap-4 p-4 bg-brand-cream border border-brand-accent/30">
                <Clock className="h-5 w-5 text-brand-accent" />
                <div>
                  <p className="font-light text-brand-primary tracking-wide">Cash on Delivery</p>
                  <p className="text-sm text-brand-primary/60 font-light">Pay when your order arrives</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 bg-white border-brand-light shadow-soft">
              <h2 className="text-xl font-light text-brand-primary mb-6 uppercase tracking-widest">
                Order Summary
              </h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 overflow-hidden">
                      {item.product.images && Array.isArray(item.product.images) && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0] as string}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-300 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-light text-brand-primary">{item.product.name}</h4>
                      <p className="text-xs text-brand-primary/60 font-light">
                        {item.product.brand} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-brand-accent font-light tracking-wide">
                        UGX {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-brand-light pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-primary/60 font-light">Subtotal ({itemCount} items)</span>
                  <span className="text-brand-primary font-light tracking-wide">UGX {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-primary/60 font-light">Delivery Fee</span>
                  <span className="text-brand-primary font-light tracking-wide">
                    {deliveryFee === 0 ? 'FREE' : `UGX ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg border-t border-brand-light pt-2">
                  <span className="text-brand-primary font-light uppercase tracking-widest">Total</span>
                  <span className="text-brand-accent font-light tracking-wide">UGX {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button 
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full mt-6 btn-minimal"
              >
                {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
              </Button>
            </Card>

            {/* Service Features */}
            <Card className="p-6 bg-white border-brand-light shadow-soft">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-brand-accent" />
                  <div>
                    <p className="text-sm font-light text-brand-primary tracking-wide">Fast Delivery</p>
                    <p className="text-xs text-brand-primary/60 font-light">1-3 business days in Kampala</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-brand-accent" />
                  <div>
                    <p className="text-sm font-light text-brand-primary tracking-wide">Secure Shopping</p>
                    <p className="text-xs text-brand-primary/60 font-light">Your information is protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-accent" />
                  <div>
                    <p className="text-sm font-light text-brand-primary tracking-wide">Cash on Delivery</p>
                    <p className="text-xs text-brand-primary/60 font-light">Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}