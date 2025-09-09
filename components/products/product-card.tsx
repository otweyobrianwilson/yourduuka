'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/db/schema';
import { useCartStore } from '@/lib/stores/cart-store';
import { useWishlistStore } from '@/lib/stores/wishlist-store';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, className = '', viewMode = 'grid' }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist, isHydrated } = useWishlistStore();
  
  const isLiked = isHydrated ? isInWishlist(product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isHydrated) {
      toggleItem(product);
      toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist!');
    }
  };

  const productImage = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] as string
    : null;

  const discountPercentage = product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price)
    ? Math.round(((parseFloat(product.comparePrice) - parseFloat(product.price)) / parseFloat(product.comparePrice)) * 100)
    : null;

  if (viewMode === 'list') {
    return (
      <div className={`group relative bg-white border border-brand-light rounded-lg transition-all duration-500 hover:shadow-elegant flex p-4 ${className}`}>
        <Link href={`/products/${product.slug}`} className="flex w-full">
          {/* Product Image */}
          <div className="relative w-32 h-32 overflow-hidden bg-gray-50 rounded-lg flex-shrink-0">
            {productImage && !imageError ? (
              <Image
                src={productImage}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <ShoppingCart className="h-8 w-8 text-gray-300" />
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-1 left-1 flex flex-col gap-1">
              {product.isFeatured && (
                <span className="bg-brand-accent text-on-accent text-xs font-light px-2 py-0.5 tracking-wide shadow-soft">
                  FEATURED
                </span>
              )}
              {discountPercentage && (
                <span className="bg-brand-accent text-on-accent text-xs font-light px-2 py-0.5 tracking-wide shadow-soft">
                  -{discountPercentage}%
                </span>
              )}
              {product.quantity === 0 && (
                <span className="bg-brand-primary text-on-primary text-xs font-light px-2 py-0.5 tracking-wide shadow-soft">
                  SOLD OUT
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 ml-4 flex flex-col justify-between">
            <div>
              {/* Brand */}
              {product.brand && (
                <p className="text-xs text-brand-muted uppercase tracking-widest mb-2 font-light text-readable-muted">
                  {product.brand}
                </p>
              )}

              {/* Product Name */}
              <h3 className="text-sm font-light text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors duration-300 leading-relaxed text-readable">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < 4 ? 'text-brand-accent fill-current' : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-xs text-brand-muted ml-2 font-light text-readable-muted">(24)</span>
              </div>

              {/* Product Details */}
              <div className="flex items-center gap-4 text-xs text-brand-muted mb-2 font-light text-readable-muted">
                {product.size && <span className="uppercase tracking-wide">Size: {product.size}</span>}
                {product.color && <span className="uppercase tracking-wide">Color: {product.color}</span>}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-light text-brand-accent tracking-wide">
                  UGX {parseFloat(product.price).toLocaleString()}
                </span>
                {product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price) && (
                  <span className="text-sm text-brand-muted line-through font-light text-readable-muted">
                    UGX {parseFloat(product.comparePrice).toLocaleString()}
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleLike}
                  className={`p-2 transition-all duration-300 ${
                    isLiked 
                      ? 'bg-brand-accent text-on-accent' 
                      : 'bg-gray-100 text-brand-muted hover:text-brand-accent hover:bg-gray-200'
                  } rounded-md`}
                >
                  <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className="btn-minimal disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                  size="sm"
                >
                  {product.quantity === 0 ? 'SOLD OUT' : 'ADD TO CART'}
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`group relative bg-white border-b border-brand-light transition-all duration-500 hover:shadow-elegant ${className}`}>
      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {productImage && !imageError ? (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <ShoppingCart className="h-8 w-8 text-gray-300" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isFeatured && (
              <span className="bg-brand-accent text-on-accent text-xs font-light px-3 py-1 tracking-wide shadow-soft">
                FEATURED
              </span>
            )}
            {discountPercentage && (
              <span className="bg-brand-accent text-on-accent text-xs font-light px-3 py-1 tracking-wide shadow-soft">
                -{discountPercentage}%
              </span>
            )}
            {product.quantity === 0 && (
              <span className="bg-brand-primary text-on-primary text-xs font-light px-3 py-1 tracking-wide shadow-soft">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={handleToggleLike}
              className={`p-2 transition-all duration-300 ${
                isLiked 
                  ? 'bg-brand-accent text-on-accent' 
                  : 'bg-white/90 text-brand-muted hover:text-brand-accent hover:bg-white'
              } shadow-soft`}
            >
              <Heart className="h-3 w-3" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/products/${product.slug}`;
              }}
              className="p-2 bg-white/90 text-brand-muted hover:text-brand-accent hover:bg-white shadow-soft transition-all duration-300"
            >
              <Eye className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-brand-muted uppercase tracking-widest mb-2 font-light text-readable-muted">
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-light text-brand-primary mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors duration-300 leading-relaxed text-readable">
            {product.name}
          </h3>

          {/* Rating (placeholder for now) */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < 4 ? 'text-brand-accent fill-current' : 'text-gray-200'
                }`}
              />
            ))}
            <span className="text-xs text-brand-muted ml-2 font-light text-readable-muted">(24)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg font-light text-brand-accent tracking-wide">
              UGX {parseFloat(product.price).toLocaleString()}
            </span>
            {product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price) && (
              <span className="text-sm text-brand-muted line-through font-light text-readable-muted">
                UGX {parseFloat(product.comparePrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex items-center gap-4 text-xs text-brand-muted mb-4 font-light text-readable-muted">
            {product.size && <span className="uppercase tracking-wide">Size: {product.size}</span>}
            {product.color && <span className="uppercase tracking-wide">Color: {product.color}</span>}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5">
        <Button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className="w-full btn-minimal disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
          size="sm"
        >
          {product.quantity === 0 ? 'SOLD OUT' : 'ADD TO CART'}
        </Button>
      </div>
    </div>
  );
}