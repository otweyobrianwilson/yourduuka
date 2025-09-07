import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Privacy Policy
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-brand-muted mt-4 chinese-accent text-readable-muted">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="bg-brand-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-brand-accent mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-light text-on-accent mb-4 japanese-title">Your Privacy, Our Priority</h2>
            <p className="text-white text-lg chinese-accent max-w-3xl mx-auto">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Information We Collect
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Personal Information</h3>
                  <p className="mb-3">When you place an order or contact us, we collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and contact details (phone number, email address)</li>
                    <li>Delivery address and location information</li>
                    <li>Order history and preferences</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Automatic Information</h3>
                  <p className="mb-3">We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website and search terms used</li>
                    <li>Device type and operating system</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                How We Use Your Information
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Order Processing</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Arrange delivery and provide tracking information</li>
                    <li>Handle returns and exchanges</li>
                    <li>Provide customer support</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Communication</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send order confirmations and updates</li>
                    <li>Respond to your inquiries</li>
                    <li>Send promotional emails (with your consent)</li>
                    <li>Notify you about policy changes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Website Improvement</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Analyze website usage and performance</li>
                    <li>Improve our products and services</li>
                    <li>Personalize your shopping experience</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Information Sharing
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Service Providers</h3>
                  <p>We work with trusted third-party service providers who help us:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Process and deliver orders</li>
                    <li>Handle payments (cash on delivery partners)</li>
                    <li>Provide customer support</li>
                    <li>Maintain our website and systems</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Legal Requirements</h3>
                  <p>We may disclose information when required by law or to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Comply with legal obligations</li>
                    <li>Protect our rights and property</li>
                    <li>Ensure user safety</li>
                    <li>Investigate potential violations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Data Security
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>We take the security of your personal information seriously and implement various measures to protect it:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure data transmission using industry-standard encryption</li>
                  <li>Regular security audits and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Employee training on data protection</li>
                  <li>Secure storage and backup systems</li>
                </ul>
                <p className="mt-4">However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Your Rights and Choices
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Ask us to correct any inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from promotional emails at any time</li>
                  <li><strong>Portability:</strong> Request your data in a commonly used format</li>
                </ul>
                <p className="mt-4">To exercise these rights, contact us using the information provided below.</p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Cookies and Tracking
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>We use cookies and similar tracking technologies to improve your experience on our website:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential cookies:</strong> Necessary for basic website functionality</li>
                  <li><strong>Performance cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing cookies:</strong> Used to show relevant advertisements (with your consent)</li>
                </ul>
                <p className="mt-4">You can control cookie settings through your browser preferences, but some features may not work properly if cookies are disabled.</p>
              </div>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Data Retention
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide our services and support</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our products and services</li>
                </ul>
                <p className="mt-4">When we no longer need your information, we will securely delete or anonymize it.</p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable border-b border-brand-light pb-2">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-brand-secondary chinese-accent text-readable-light">
                <p>We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Update the "Last updated" date at the top of this policy</li>
                  <li>Notify you via email if changes are material</li>
                  <li>Post the updated policy on our website</li>
                  <li>Provide additional notice as required by law</li>
                </ul>
                <p className="mt-4">We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Questions About This Policy?
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light max-w-2xl mx-auto">
              If you have questions about this privacy policy or how we handle your personal information, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Email Us</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">privacy@yourduka.com</p>
              <p className="text-sm text-brand-muted chinese-accent text-readable-muted">We respond within 48 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Call Us</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">+256 758 306 513</p>
              <p className="text-sm text-brand-muted chinese-accent text-readable-muted">Monday - Friday, 9AM - 6PM</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Visit Store</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">Garden City Mall, Level 2</p>
              <p className="text-sm text-brand-muted chinese-accent text-readable-muted">Kampala, Uganda</p>
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
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/cookies">Cookie Policy</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}