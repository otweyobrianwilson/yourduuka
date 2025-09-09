'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';
import ProductGrid from '@/components/products/product-grid';
import ProductFilter, { FilterOptions } from '@/components/products/product-filter';
import { Product, Category } from '@/lib/db/schema';

interface CategoryPageData {
  category: Category;
  products: Product[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [data, setData] = useState<CategoryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    genders: [],
    priceRange: [0, 1000],
    inStock: false,
    onSale: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        params.append('category', slug);
        if (filters.categories.length > 0) params.append('categories', filters.categories.join(','));
        if (filters.brands.length > 0) params.append('brands', filters.brands.join(','));
        if (filters.sizes.length > 0) params.append('sizes', filters.sizes.join(','));
        if (filters.colors.length > 0) params.append('colors', filters.colors.join(','));
        if (filters.genders.length > 0) params.append('genders', filters.genders.join(','));
        if (filters.priceRange[0] > 0) params.append('minPrice', filters.priceRange[0].toString());
        if (filters.priceRange[1] < 1000) params.append('maxPrice', filters.priceRange[1].toString());
        if (filters.inStock) params.append('inStock', 'true');
        if (filters.onSale) params.append('onSale', 'true');
        
        // Fetch products and categories
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/products?${params.toString()}`),
          fetch('/api/categories')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        // Find the current category
        const category = categoriesData.categories?.find((cat: any) => cat.slug === slug);
        
        if (!category) {
          router.push('/products');
          return;
        }

        setData({
          category,
          products: productsData.products || [],
          pagination: productsData.pagination || { total: 0, page: 1, totalPages: 0 }
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      genders: [],
      priceRange: [0, 1000],
      inStock: false,
      onSale: false
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-brand-light rounded w-1/3 mb-8"></div>
            <div className="h-12 bg-brand-light rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
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

  if (!data) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-brand-primary mb-4">Category not found</h1>
          <Link href="/products" className="text-brand-accent hover:underline">
            Back to all products
          </Link>
        </div>
      </div>
    );
  }

  const { category, products, pagination } = data;

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
            <Link 
              href="/products" 
              className="text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide"
            >
              All Products
            </Link>
            <span className="text-brand-primary/30">/</span>
            <span className="text-brand-primary font-light tracking-wide">{category.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-brand-primary/60 hover:text-brand-accent transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-light tracking-wide uppercase text-sm">Back to All Products</span>
        </Link>

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-brand-primary mb-4 tracking-wide">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-brand-secondary font-light max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
          )}
          <div className="mt-6">
            <p className="text-sm text-brand-muted font-light tracking-wide">
              {pagination.total || 0} {pagination.total === 1 ? 'product' : 'products'} found
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block">
            <ProductFilter
              filters={filters}
              onFiltersChange={handleFilterChange}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
              onClear={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-brand-light text-brand-primary hover:text-brand-accent transition-colors duration-300"
              >
                <Filter className="h-4 w-4" />
                <span className="font-light tracking-wide">Filter & Sort</span>
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <ProductFilter
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  isOpen={showFilters}
                  onToggle={() => setShowFilters(!showFilters)}
                  onClear={clearFilters}
                />
              </div>
            )}

            {products.length > 0 ? (
              <ProductGrid 
                products={products} 
                pagination={pagination}
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl text-brand-muted mb-4">👟</div>
                <h3 className="text-xl font-light text-brand-primary mb-2">
                  No products found
                </h3>
                <p className="text-brand-secondary font-light mb-6">
                  Try adjusting your filters or check back later for new arrivals.
                </p>
                <Link 
                  href="/products"
                  className="inline-flex items-center px-6 py-3 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent transition-all duration-300 font-light tracking-wide"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}