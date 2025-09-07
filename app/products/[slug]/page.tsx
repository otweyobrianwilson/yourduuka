import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '@/components/products/product-image-gallery';
import RelatedProducts from '@/components/products/related-products';
import AddToCartButton from '@/components/products/add-to-cart-button';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This would normally fetch from your API
async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const discountPercentage = product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price)
    ? Math.round(((parseFloat(product.comparePrice) - parseFloat(product.price)) / parseFloat(product.comparePrice)) * 100)
    : null;

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide">
              Home
            </Link>
            <span className="text-brand-primary/30">/</span>
            <Link href="/products" className="text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide">
              Products
            </Link>
            <span className="text-brand-primary/30">/</span>
            <span className="text-brand-primary font-light tracking-wide">{product.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-light tracking-wide uppercase text-sm">Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <ProductImageGallery images={product.images || []} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <p className="text-sm text-brand-primary/50 uppercase tracking-widest mb-2 font-light">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl font-light text-brand-primary mb-4 leading-relaxed tracking-wide">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'text-brand-accent fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-brand-primary/60 font-light tracking-wide">(24 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="pb-6 border-b border-brand-light">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-light text-brand-accent tracking-wide">
                  UGX {parseFloat(product.price).toLocaleString()}
                </span>
                {product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price) && (
                  <>
                    <span className="text-lg text-brand-primary/40 line-through font-light">
                      UGX {parseFloat(product.comparePrice).toLocaleString()}
                    </span>
                    {discountPercentage && (
                      <Badge className="bg-brand-accent text-white font-light tracking-wide">
                        -{discountPercentage}%
                      </Badge>
                    )}
                  </>
                )}
              </div>
              {product.quantity <= 5 && product.quantity > 0 && (
                <p className="text-sm text-brand-accent mt-2 font-light tracking-wide">
                  Only {product.quantity} left in stock
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {product.size && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-brand-primary/60 uppercase tracking-widest font-light w-20">Size:</span>
                  <span className="text-sm text-brand-primary font-light tracking-wide">{product.size}</span>
                </div>
              )}
              {product.color && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-brand-primary/60 uppercase tracking-widest font-light w-20">Color:</span>
                  <span className="text-sm text-brand-primary font-light tracking-wide">{product.color}</span>
                </div>
              )}
              {product.material && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-brand-primary/60 uppercase tracking-widest font-light w-20">Material:</span>
                  <span className="text-sm text-brand-primary font-light tracking-wide">{product.material}</span>
                </div>
              )}
              {product.gender && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-brand-primary/60 uppercase tracking-widest font-light w-20">Category:</span>
                  <span className="text-sm text-brand-primary font-light tracking-wide">{product.gender}'s Footwear</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-4">
                <h3 className="text-lg font-light text-brand-primary uppercase tracking-widest">Description</h3>
                <p className="text-brand-primary/80 font-light leading-relaxed tracking-wide">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <div className="flex gap-4">
                <AddToCartButton 
                  product={product}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-brand-accent/30 text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-brand-accent/30 text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Service Features */}
            <div className="space-y-4 pt-6 border-t border-brand-light">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-light text-brand-primary tracking-wide">Free Delivery</p>
                  <p className="text-xs text-brand-primary/60 font-light tracking-wide">Within Kampala city limits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-light text-brand-primary tracking-wide">Quality Guarantee</p>
                  <p className="text-xs text-brand-primary/60 font-light tracking-wide">Authentic premium footwear</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-brand-accent" />
                <div>
                  <p className="text-sm font-light text-brand-primary tracking-wide">Easy Returns</p>
                  <p className="text-xs text-brand-primary/60 font-light tracking-wide">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} category={product.categoryId} />
        </div>
      </div>
    </div>
  );
}