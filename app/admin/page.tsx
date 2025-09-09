'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit,
  Eye,
  Settings,
  LogOut,
  Ruler
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Simple password protection - in production this would use proper authentication
const ADMIN_PASSWORD = 'admin123'; // This should be in environment variables

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Check if user is already authenticated in this session
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isAuth);

    if (isAuth) {
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products count
      const productsRes = await fetch('/api/products?limit=1');
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setStats(prev => ({ ...prev, totalProducts: productsData.pagination?.total || 0 }));
      }

      // Fetch orders count (when implemented)
      // const ordersRes = await fetch('/api/orders?limit=1');
      // if (ordersRes.ok) {
      //   const ordersData = await ordersRes.json();
      //   setStats(prev => ({ ...prev, totalOrders: ordersData.pagination?.total || 0 }));
      // }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      sessionStorage.setItem('admin_authenticated', 'true');
      fetchStats();
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-light text-brand-primary mb-2">Admin Access</h1>
              <p className="text-brand-secondary font-light">
                Enter the admin password to continue
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-light text-brand-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  placeholder="Enter admin password"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-light">{error}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-accent text-on-accent hover:bg-brand-accent/90 font-light tracking-wide"
              >
                Login to Admin Panel
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-300 text-sm font-light"
              >
                ← Back to Store
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Admin Header */}
      <header className="bg-white border-b border-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-light text-brand-primary">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-brand-secondary hover:text-brand-accent transition-colors duration-300 text-sm font-light"
              >
                View Store
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="font-light"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-brand-muted uppercase tracking-widest">
                  Total Products
                </p>
                <p className="text-2xl font-light text-brand-primary mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-brand-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-brand-muted uppercase tracking-widest">
                  Total Orders
                </p>
                <p className="text-2xl font-light text-brand-primary mt-1">
                  {stats.totalOrders}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-brand-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-brand-muted uppercase tracking-widest">
                  Customers
                </p>
                <p className="text-2xl font-light text-brand-primary mt-1">
                  {stats.totalCustomers}
                </p>
              </div>
              <Users className="h-8 w-8 text-brand-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-brand-muted uppercase tracking-widest">
                  Revenue
                </p>
                <p className="text-2xl font-light text-brand-primary mt-1">
                  UGX {stats.revenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-brand-accent" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-light text-brand-primary mb-4">Product Management</h3>
            <div className="space-y-3">
              <Link 
                href="/admin/products"
                className="flex items-center gap-3 p-3 border border-brand-light hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group"
              >
                <Eye className="h-5 w-5 text-brand-muted group-hover:text-brand-accent" />
                <span className="font-light text-brand-primary group-hover:text-brand-accent">
                  View All Products
                </span>
              </Link>
              
              <Link 
                href="/admin/products/new"
                className="flex items-center gap-3 p-3 border border-brand-light hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group"
              >
                <Plus className="h-5 w-5 text-brand-muted group-hover:text-brand-accent" />
                <span className="font-light text-brand-primary group-hover:text-brand-accent">
                  Add New Product
                </span>
              </Link>
              
              <Link 
                href="/admin/sizes"
                className="flex items-center gap-3 p-3 border border-brand-light hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group"
              >
                <Ruler className="h-5 w-5 text-brand-muted group-hover:text-brand-accent" />
                <span className="font-light text-brand-primary group-hover:text-brand-accent">
                  Manage Sizes
                </span>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-light text-brand-primary mb-4">Order Management</h3>
            <div className="space-y-3">
              <Link 
                href="/admin/orders"
                className="flex items-center gap-3 p-3 border border-brand-light hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group"
              >
                <ShoppingCart className="h-5 w-5 text-brand-muted group-hover:text-brand-accent" />
                <span className="font-light text-brand-primary group-hover:text-brand-accent">
                  View All Orders
                </span>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-light text-brand-primary mb-4">Categories</h3>
            <div className="space-y-3">
              <Link 
                href="/admin/categories"
                className="flex items-center gap-3 p-3 border border-brand-light hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-300 group"
              >
                <Settings className="h-5 w-5 text-brand-muted group-hover:text-brand-accent" />
                <span className="font-light text-brand-primary group-hover:text-brand-accent">
                  Manage Categories
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}