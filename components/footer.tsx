import Link from 'next/link';
import { ShoppingBag, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { href: '/products', label: 'All Products' },
      { href: '/categories/men', label: 'Men\'s Footwear' },
      { href: '/categories/women', label: 'Women\'s Footwear' },
      { href: '/categories/kids', label: 'Kids\' Footwear' },
      { href: '/brands', label: 'Brands' },
    ],
    customer: [
      { href: '/account', label: 'My Account' },
      { href: '/orders', label: 'Order History' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns & Exchanges' },
      { href: '/size-guide', label: 'Size Guide' },
      { href: '/faq', label: 'FAQ' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/stores', label: 'Store Locator' },
      { href: '/blog', label: 'Blog' },
      { href: '/press', label: 'Press' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
  };

  const socialLinks = [
    { href: 'https://facebook.com/yourduka', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com/yourduka', icon: Twitter, label: 'Twitter' },
    { href: 'https://instagram.com/yourduka', icon: Instagram, label: 'Instagram' },
    { href: 'https://youtube.com/yourduka', icon: Youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-brand-primary text-on-primary border-t border-brand-light">
      {/* Newsletter Section */}
      <div className="bg-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-light mb-3 tracking-wide text-on-accent">Stay Updated</h3>
            <p className="text-white mb-8 font-light tracking-wide text-readable text-center mx-auto max-w-2xl">Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and style tips from our experts.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border-b border-white/30 text-on-accent placeholder-pink-200 focus:outline-none focus:border-white transition-colors font-light tracking-wide focus-ring"
              />
              <button className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-on-primary font-medium uppercase tracking-widest hover:bg-brand-primary/90 transition-all duration-300 shadow-elegant hover:shadow-hover border-2 border-brand-primary hover:border-brand-primary/80">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <div className="bg-brand-accent text-white p-2 mr-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-brand-accent tracking-wide">YourDuka</h2>
                <p className="text-on-primary/70 text-sm font-light tracking-widest uppercase">Premium Footwear</p>
              </div>
            </Link>
            <p className="text-on-primary/80 mb-8 max-w-md font-light leading-relaxed">
              Your trusted partner for premium footwear in Uganda. We bring you the finest collection of shoes 
              for men, women, and children from the world's leading brands.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-brand-accent mr-4" />
                <span className="text-on-primary/80 font-light tracking-wide">+256 758 306 513</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-brand-accent mr-4" />
                <span className="text-on-primary/80 font-light tracking-wide">info@yourduka.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-brand-accent mr-4" />
                <span className="text-on-primary/80 font-light tracking-wide">Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-light mb-6 text-brand-accent uppercase tracking-widest">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-on-primary/70 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-light mb-6 text-brand-accent uppercase tracking-widest">Service</h3>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-cream/70 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-light mb-6 text-brand-accent uppercase tracking-widest">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-cream/70 hover:text-brand-accent transition-colors duration-300 font-light tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="mt-16 pt-8 border-t border-brand-light/20">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex items-center space-x-8 mb-6 lg:mb-0">
              <span className="text-on-primary/60 font-light uppercase tracking-widest text-sm">Follow:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-on-primary/60 hover:text-brand-accent transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-8">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-on-primary/60 hover:text-brand-accent transition-colors duration-300 text-sm font-light tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-brand-light/20 text-center">
            <p className="text-on-primary/50 text-sm font-light tracking-wide">
              © {currentYear} YourDuka Premium Footwear. All rights reserved. | Crafted with care in Uganda
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}