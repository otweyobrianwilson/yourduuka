'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/lib/stores/wishlist-store';
import { useCartStore } from '@/lib/stores/cart-store';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function WishlistPage() {
  const { items, clearWishlist, isHydrated, getItemCount } = useWishlistStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    // This ensures the component re-renders after hydration
  }, [isHydrated]);

  const handleAddAllToCart = async () => {
    if (!isHydrated || items.length === 0) return;

    try {
      for (const item of items) {
        await addItem(item.product);
      }
      toast.success(`Added ${items.length} items to cart!`);
    } catch (error) {
      console.error('Error adding items to cart:', error);
      toast.error('Failed to add some items to cart');
    }
  };

  const handleClearWishlist = () => {
    if (!isHydrated) return;
    clearWishlist();
    toast.success('Wishlist cleared!');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-brand-light rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-brand-light rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white shadow-soft animate-pulse">
                  <div className="w-full h-64 bg-brand-light"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-brand-light rounded w-3/4"></div>
                    <div className="h-4 bg-brand-light rounded w-1/2"></div>
                    <div className="h-6 bg-brand-accent/20 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide"
            >
              Home
            </Link>
            <span className="text-brand-primary/30">/</span>
            <span className="text-brand-primary font-light tracking-wide">Wishlist</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-light tracking-wide uppercase text-sm">Back to Products</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-brand-accent mr-3" />
            <h1 className="text-4xl font-light text-brand-primary tracking-wide">
              My Wishlist
            </h1>
          </div>
          <p className="text-lg text-brand-secondary font-light max-w-2xl mx-auto leading-relaxed">
            {items.length > 0 
              ? `You have ${getItemCount()} ${getItemCount() === 1 ? 'item' : 'items'} in your wishlist`
              : 'Your wishlist is empty'
            }
          </p>
        </div>

        {items.length > 0 ? (
          <>
            {/* Wishlist Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={handleAddAllToCart}
                className="bg-brand-accent hover:bg-brand-accent/90 text-on-accent font-light tracking-wide px-8 py-3"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
              <Button
                onClick={handleClearWishlist}
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-on-primary font-light tracking-wide px-8 py-3"
              >
                Clear Wishlist
              </Button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item.product}
                  className="wishlist-item"
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="h-12 w-12 text-brand-muted" />
            </div>
            <h3 className="text-2xl font-light text-brand-primary mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-brand-secondary mb-8 font-light text-lg">
              Start browsing our collection and add items to your wishlist for later.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-brand-accent text-on-accent hover:bg-brand-accent/90 transition-all duration-300 font-light tracking-wide"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        )}

        {/* Tips Section */}
        {items.length > 0 && (
          <div className="mt-20 bg-white p-8 shadow-soft">
            <div className="text-center">
              <h3 className="text-xl font-light text-brand-primary mb-4 uppercase tracking-widest">
                Wishlist Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h4 className="font-light text-brand-primary mb-2">Save for Later</h4>
                  <p className="text-sm text-brand-secondary font-light">
                    Keep track of items you love and want to purchase later.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h4 className="font-light text-brand-primary mb-2">Easy Shopping</h4>
                  <p className="text-sm text-brand-secondary font-light">
                    Add multiple items to cart with just one click.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h4 className="font-light text-brand-primary mb-2">Share with Friends</h4>
                  <p className="text-sm text-brand-secondary font-light">
                    Your wishlist is saved locally and always accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}