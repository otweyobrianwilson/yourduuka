'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/db/schema';
import ProductCard from './product-card';

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const params = new URLSearchParams({
          limit: '4',
          exclude: currentProductId,
        });
        
        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId, category]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-brand-primary uppercase tracking-widest">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white border-b border-brand-light animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-light text-brand-primary uppercase tracking-widest mb-2">
          Related Products
        </h2>
        <div className="w-16 h-px bg-brand-accent mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}