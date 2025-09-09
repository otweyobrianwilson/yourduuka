'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/products/product-grid';
import { Product, Category } from '@/lib/db/schema';
import { ArrowRight, ShoppingBag, Star, Truck, Shield, HeartHandshake } from 'lucide-react';

interface HomePageData {
  featuredProducts: Product[];
  categories: Category[];
}

export default function HomePage() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const productsResponse = await fetch('/api/products?featured=true&limit=8');
        const productsData = await productsResponse.json();
        
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();

        setData({
          featuredProducts: productsData.products || [],
          categories: categoriesData.categories || [],
        });
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Step Into
                <span className="block text-brand-gold">Premium Style</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                Discover Uganda's finest collection of premium footwear. From everyday comfort to special occasions, 
                find your perfect pair at YourDuka.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="btn-brand-primary text-lg px-8 py-3"
                >
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 border-2 border-white text-black bg-white hover:bg-gray-100 hover:text-brand-primary font-medium shadow-elegant hover:shadow-hover transition-all duration-300"
                  asChild
                >
                  <Link href="/products">
                    Browse Categories
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-brand-gold">500+</div>
                  <div className="text-sm text-gray-400">Premium Shoes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold">50+</div>
                  <div className="text-sm text-gray-400">Top Brands</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold">10K+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-2 hover:rotate-0 transition-transform">
                      <Image
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
                        alt="Nike Sneakers"
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-center mt-2 font-medium">Nike Air Max</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-1 hover:rotate-0 transition-transform">
                      <Image
                        src="https://m.media-amazon.com/images/I/714Ur7P80oS._AC_SY695_.jpg"
                        alt="Boots"
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-center mt-2 font-medium">Premium Boots</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-2 hover:rotate-0 transition-transform">
                      <Image
                        src="https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/l/k/h/7-a9905-7-averatto-brown-original-imah78rsddkw34hg.jpeg?q=90&crop=false"
                        alt="Formal Shoes"
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-center mt-2 font-medium">Formal Collection</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-1 hover:rotate-0 transition-transform">
                      <Image
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                        alt="Sports Shoes"
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-center mt-2 font-medium">Sports Line</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders over UGX 200,000 across Kampala</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day return policy on all authentic products</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Our team helps you find the perfect fit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium footwear across different categories
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data?.categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group text-center hover:scale-105 transition-transform"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                    <Image
                      src={category.imageUrl || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-brand-red transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites from our premium collection</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <ProductGrid 
            products={data?.featuredProducts || []} 
            loading={loading}
          />
        </div>
      </section>


    </>
  );
}