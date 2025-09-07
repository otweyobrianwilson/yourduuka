import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Scale, Shield, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Terms of Service
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Please read these terms carefully before using our services. By using YourDuka, you agree to these terms.
            </p>
            <p className="text-sm text-brand-muted mt-4 chinese-accent text-readable-muted">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Agreement Notice */}
      <section className="bg-brand-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-brand-accent mb-4">
              <Scale className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-light text-on-accent mb-4 japanese-title">Legal Agreement</h2>
            <p className="text-white text-lg chinese-accent max-w-3xl mx-auto">
              These terms constitute a legal agreement between you and YourDuka. Please read them carefully.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>By accessing or using the YourDuka website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                <p>These terms apply to all visitors, users, and customers who access or use our service.</p>
              </div>
            </div>

            {/* Use License */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                2. Use License
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>Permission is granted to temporarily access YourDuka for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by YourDuka at any time.</p>
              </div>
            </div>

            {/* Products and Services */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                3. Products and Services
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Product Information</h3>
                  <p>We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Availability</h3>
                  <p>All products are subject to availability. We reserve the right to limit quantities or discontinue products at any time. Product availability may vary by location.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Pricing</h3>
                  <p>Prices are displayed in Ugandan Shillings (UGX) and are subject to change without notice. We reserve the right to correct pricing errors and cancel orders with incorrect pricing.</p>
                </div>
              </div>
            </div>

            {/* Orders and Payment */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                4. Orders and Payment
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Order Process</h3>
                  <p>When you place an order, you are making an offer to purchase products subject to these terms. We reserve the right to accept or decline your order for any reason.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Payment Terms</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We currently accept cash on delivery (COD) only</li>
                    <li>Payment is due upon delivery of products</li>
                    <li>You must provide accurate delivery information</li>
                    <li>Orders may be cancelled if payment cannot be collected</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Order Modifications</h3>
                  <p>Orders may be modified or cancelled within 2 hours of placement. After this time, modifications may not be possible depending on order status.</p>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                5. Delivery Terms
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>Delivery times are estimates and not guarantees. We are not liable for delays caused by circumstances beyond our control, including but not limited to weather conditions, traffic, or carrier delays.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free delivery is provided throughout Uganda</li>
                  <li>You must be available to receive delivery at the specified address</li>
                  <li>If you are unavailable, additional delivery attempts may incur charges</li>
                  <li>Risk of loss passes to you upon delivery</li>
                </ul>
              </div>
            </div>

            {/* Returns and Exchanges */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                6. Returns and Exchanges
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>Our return policy allows returns within 30 days of delivery, subject to the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Items must be in original, unworn condition</li>
                  <li>All original packaging, tags, and accessories must be included</li>
                  <li>Custom or personalized items cannot be returned</li>
                  <li>We reserve the right to refuse returns that don't meet these conditions</li>
                </ul>
                <p>Refunds will be processed within 5-7 business days after we receive and inspect returned items.</p>
              </div>
            </div>

            {/* User Conduct */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                7. User Conduct
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our service for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>Interfere with or disrupt our service or servers</li>
                  <li>Submit false or misleading information</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Harass, abuse, or harm other users or our staff</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                8. Intellectual Property
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>The service and its original content, features, and functionality are and will remain the exclusive property of YourDuka and its licensors. The service is protected by copyright, trademark, and other laws.</p>
                <p>Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
              </div>
            </div>

            {/* Disclaimers */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                9. Disclaimers
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, YourDuka:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Does not warrant that the website will be constantly available or available at all</li>
                  <li>Makes no warranty regarding the quality, accuracy, or completeness of any content</li>
                  <li>Is not responsible for any loss or damage that may arise from use of this website</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                10. Limitation of Liability
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>In no event shall YourDuka, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                <p>Our total liability to you for all claims arising out of or relating to the use of our service shall not exceed the amount you paid for the specific product or service that is the subject of the claim.</p>
              </div>
            </div>

            {/* Indemnification */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                11. Indemnification
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>You agree to defend, indemnify, and hold harmless YourDuka and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).</p>
              </div>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                12. Governing Law
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>These terms shall be interpreted and governed by the laws of Uganda. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Uganda.</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                13. Changes to Terms
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                14. Contact Information
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email: legal@yourduka.com</li>
                  <li>Phone: +256 758 306 513</li>
                  <li>Address: Garden City Mall, Level 2, Shop 245, Kampala, Uganda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-light text-yellow-800 mb-2 chinese-accent">Important Notice</h3>
              <p className="text-yellow-700 chinese-accent">
                These terms of service are legally binding. If you do not agree to these terms, please do not use our services. 
                For questions or clarifications, please contact our legal team before proceeding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-brand-accent mb-6 japanese-title">
            Related Information
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/returns">Return Policy</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/contact">Contact Legal Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}