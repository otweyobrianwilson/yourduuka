'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    comparePrice: '',
    sku: '',
    quantity: 0,
    brand: '',
    material: '',
    color: '',
    size: '',
    gender: 'Unisex' as 'Men' | 'Women' | 'Unisex',
    categoryId: '',
    isFeatured: false,
    isActive: true,
    tags: [] as string[],
  });
  
  const [tagInput, setTagInput] = useState('');

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
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-generate slug from name
      if (name === 'name') {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleAddTag = (e: React.KeyEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ 
          ...prev, 
          tags: [...prev.tags, tagInput.trim()] 
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        images: imageUrls.filter(url => url.trim() !== ''),
        price: parseFloat(formData.price).toFixed(2),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice).toFixed(2) : null,
      };

      // TODO: Implement POST /api/products endpoint
      console.log('Product data to submit:', productData);
      
      alert('Product creation will be implemented in the next update. Check console for data structure.');
      
      // After successful creation, redirect to products list
      // router.push('/admin/products');
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
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
                href="/admin/products"
                className="flex items-center text-brand-secondary hover:text-brand-accent transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
              <div className="h-6 w-px bg-brand-light"></div>
              <h1 className="text-xl font-light text-brand-primary">Add New Product</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="product-slug"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Brief product description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Detailed product description"
                />
              </div>
            </div>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Price (UGX) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Compare Price (UGX)
                </label>
                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Product SKU"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Product Details */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="e.g., Leather, Canvas"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Product color"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="e.g., 42, L, XL"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-brand-primary mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary focus:border-brand-accent focus:outline-none transition-colors duration-300"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Images */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Product Images</h2>
            <div className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                    placeholder="Image URL"
                  />
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageUrl(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addImageUrl}
                className="font-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Tags</h2>
            <div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleAddTag}
                className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300 mb-4"
                placeholder="Type tag and press Enter"
              />
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-brand-accent/10 text-brand-accent text-sm font-light"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-brand-accent/60 hover:text-brand-accent"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="p-6">
            <h2 className="text-lg font-light text-brand-primary mb-6">Status</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-brand-primary font-light">Featured Product</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-brand-primary font-light">Active (visible to customers)</span>
              </label>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Link href="/admin/products">
              <Button variant="outline" type="button" className="font-light">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}