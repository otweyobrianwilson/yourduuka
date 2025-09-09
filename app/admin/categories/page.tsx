'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (!isAuth) {
      window.location.href = '/admin';
      return;
    }
    setIsAuthenticated(true);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"? This will affect all products in this category.`)) {
      return;
    }

    try {
      // TODO: Implement delete API endpoint
      alert('Delete category functionality will be implemented in the next update');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const toggleActive = async (categoryId: number, currentStatus: boolean) => {
    try {
      // TODO: Implement toggle active API endpoint
      alert('Toggle active functionality will be implemented in the next update');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
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
              <h1 className="text-xl font-light text-brand-primary">Category Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/categories/new">
                <Button className="bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                {/* Category Image */}
                <div className="aspect-square bg-gray-50 relative">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {category.isActive ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 font-light">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="bg-gray-500 text-white text-xs px-2 py-1 font-light">
                        INACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-light text-brand-primary mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-brand-muted font-light">
                      Slug: {category.slug}
                    </p>
                    {category.description && (
                      <p className="text-sm text-brand-secondary font-light mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-brand-muted font-light mb-4">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/categories/${category.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full font-light">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/categories/${category.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full font-light">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Toggle Active Button */}
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(category.id, category.isActive)}
                      className={`w-full font-light ${
                        category.isActive 
                          ? 'text-orange-600 hover:text-orange-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      {category.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-brand-muted mx-auto mb-4" />
            <h3 className="text-xl font-light text-brand-primary mb-2">
              No categories found
            </h3>
            <p className="text-brand-secondary font-light mb-6">
              Get started by adding your first product category.
            </p>
            <Link href="/admin/categories/new">
              <Button className="bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light">
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}