'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Save,
  Edit,
  Package,
  AlertCircle,
  Check,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
  id: number;
  name: string;
  slug: string;
  availableSizes: string[];
  sizeCategory: 'Men' | 'Women' | 'Unisex';
  brand?: string;
  categoryName?: string;
}

const standardSizes = {
  Men: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
  Women: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
  Unisex: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
};

export default function AdminSizesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      window.location.href = '/admin';
      return;
    }
    setIsAuthenticated(true);
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: '50',
        ...(search && { search }),
      });

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductSizes = async (productId: number, availableSizes: string[], sizeCategory: string) => {
    try {
      setSaving(productId);
      
      const product = products.find(p => p.id === productId);
      if (!product) {
        alert('Product not found');
        return;
      }

      const response = await fetch(`/api/products/${product.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availableSizes,
          sizeCategory
        }),
      });

      if (response.ok) {
        // Update local state
        setProducts(prevProducts => 
          prevProducts.map(p => 
            p.id === productId 
              ? { ...p, availableSizes, sizeCategory: sizeCategory as 'Men' | 'Women' | 'Unisex' }
              : p
          )
        );
        setEditingProduct(null);
        setSuccessMessage(`Updated sizes for ${product.name}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating product sizes:', error);
      alert('Error updating product sizes. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const toggleSize = (productId: number, size: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              availableSizes: product.availableSizes.includes(size)
                ? product.availableSizes.filter(s => s !== size)
                : [...product.availableSizes, size].sort((a, b) => {
                    const numA = parseFloat(a);
                    const numB = parseFloat(b);
                    return numA - numB;
                  })
            }
          : product
      )
    );
  };

  const changeSizeCategory = (productId: number, newCategory: 'Men' | 'Women' | 'Unisex') => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              sizeCategory: newCategory,
              availableSizes: [] // Reset sizes when category changes
            }
          : product
      )
    );
  };

  const selectAllSizes = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const allSizes = standardSizes[product.sizeCategory];
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId
          ? { ...p, availableSizes: [...allSizes] }
          : p
      )
    );
  };

  const clearAllSizes = (productId: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId
          ? { ...p, availableSizes: [] }
          : p
      )
    );
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(search.toLowerCase()))
  );

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
              <h1 className="text-xl font-light text-brand-primary">Size Management</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mx-4 my-4">
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            {successMessage}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="grid gap-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-brand-light rounded w-48"></div>
                  <div className="h-8 bg-brand-light rounded w-20"></div>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {[...Array(8)].map((_, j) => (
                    <div key={j} className="h-8 bg-brand-light rounded"></div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-light text-brand-primary mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-brand-secondary">
                      {product.brand && `${product.brand} • `}
                      {product.categoryName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {editingProduct === product.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(null)}
                          disabled={saving === product.id}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateProductSizes(
                            product.id, 
                            product.availableSizes, 
                            product.sizeCategory
                          )}
                          disabled={saving === product.id}
                        >
                          {saving === product.id ? (
                            'Saving...'
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProduct(product.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>

                {editingProduct === product.id ? (
                  <div className="space-y-4">
                    {/* Size Category Selector */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-brand-primary">
                        Size Category:
                      </label>
                      <Select
                        value={product.sizeCategory}
                        onValueChange={(value) => changeSizeCategory(product.id, value as 'Men' | 'Women' | 'Unisex')}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Men">Men</SelectItem>
                          <SelectItem value="Women">Women</SelectItem>
                          <SelectItem value="Unisex">Unisex</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => selectAllSizes(product.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Select All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearAllSizes(product.id)}
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    </div>

                    {/* Size Selection Grid */}
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                      {standardSizes[product.sizeCategory].map((size) => (
                        <label
                          key={size}
                          className={`flex items-center justify-center p-2 rounded cursor-pointer transition-colors ${
                            product.availableSizes.includes(size)
                              ? 'bg-brand-accent text-on-accent'
                              : 'bg-white border border-brand-light hover:bg-brand-light'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={product.availableSizes.includes(size)}
                            onChange={() => toggleSize(product.id, size)}
                          />
                          <span className="text-sm font-medium">{size}</span>
                        </label>
                      ))}
                    </div>

                    <div className="text-sm text-brand-secondary">
                      Selected: {product.availableSizes.length} size{product.availableSizes.length !== 1 ? 's' : ''}
                      {product.availableSizes.length > 0 && (
                        <span className="ml-2">
                          [{product.availableSizes.join(', ')}]
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium text-brand-primary">
                        Size Category: {product.sizeCategory}
                      </span>
                      <span className="text-sm text-brand-secondary">
                        Available: {product.availableSizes?.length || 0} sizes
                      </span>
                    </div>
                    
                    {product.availableSizes?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {product.availableSizes.map((size) => (
                          <span
                            key={size}
                            className="inline-flex items-center px-2 py-1 bg-brand-light text-brand-primary text-xs rounded"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">No sizes configured</span>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-brand-muted mb-4" />
            <h3 className="text-lg font-medium text-brand-primary mb-2">
              No products found
            </h3>
            <p className="text-brand-secondary">
              {search ? 'Try adjusting your search terms.' : 'No products available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}