'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  ArrowLeft,
  Eye,
  Package,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  comparePrice?: string;
  quantity: number;
  images: string[];
  brand?: string;
  categoryName?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      window.location.href = '/admin';
      return;
    }
    setIsAuthenticated(true);
    fetchProducts();
  }, [currentPage, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
      });

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      // TODO: Implement delete API endpoint
      alert('Delete functionality will be implemented in the next update');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const toggleFeatured = async (productId: number, currentStatus: boolean) => {
    try {
      // TODO: Implement toggle featured API endpoint
      alert('Toggle featured functionality will be implemented in the next update');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white border-b border-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="flex items-center text-brand-secondary hover:text-brand-accent transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-brand-light"></div>
              <h1 className="text-xl font-light text-brand-primary">Product Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/products/new">
                <Button className="bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              <Button variant="outline" className="font-light">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-50 relative">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                    
                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isFeatured && (
                        <span className="bg-brand-accent text-on-accent text-xs px-2 py-1 font-light">
                          FEATURED
                        </span>
                      )}
                      {!product.isActive && (
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 font-light">
                          INACTIVE
                        </span>
                      )}
                      {product.quantity === 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 font-light">
                          OUT OF STOCK
                        </span>
                      )}
                      {product.quantity <= 5 && product.quantity > 0 && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 font-light">
                          LOW STOCK
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-light text-brand-primary mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p className="text-xs text-brand-muted uppercase tracking-widest font-light">
                          {product.brand}
                        </p>
                      )}
                      {product.categoryName && (
                        <p className="text-xs text-brand-secondary font-light">
                          {product.categoryName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-light text-brand-accent">
                          UGX {parseFloat(product.price).toLocaleString()}
                        </span>
                        {product.comparePrice && (
                          <span className="text-sm text-brand-muted line-through ml-2">
                            UGX {parseFloat(product.comparePrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-brand-muted">
                        Qty: {product.quantity}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full font-light">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product.slug}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full font-light">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="font-light"
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="font-light"
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="font-light"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-brand-muted mx-auto mb-4" />
            <h3 className="text-xl font-light text-brand-primary mb-2">
              No products found
            </h3>
            <p className="text-brand-secondary font-light mb-6">
              {search ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
            </p>
            <Link href="/admin/products/new">
              <Button className="bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}