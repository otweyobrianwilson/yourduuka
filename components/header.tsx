'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';



function SearchBar({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div className={`hidden md:flex flex-1 max-w-lg transition-all duration-300 ${
      isScrolled ? 'mx-4' : 'mx-8'
    }`}>
      <div className="relative w-full">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-all duration-300 ${
          isScrolled ? 'text-brand-muted' : 'text-brand-secondary'
        }`} />
        <input
          type="text"
          placeholder="Search premium footwear..."
          className={`w-full pl-10 pr-4 border-0 border-b bg-transparent focus:border-brand-accent focus:outline-none transition-all duration-300 text-brand-primary placeholder-brand-muted ${
            isScrolled ? 'py-2 border-brand-muted text-sm' : 'py-3 border-brand-light'
          }`}
        />
      </div>
    </div>
  );
}

function CartButton({ isScrolled }: { isScrolled: boolean }) {
  const { itemCount, toggleCart } = useCartStore();
  
  return (
    <button
      onClick={toggleCart}
      className={`relative text-brand-primary hover:text-brand-accent transition-all duration-300 ${
        isScrolled ? 'p-2' : 'p-3'
      }`}
    >
      <ShoppingBag className={`transition-all duration-300 ${
        isScrolled ? 'h-5 w-5' : 'h-6 w-6'
      }`} />
      {itemCount > 0 && (
        <span className={`absolute -top-1 -right-1 bg-brand-accent text-on-accent flex items-center justify-center font-light transition-all duration-300 ${
          isScrolled ? 'text-xs h-4 w-4' : 'text-xs h-5 w-5'
        }`}>
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}

function Navigation({ isScrolled }: { isScrolled: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/categories/sneakers', label: 'Sneakers' },
    { href: '/categories/boots', label: 'Boots' },
    { href: '/categories/formal-shoes', label: 'Formal' },
    { href: '/admin', label: 'Admin' },
  ];
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden lg:flex items-center transition-all duration-300 ${
        isScrolled ? 'space-x-6' : 'space-x-10'
      }`}>
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-brand-primary hover:text-brand-accent font-light transition-all duration-300 chinese-accent ${
              isScrolled ? 'text-sm' : 'text-base'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden text-brand-primary hover:text-brand-accent transition-all duration-300 ${
          isScrolled ? 'p-2' : 'p-3'
        }`}
      >
        {isMobileMenuOpen ? (
          <X className={`transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
        ) : (
          <Menu className={`transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
        )}
      </button>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-soft border-brand-light border-t shadow-soft z-50">
          <nav className="px-6 py-4 space-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-brand-primary hover:text-brand-accent font-light transition-colors duration-300 chinese-accent text-readable"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`bg-brand-soft border-brand-light border-b sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'shadow-soft' : 'shadow-elegant'
    }`}>
      {/* Top Bar - Hide on scroll */}
      <div className={`bg-brand-cream text-brand-primary text-sm transition-all duration-300 overflow-hidden ${
        isScrolled ? 'h-0 py-0' : 'h-auto py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <p className="japanese-title text-center text-readable-light">Free delivery on all orders | Call: +256 758 306 513</p>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className={`bg-brand-primary text-on-primary mr-3 transition-all duration-300 ${
                isScrolled ? 'p-2' : 'p-3'
              }`}>
                <ShoppingBag className={`transition-all duration-300 ${
                  isScrolled ? 'h-5 w-5' : 'h-6 w-6'
                }`} />
              </div>
              <div>
                <h1 className={`font-light text-brand-primary japanese-title transition-all duration-300 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}>YourDuka</h1>
                <p className={`text-brand-secondary chinese-accent transition-all duration-300 ${
                  isScrolled ? 'text-xs mt-0' : 'text-sm mt-1'
                }`}>Premium Footwear</p>
              </div>
            </div>
          </Link>
          
          {/* Search Bar */}
          <SearchBar isScrolled={isScrolled} />
          
          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <Navigation isScrolled={isScrolled} />
            <CartButton isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}