'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    setCartOpen, 
    updateQuantity, 
    removeItem, 
    getTotal,
    getItemCount 
  } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream shadow-elegant z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-light">
          <h2 className="text-lg font-light text-brand-primary uppercase tracking-widest text-readable">
            Cart ({itemCount})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-brand-primary/50 hover:text-brand-accent transition-colors duration-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-brand-primary/30 mb-6" />
              <h3 className="text-lg font-light text-brand-primary mb-3 tracking-wide text-readable">Cart Empty</h3>
              <p className="text-brand-secondary mb-8 font-light leading-relaxed text-readable-light">Discover our premium footwear collection</p>
              <Button 
                onClick={() => setCartOpen(false)}
                className="btn-minimal"
                asChild
              >
                <Link href="/products">EXPLORE COLLECTION</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white p-4 border-b border-brand-light/30">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
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
                          <ShoppingBag className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-light text-brand-primary truncate leading-relaxed text-readable">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-brand-muted uppercase tracking-widest mb-1 text-readable-muted">
                      {item.product.brand} {item.product.size && `• ${item.product.size}`}
                    </p>
                    <p className="text-sm font-light text-brand-accent tracking-wide">
                      UGX {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-brand-primary/40 hover:text-brand-accent transition-colors duration-300"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-light text-brand-primary min-w-[2rem] text-center tracking-wide text-readable">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-brand-primary/40 hover:text-brand-accent transition-colors duration-300"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 text-brand-primary/30 hover:text-brand-accent transition-colors duration-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-light p-6 space-y-5">
            {/* Total */}
            <div className="flex justify-between items-center pb-4">
              <span className="text-lg font-light text-brand-primary uppercase tracking-widest text-readable">Total:</span>
              <span className="text-lg font-light text-brand-accent tracking-wide">
                UGX {total.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full btn-minimal"
                asChild
              >
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  CHECKOUT
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-brand-accent/30 text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                asChild
              >
                <Link href="/cart" onClick={() => setCartOpen(false)}>
                  VIEW CART
                </Link>
              </Button>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-sm text-brand-muted hover:text-brand-accent transition-colors duration-300 py-3 font-light tracking-wide uppercase text-readable-muted"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}