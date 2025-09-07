import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RotateCcw, Shield, Clock, CheckCircle, XCircle, Package, CreditCard } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Returns & Exchanges
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              We want you to love your shoes. If you're not completely satisfied, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Easy Returns Promise */}
      <section className="bg-brand-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-brand-accent mb-4">
              <RotateCcw className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-light text-on-accent mb-4 japanese-title">30-Day Easy Returns</h2>
            <p className="text-white text-lg chinese-accent">
              Free returns and exchanges within 30 days of purchase. Your satisfaction is guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Return Policy
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto chinese-accent text-readable-light">
              Simple, fair, and customer-friendly return conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* What Can Be Returned */}
            <div className="bg-brand-light p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-primary text-on-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">What Can Be Returned</h3>
              <ul className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                  <span>Unworn shoes in original condition</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                  <span>Items with original packaging</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                  <span>All accessories and tags included</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                  <span>Returned within 30 days</span>
                </li>
              </ul>
            </div>

            {/* Return Timeframe */}
            <div className="bg-brand-accent text-white p-8 shadow-elegant">
              <div className="w-16 h-16 bg-white text-brand-accent flex items-center justify-center mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light mb-4 chinese-accent">Return Timeframe</h3>
              <div className="space-y-4 chinese-accent">
                <div className="border-b border-white/20 pb-3">
                  <div className="text-lg font-light japanese-title">30 Days</div>
                  <div className="text-sm">From date of delivery</div>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <div className="text-lg font-light japanese-title">Free Pickup</div>
                  <div className="text-sm">No return shipping fees</div>
                </div>
                <div>
                  <div className="text-lg font-light japanese-title">Quick Process</div>
                  <div className="text-sm">Refund within 5-7 business days</div>
                </div>
              </div>
            </div>

            {/* What Cannot Be Returned */}
            <div className="bg-brand-light p-8 shadow-soft hover:shadow-elegant transition-all duration-300 group">
              <div className="w-16 h-16 bg-brand-primary text-on-primary flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <XCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">What Cannot Be Returned</h3>
              <ul className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span>Worn or damaged shoes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span>Custom or personalized items</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span>Items without original packaging</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span>Returns after 30 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              How to Return Your Order
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              Follow these simple steps for a hassle-free return process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">1</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Contact Us</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Call us at +256 758 306 513 or email info@yourduka.com to initiate your return.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">2</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Package Items</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Pack your shoes in the original box with all accessories and tags.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">3</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Schedule Pickup</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                We'll arrange a free pickup at your convenience within Kampala.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">4</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Get Refund</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Receive your refund within 5-7 business days after we process your return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-8 japanese-title text-readable">
                Size Exchanges
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <p className="text-lg leading-relaxed">
                  Need a different size? We make it easy to exchange your shoes for the perfect fit. 
                  Size exchanges follow the same 30-day policy as returns.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-accent text-on-accent flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-light text-brand-primary mb-1 text-readable">Free Size Exchanges</h4>
                      <p className="text-sm">No additional cost for size exchanges within Uganda.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-accent text-on-accent flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-light text-brand-primary mb-1 text-readable">Quick Turnaround</h4>
                      <p className="text-sm">Receive your new size within 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-accent text-on-accent flex items-center justify-center rounded-full flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-light text-brand-primary mb-1 text-readable">Subject to Availability</h4>
                      <p className="text-sm">Exchanges depend on stock availability for the requested size.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="bg-brand-light p-8 shadow-soft">
                <h3 className="text-xl font-light text-brand-primary mb-6 chinese-accent text-readable">
                  Size Guide Tips
                </h3>
                <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <span>Measure your feet in the evening when they're largest</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <span>Check our size guide for each brand</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <span>Consider the width of your feet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <span>Contact us for personalized sizing advice</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
                  <Link href="/size-guide">View Size Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 shadow-soft">
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">
                How long do I have to return my order?
              </h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                You have 30 days from the date of delivery to return your order. Items must be in original condition with all packaging and tags.
              </p>
            </div>

            <div className="bg-white p-6 shadow-soft">
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">
                Do I have to pay for return shipping?
              </h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                No, we offer free return pickup service within Kampala and surrounding areas. For other locations, we'll provide a prepaid return label.
              </p>
            </div>

            <div className="bg-white p-6 shadow-soft">
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">
                How long does it take to process a refund?
              </h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Once we receive and inspect your return, refunds are processed within 5-7 business days. You'll receive an email confirmation when your refund is issued.
              </p>
            </div>

            <div className="bg-white p-6 shadow-soft">
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">
                Can I exchange for a different style or color?
              </h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Currently, we only offer size exchanges for the same style and color. For different styles or colors, you'll need to process a return and place a new order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-brand-accent mb-6 japanese-title">
            Need Help with a Return?
          </h2>
          <p className="text-xl text-on-primary/80 mb-10 max-w-2xl mx-auto chinese-accent">
            Our customer service team is ready to assist you with your return or exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-minimal">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="tel:+256758306513">Call: +256 758 306 513</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}