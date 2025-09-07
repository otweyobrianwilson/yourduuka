'use client';

import { useEffect, useState } from 'react';
import { Product, Category } from '@/lib/db/schema';
import ProductGrid from '@/components/products/product-grid';
import ProductFilter from '@/components/products/product-filter';
import { Button } from '@/components/ui/button';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

interface ProductsPageData {
  products: Product[];
  categories: Category[];
  total: number;
}

export default function ProductsPage() {
  const [data, setData] = useState<ProductsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    size: '',
    color: '',
    sort: 'name'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.size) params.append('size', filters.size);
        if (filters.color) params.append('color', filters.color);
        if (filters.sort) params.append('sort', filters.sort);
        
        // Fetch products and categories
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/products?${params.toString()}`),
          fetch('/api/categories')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setData({
          products: productsData.products || [],
          categories: categoriesData.categories || [],
          total: productsData.total || 0
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        setData({ products: [], categories: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      size: '',
      color: '',
      sort: 'name'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-soft">
        {/* Hero Section */}
        <section className="bg-brand-soft py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
                All Products
              </h1>
              <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
                Loading our premium footwear collection...
              </p>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
    );
  }

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'name').length;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              All Products
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Discover our complete collection of premium footwear. From casual to formal, find your perfect pair.
            </p>
            {data && (
              <p className="text-brand-muted mt-4 chinese-accent text-readable-muted">
                {data.total} {data.total === 1 ? 'product' : 'products'} available
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-brand-muted hover:text-brand-primary text-readable-muted"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-brand-muted chinese-accent text-readable-muted">View:</span>
              <div className="flex items-center border border-brand-light rounded">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-brand-accent text-on-accent' : 'text-brand-muted hover:text-brand-primary'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-brand-accent text-on-accent' : 'text-brand-muted hover:text-brand-primary'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            {showFilters && data && (
              <div className="lg:col-span-1 mb-8 lg:mb-0">
                <ProductFilter
                  categories={data.categories}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </div>
            )}

            {/* Products Grid */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              {data && data.products.length > 0 ? (
                <ProductGrid products={data.products} />
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <Grid className="h-8 w-8 text-brand-muted" />
                  </div>
                  <h3 className="text-xl font-light text-brand-primary mb-4 japanese-title text-readable">
                    No Products Found
                  </h3>
                  <p className="text-brand-secondary mb-6 chinese-accent text-readable-light">
                    Try adjusting your filters or browse our featured categories.
                  </p>
                  <Button onClick={clearFilters} className="btn-minimal">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {data && data.categories.length > 0 && (
        <section className="bg-brand-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
                Shop by Category
              </h2>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Explore our carefully curated categories to find exactly what you're looking for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.categories.slice(0, 6).map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleFilterChange({ category: category.slug })}
                  className="bg-white p-8 shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer group text-center"
                >
                  <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable group-hover:text-brand-accent transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-brand-secondary chinese-accent text-readable-light">
                    {category.description || 'Discover our premium selection'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}