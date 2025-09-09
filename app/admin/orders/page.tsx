'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Search, 
  Filter,
  Eye,
  Edit,
  Package,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  totalAmount: string;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const paymentStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
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
    fetchOrders();
  }, [currentPage, search, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/orders?${params}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      // TODO: Implement PUT /api/orders/[id] endpoint
      alert(`Update order ${orderId} status to ${newStatus} - API will be implemented`);
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
              <h1 className="text-xl font-light text-brand-primary">Order Management</h1>
            </div>
            <div className="text-sm text-brand-muted font-light">
              {orders.length} orders found
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
                    placeholder="Search by order number or customer name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-brand-light bg-white text-brand-primary placeholder-brand-muted focus:border-brand-accent focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-brand-light bg-white text-brand-primary focus:border-brand-accent focus:outline-none transition-colors duration-300"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <>
            <div className="space-y-4 mb-8">
              {orders.map((order) => (
                <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-light text-brand-primary">
                          {order.orderNumber}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-light ${
                            statusColors[order.status as keyof typeof statusColors] || statusColors.pending
                          }`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-light ${
                            paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors] || paymentStatusColors.pending
                          }`}>
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-brand-secondary font-light">
                        <div>
                          <span className="text-brand-muted">Customer:</span> {order.customerName}
                        </div>
                        <div>
                          <span className="text-brand-muted">Email:</span> {order.customerEmail}
                        </div>
                        <div>
                          <span className="text-brand-muted">Phone:</span> {order.customerPhone || 'N/A'}
                        </div>
                        <div>
                          <span className="text-brand-muted">Total:</span> {order.currency} {parseFloat(order.totalAmount).toLocaleString()}
                        </div>
                        <div>
                          <span className="text-brand-muted">Created:</span> {formatDate(order.createdAt)}
                        </div>
                        <div>
                          <span className="text-brand-muted">Updated:</span> {formatDate(order.updatedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="w-full md:w-auto font-light">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </Link>
                      
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-2 text-sm border border-brand-light bg-white text-brand-primary focus:border-brand-accent focus:outline-none transition-colors duration-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
            <ShoppingCart className="h-16 w-16 text-brand-muted mx-auto mb-4" />
            <h3 className="text-xl font-light text-brand-primary mb-2">
              No orders found
            </h3>
            <p className="text-brand-secondary font-light mb-6">
              {search || statusFilter ? 'Try adjusting your filters.' : 'Orders will appear here when customers make purchases.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}