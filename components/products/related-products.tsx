import { Product } from '@/lib/db/schema';
import ProductCard from './product-card';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
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