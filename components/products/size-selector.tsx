'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ruler, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Size {
  uk: string;
  us: string;
  eu: string;
  cm: string;
  available: boolean;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize?: Size;
  onSizeSelect: (size: Size) => void;
  onSizeGuideOpen: () => void;
  gender?: 'Men' | 'Women' | 'Unisex';
  className?: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
  onSizeGuideOpen,
  gender = 'Unisex',
  className
}: SizeSelectorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Size Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-light text-brand-primary uppercase tracking-widest">
            Size ({gender})
          </h3>
          {selectedSize && (
            <Badge variant="outline" className="text-xs">
              UK {selectedSize.uk}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSizeGuideOpen}
          className="text-brand-accent hover:text-brand-accent/80 p-1 h-auto"
        >
          <Ruler className="h-4 w-4 mr-1" />
          <span className="text-sm font-light tracking-wide">Size Guide</span>
        </Button>
      </div>

      {/* Size Selection Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {sizes.map((size, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            disabled={!size.available}
            onClick={() => onSizeSelect(size)}
            className={cn(
              "relative border-brand-light text-brand-primary hover:border-brand-accent hover:text-brand-accent transition-all duration-300 font-light tracking-wide",
              selectedSize?.uk === size.uk && "border-brand-accent bg-brand-accent text-on-accent",
              !size.available && "opacity-40 cursor-not-allowed line-through"
            )}
          >
            <div className="text-center">
              <div className="text-sm font-light">{size.uk}</div>
              <div className="text-xs opacity-70">UK</div>
            </div>
            {!size.available && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-brand-primary/30 transform rotate-45"></div>
              </div>
            )}
          </Button>
        ))}
      </div>

      {/* Size Information */}
      {selectedSize && (
        <div className="bg-brand-light p-4 border border-brand-light/50">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-brand-accent" />
            <span className="text-sm font-light text-brand-primary tracking-wide">
              Selected Size Details
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-brand-primary/60 uppercase tracking-widest text-xs">UK</span>
              <div className="text-brand-primary font-light">{selectedSize.uk}</div>
            </div>
            <div>
              <span className="text-brand-primary/60 uppercase tracking-widest text-xs">US</span>
              <div className="text-brand-primary font-light">{selectedSize.us}</div>
            </div>
            <div>
              <span className="text-brand-primary/60 uppercase tracking-widest text-xs">EU</span>
              <div className="text-brand-primary font-light">{selectedSize.eu}</div>
            </div>
            <div>
              <span className="text-brand-primary/60 uppercase tracking-widest text-xs">CM</span>
              <div className="text-brand-accent font-light">{selectedSize.cm}</div>
            </div>
          </div>
        </div>
      )}

      {/* Size Selection Prompt */}
      {!selectedSize && (
        <div className="text-sm text-brand-primary/60 font-light tracking-wide">
          Please select a size to continue
        </div>
      )}
    </div>
  );
}

// Default size data - can be moved to a constants file later
export const generateSizeData = (gender: 'Men' | 'Women' | 'Unisex' = 'Unisex', availableSizes: string[] = []): Size[] => {
  const mensSizes = [
    { uk: '6', us: '7', eu: '40', cm: '25.0' },
    { uk: '6.5', us: '7.5', eu: '40.5', cm: '25.5' },
    { uk: '7', us: '8', eu: '41', cm: '26.0' },
    { uk: '7.5', us: '8.5', eu: '41.5', cm: '26.5' },
    { uk: '8', us: '9', eu: '42', cm: '27.0' },
    { uk: '8.5', us: '9.5', eu: '42.5', cm: '27.5' },
    { uk: '9', us: '10', eu: '43', cm: '28.0' },
    { uk: '9.5', us: '10.5', eu: '43.5', cm: '28.5' },
    { uk: '10', us: '11', eu: '44', cm: '29.0' },
    { uk: '10.5', us: '11.5', eu: '44.5', cm: '29.5' },
    { uk: '11', us: '12', eu: '45', cm: '30.0' },
    { uk: '11.5', us: '12.5', eu: '45.5', cm: '30.5' },
    { uk: '12', us: '13', eu: '46', cm: '31.0' },
  ];

  const womensSizes = [
    { uk: '3', us: '5', eu: '36', cm: '22.5' },
    { uk: '3.5', us: '5.5', eu: '36.5', cm: '23.0' },
    { uk: '4', us: '6', eu: '37', cm: '23.5' },
    { uk: '4.5', us: '6.5', eu: '37.5', cm: '24.0' },
    { uk: '5', us: '7', eu: '38', cm: '24.5' },
    { uk: '5.5', us: '7.5', eu: '38.5', cm: '25.0' },
    { uk: '6', us: '8', eu: '39', cm: '25.5' },
    { uk: '6.5', us: '8.5', eu: '39.5', cm: '26.0' },
    { uk: '7', us: '9', eu: '40', cm: '26.5' },
    { uk: '7.5', us: '9.5', eu: '40.5', cm: '27.0' },
    { uk: '8', us: '10', eu: '41', cm: '27.5' },
    { uk: '8.5', us: '10.5', eu: '41.5', cm: '28.0' },
  ];

  const baseSizes = gender === 'Women' ? womensSizes : mensSizes;
  
  return baseSizes.map(size => ({
    ...size,
    available: availableSizes.length === 0 || availableSizes.includes(size.uk)
  }));
};