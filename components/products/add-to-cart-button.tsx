'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import { Product } from '@/lib/db/schema';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: any;
  className?: string;
}

export default function AddToCartButton({ product, selectedSize, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    // Check if a size is selected for footwear products
    const needsSize = product.availableSizes && product.availableSizes.length > 0;
    if (needsSize && !selectedSize) {
      toast.error('Please select a size first', {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#dc2626',
          border: '1px solid #fca5a5',
          borderRadius: '0',
          fontSize: '14px',
        },
      });
      return;
    }

    setIsAdding(true);
    
    try {
      addItem(product, selectedSize);
      const sizeText = selectedSize ? ` (Size UK ${selectedSize.uk})` : '';
      toast.success(`${product.name}${sizeText} added to cart!`, {
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #e9ecef',
          borderRadius: '0',
          fontSize: '14px',
        },
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={product.quantity === 0 || isAdding}
      className={cn("btn-minimal", className)}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {product.quantity === 0 
        ? 'SOLD OUT' 
        : isAdding 
        ? 'ADDING...' 
        : 'ADD TO CART'
      }
    </Button>
  );
}