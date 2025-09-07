'use client';

import { Product } from '@/lib/db/schema';
import ProductCard from './product-card';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export default function ProductGrid({ products, loading = false, className = '' }: ProductGridProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
        
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded"></div>
          ))}
          <div className="h-3 bg-gray-200 rounded w-8 ml-1"></div>
        </div>
        
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        {/* Details */}
        <div className="flex justify-between mb-3">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      
      {/* Button Skeleton */}
      <div className="px-4 pb-4">
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}