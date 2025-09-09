'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalAmount, itemCount } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-brand-muted mb-6" />
            <h1 className="text-3xl font-light text-brand-primary mb-4">Your Cart is Empty</h1>
            <p className="text-brand-secondary mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild className="btn-brand-primary">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-brand-primary mb-2">Shopping Cart</h1>
          <p className="text-brand-secondary">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow-soft border border-brand-light">
              <div className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.selectedSize}`} className="flex items-center space-x-4 border-b border-brand-light pb-6 last:border-0 last:pb-0">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover border border-brand-light"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-brand-primary mb-1">
                          <Link href={`/products/${item.slug}`} className="hover:text-brand-accent">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-brand-secondary mb-2">
                          Size: {item.selectedSize} | {item.color}
                        </p>
                        <p className="text-lg font-medium text-brand-accent">
                          UGX {parseInt(item.price).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-brand-light">
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedSize, Math.max(0, item.quantity - 1))}
                            className="p-2 hover:bg-brand-light transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-brand-primary min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                            className="p-2 hover:bg-brand-light transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.productId, item.selectedSize)}
                          className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <div className="mt-6 pt-6 border-t border-brand-light">
                  <button
                    onClick={clearCart}
                    className="text-sm text-brand-muted hover:text-red-500 transition-colors"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white shadow-soft border border-brand-light p-6">
              <h2 className="text-xl font-medium text-brand-primary mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-brand-secondary">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>UGX {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-brand-secondary">
                  <span>Shipping</span>
                  <span>{totalAmount >= 200000 ? 'Free' : 'UGX 15,000'}</span>
                </div>
                <div className="border-t border-brand-light pt-3">
                  <div className="flex justify-between text-lg font-medium text-brand-primary">
                    <span>Total</span>
                    <span>UGX {(totalAmount >= 200000 ? totalAmount : totalAmount + 15000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {totalAmount >= 200000 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm">
                  🎉 You qualify for free shipping!
                </div>
              )}

              <Button asChild className="w-full btn-brand-primary mb-3">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full border-brand-light text-brand-primary hover:bg-brand-light">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}