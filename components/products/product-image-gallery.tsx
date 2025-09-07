'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Use placeholder if no images
  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden group">
        <Image
          src={displayImages[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
          priority
        />
        
        {/* Navigation Arrows - only show if multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-brand-primary hover:bg-white hover:text-brand-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-brand-primary hover:bg-white hover:text-brand-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-2 bg-white/80 text-brand-primary hover:bg-white hover:text-brand-accent transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm font-light tracking-wide">
            {selectedImage + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 bg-gray-50 overflow-hidden transition-all duration-300 ${
                selectedImage === index 
                  ? 'ring-2 ring-brand-accent' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Dots for Mobile */}
      {displayImages.length > 1 && (
        <div className="flex justify-center gap-2 md:hidden">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                selectedImage === index 
                  ? 'bg-brand-accent' 
                  : 'bg-brand-primary/20'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}