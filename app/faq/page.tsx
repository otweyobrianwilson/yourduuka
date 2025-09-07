'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Minus, MessageCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

// Since we can't use useState in a server component, we'll create this as a static FAQ page
// In a real app, you'd use client-side state management or a more sophisticated accordion

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. We accept cash on delivery for all orders."
        },
        {
          question: "What payment methods do you accept?",
          answer: "Currently, we only accept cash on delivery (COD). Payment is made when your order is delivered to your doorstep."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it. Contact us immediately at +256 758 306 513 or info@yourduka.com."
        },
        {
          question: "Do you offer installment payments?",
          answer: "At this time, we only accept full payment on delivery. We're working on introducing flexible payment options in the future."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free shipping on all orders throughout Uganda, regardless of order value."
        },
        {
          question: "How long does delivery take?",
          answer: "Delivery times vary by location: Kampala (1-2 days), surrounding areas (2-3 days), other major cities (4-7 days)."
        },
        {
          question: "Do you deliver outside Uganda?",
          answer: "Currently, we only deliver within Uganda. We're planning to expand to other East African countries soon."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you'll receive tracking information via SMS and email once your order ships. You can also call us for updates."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "Are your products authentic?",
          answer: "Absolutely! We source all our products directly from authorized distributors and guarantee 100% authenticity."
        },
        {
          question: "How do I know my size?",
          answer: "Check our detailed size guide which includes measurement instructions and conversion charts. When in doubt, contact us for personalized sizing advice."
        },
        {
          question: "Do you have wide-width shoes?",
          answer: "Many of our styles accommodate wider feet. Check the product description or contact us to discuss specific width requirements."
        },
        {
          question: "Can I see products in person before buying?",
          answer: "Yes! Visit our store at Garden City Mall, Level 2, Shop 245. Our team can help you find the perfect fit."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer free returns within 30 days of delivery. Items must be unworn and in original packaging with all tags attached."
        },
        {
          question: "How do I return an item?",
          answer: "Contact us to initiate a return. We'll arrange free pickup within Kampala or provide a prepaid return label for other areas."
        },
        {
          question: "Can I exchange for a different size?",
          answer: "Yes! Size exchanges are free within 30 days, subject to availability. We'll handle the exchange process for you."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive and inspect your return, refunds are processed within 5-7 business days."
        }
      ]
    },
    {
      category: "Customer Service",
      questions: [
        {
          question: "How can I contact customer service?",
          answer: "You can reach us by phone (+256 758 306 513), email (info@yourduka.com), or visit our store. We respond to emails within 24 hours."
        },
        {
          question: "What are your store hours?",
          answer: "Monday-Friday: 9AM-8PM, Saturday: 9AM-9PM, Sunday: 10AM-6PM. Phone support available during store hours."
        },
        {
          question: "Do you offer personal styling services?",
          answer: "Yes! Our team can provide personalized recommendations based on your style preferences and occasions. Contact us to schedule a consultation."
        },
        {
          question: "Can I reserve items?",
          answer: "We can hold items for up to 24 hours while you decide. Call us to reserve specific products."
        }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-2xl font-light text-brand-primary mb-8 japanese-title text-readable border-b border-brand-light pb-4">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-white border border-brand-light shadow-soft">
                    <div className="p-6">
                      <h3 className="text-lg font-light text-brand-primary mb-4 chinese-accent text-readable flex items-center">
                        <div className="w-6 h-6 bg-brand-accent text-on-accent flex items-center justify-center mr-4 rounded-full">
                          <span className="text-sm font-light">Q</span>
                        </div>
                        {faq.question}
                      </h3>
                      <div className="pl-10">
                        <p className="text-brand-secondary leading-relaxed chinese-accent text-readable-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Still Have Questions?
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light max-w-2xl mx-auto">
              Our friendly customer service team is here to help you with any questions not covered above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Call Us</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">
                Speak directly with our team
              </p>
              <Button variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
                <Link href="tel:+256758306513">+256 758 306 513</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Email Us</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">
                Get detailed responses within 24 hours
              </p>
              <Button variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
                <Link href="mailto:info@yourduka.com">info@yourduka.com</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-3 chinese-accent text-readable">Visit Store</h3>
              <p className="text-brand-secondary mb-4 chinese-accent text-readable-light">
                Personal assistance at Garden City Mall
              </p>
              <Button variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
                <Link href="/contact">Get Directions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-brand-accent mb-6 japanese-title">
            Helpful Resources
          </h2>
          <p className="text-xl text-on-primary/80 mb-10 max-w-2xl mx-auto chinese-accent">
            Explore our guides and policies for more detailed information.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/size-guide">Size Guide</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/shipping">Shipping Info</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/returns">Returns Policy</Link>
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