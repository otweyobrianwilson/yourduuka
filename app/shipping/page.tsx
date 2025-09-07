import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, Clock, MapPin, Shield, Package, CreditCard } from 'lucide-react';

export default function ShippingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Shipping Information
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Fast, reliable delivery across Uganda. Free shipping on all orders.
            </p>
          </div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="bg-brand-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-brand-accent mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-light text-on-accent mb-4 japanese-title">Free Shipping on All Orders</h2>
            <p className="text-white text-lg chinese-accent">
              No minimum order required. Enjoy complimentary delivery throughout Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Delivery Options
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto chinese-accent text-readable-light">
              Choose the delivery method that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Standard Delivery */}
            <div className="bg-brand-light p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-primary text-on-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Standard Delivery</h3>
              <p className="text-2xl font-light text-brand-accent mb-4 japanese-title">FREE</p>
              <div className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-brand-accent" />
                  <span>3-5 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                  <span>Kampala & surrounding areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-brand-accent" />
                  <span>Package tracking included</span>
                </div>
              </div>
            </div>

            {/* Express Delivery */}
            <div className="bg-brand-accent text-white p-8 shadow-elegant group">
              <div className="w-16 h-16 bg-white text-brand-accent flex items-center justify-center mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light mb-4 chinese-accent">Express Delivery</h3>
              <p className="text-2xl font-light mb-4 japanese-title">FREE</p>
              <div className="space-y-3 chinese-accent">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4" />
                  <span>1-2 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4" />
                  <span>Kampala city center</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4" />
                  <span>Priority handling & tracking</span>
                </div>
              </div>
            </div>

            {/* Same Day Delivery */}
            <div className="bg-brand-light p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-primary text-on-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Same Day Delivery</h3>
              <p className="text-2xl font-light text-brand-accent mb-4 japanese-title">FREE</p>
              <div className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-brand-accent" />
                  <span>Order by 2 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                  <span>Central Kampala only</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-brand-accent" />
                  <span>Subject to availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Delivery Coverage
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              We deliver throughout Uganda with varying timeframes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-light text-brand-primary mb-6 chinese-accent text-readable">Kampala & Greater Metropolitan Area</h3>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Central Kampala</span>
                  <span className="text-brand-accent font-light">1-2 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Entebbe</span>
                  <span className="text-brand-accent font-light">2-3 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Wakiso</span>
                  <span className="text-brand-accent font-light">2-3 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Mukono</span>
                  <span className="text-brand-accent font-light">2-3 days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Jinja</span>
                  <span className="text-brand-accent font-light">3-4 days</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light text-brand-primary mb-6 chinese-accent text-readable">Other Major Cities</h3>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Mbarara</span>
                  <span className="text-brand-accent font-light">4-5 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Gulu</span>
                  <span className="text-brand-accent font-light">5-7 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Lira</span>
                  <span className="text-brand-accent font-light">5-7 days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brand-light">
                  <span>Fort Portal</span>
                  <span className="text-brand-accent font-light">4-6 days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Other Areas</span>
                  <span className="text-brand-accent font-light">5-10 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              How It Works
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              From order to delivery, here's what you can expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">1</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Order Placed</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Your order is received and confirmed within minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">2</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Order Processing</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                We carefully package your items with attention to detail.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">3</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">In Transit</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Your package is on its way with tracking updates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">4</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Delivered</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Your shoes arrive safely at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-brand-accent mb-6 japanese-title">
            Questions About Shipping?
          </h2>
          <p className="text-xl text-on-primary/80 mb-10 max-w-2xl mx-auto chinese-accent">
            Our customer service team is here to help with any shipping questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-minimal">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}