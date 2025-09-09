'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Ruler, Footprints, HelpCircle, Users, Phone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: 'Men' | 'Women' | 'Unisex';
}

export default function SizeGuideModal({ isOpen, onClose, gender = 'Unisex' }: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'measure' | 'chart' | 'fit'>('measure');

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

  if (!isOpen) return null;

  const sizes = gender === 'Women' ? womensSizes : mensSizes;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-brand-soft max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-brand-light shadow-elegant rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-brand-light">
          <div className="flex items-center gap-2 sm:gap-3">
            <Ruler className="h-4 w-4 sm:h-6 sm:w-6 text-brand-accent" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-brand-primary japanese-title">
              Size Guide - {gender === 'Unisex' ? 'Universal' : gender}'s Footwear
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-brand-primary hover:text-brand-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-light">
          <button
            onClick={() => setActiveTab('measure')}
            className={cn(
              "px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-light tracking-wide transition-colors duration-300",
              activeTab === 'measure'
                ? "border-b-2 border-brand-accent text-brand-accent bg-brand-accent/5"
                : "text-brand-primary hover:text-brand-accent"
            )}
          >
            How to Measure
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={cn(
              "px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-light tracking-wide transition-colors duration-300",
              activeTab === 'chart'
                ? "border-b-2 border-brand-accent text-brand-accent bg-brand-accent/5"
                : "text-brand-primary hover:text-brand-accent"
            )}
          >
            Size Chart
          </button>
          <button
            onClick={() => setActiveTab('fit')}
            className={cn(
              "px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-light tracking-wide transition-colors duration-300",
              activeTab === 'fit'
                ? "border-b-2 border-brand-accent text-brand-accent bg-brand-accent/5"
                : "text-brand-primary hover:text-brand-accent"
            )}
          >
            Fit Guide
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          {activeTab === 'measure' && (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-sm sm:text-base text-brand-secondary chinese-accent">
                  Follow these simple steps for the most accurate measurements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-3 rounded-full">
                    <span className="text-lg font-light japanese-title">1</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-light text-brand-primary mb-2 chinese-accent">Prepare</h3>
                  <p className="text-xs sm:text-sm text-brand-secondary chinese-accent">
                    Place a sheet of paper on a hard floor against a wall. Wear your normal socks.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-3 rounded-full">
                    <span className="text-lg font-light japanese-title">2</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-light text-brand-primary mb-2 chinese-accent">Position</h3>
                  <p className="text-xs sm:text-sm text-brand-secondary chinese-accent">
                    Stand with your heel against the wall and your full weight on the foot.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-3 rounded-full">
                    <span className="text-lg font-light japanese-title">3</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-light text-brand-primary mb-2 chinese-accent">Mark</h3>
                  <p className="text-xs sm:text-sm text-brand-secondary chinese-accent">
                    Mark the tip of your longest toe on the paper with a pen or pencil.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-3 rounded-full">
                    <span className="text-lg font-light japanese-title">4</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-light text-brand-primary mb-2 chinese-accent">Measure</h3>
                  <p className="text-xs sm:text-sm text-brand-secondary chinese-accent">
                    Measure from the wall to the mark in centimeters. Repeat for both feet.
                  </p>
                </div>
              </div>

              <div className="bg-brand-light p-4 sm:p-6 border border-brand-light/50 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-accent text-on-accent mb-4">
                  <Footprints className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-light text-brand-primary mb-4 chinese-accent">Important Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-brand-secondary chinese-accent">
                  <div>
                    <h4 className="text-sm sm:text-base font-light text-brand-primary mb-2">Best Time to Measure</h4>
                    <p className="text-xs sm:text-sm">Measure your feet in the evening when they're at their largest.</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-light text-brand-primary mb-2">Use Longer Foot</h4>
                    <p className="text-xs sm:text-sm">Always use the measurement of your longer foot for sizing.</p>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-light text-brand-primary mb-2">Consider Width</h4>
                    <p className="text-xs sm:text-sm">If you have wide feet, consider going up half a size.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm sm:text-base text-brand-secondary chinese-accent">
                  Use this chart to convert your foot measurement to the right shoe size.
                </p>
              </div>

              <div className="bg-white p-3 sm:p-6 border border-brand-light/50 overflow-x-auto rounded-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-10 h-10 bg-brand-primary text-on-primary flex items-center justify-center mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-light text-brand-primary japanese-title">
                    {gender === 'Unisex' ? 'Universal' : gender}'s Sizes
                  </h3>
                </div>
                
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-brand-light">
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm font-light text-brand-primary chinese-accent">UK</th>
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm font-light text-brand-primary chinese-accent">US</th>
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm font-light text-brand-primary chinese-accent">EU</th>
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm font-light text-brand-primary chinese-accent">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, index) => (
                      <tr key={index} className="border-b border-brand-light/50 hover:bg-brand-light/30 transition-colors">
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm text-brand-secondary chinese-accent">{size.uk}</td>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm text-brand-secondary chinese-accent">{size.us}</td>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm text-brand-secondary chinese-accent">{size.eu}</td>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm text-brand-accent font-light">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-sm sm:text-base text-brand-secondary chinese-accent">
                  Different shoe types may fit differently. Here's what to expect.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-brand-light p-4 sm:p-6 border border-brand-light/50 rounded-lg">
                  <h3 className="text-base sm:text-lg font-light text-brand-primary mb-3 sm:mb-4 chinese-accent">Sneakers</h3>
                  <div className="space-y-1 sm:space-y-2 text-brand-secondary chinese-accent">
                    <p className="text-xs sm:text-sm">• Generally true to size</p>
                    <p className="text-xs sm:text-sm">• Consider half size up for thick socks</p>
                    <p className="text-xs sm:text-sm">• Athletic styles may run larger</p>
                    <p className="text-xs sm:text-sm">• Leave thumb width space at toe</p>
                  </div>
                </div>

                <div className="bg-brand-light p-4 sm:p-6 border border-brand-light/50 rounded-lg">
                  <h3 className="text-base sm:text-lg font-light text-brand-primary mb-3 sm:mb-4 chinese-accent">Formal Shoes</h3>
                  <div className="space-y-1 sm:space-y-2 text-brand-secondary chinese-accent">
                    <p className="text-xs sm:text-sm">• May run half size smaller</p>
                    <p className="text-xs sm:text-sm">• Leather will stretch slightly</p>
                    <p className="text-xs sm:text-sm">• Should feel snug but not tight</p>
                    <p className="text-xs sm:text-sm">• Consider foot width for oxfords</p>
                  </div>
                </div>

                <div className="bg-brand-light p-4 sm:p-6 border border-brand-light/50 rounded-lg">
                  <h3 className="text-base sm:text-lg font-light text-brand-primary mb-3 sm:mb-4 chinese-accent">Boots</h3>
                  <div className="space-y-1 sm:space-y-2 text-brand-secondary chinese-accent">
                    <p className="text-xs sm:text-sm">• Usually true to size</p>
                    <p className="text-xs sm:text-sm">• Consider thicker socks</p>
                    <p className="text-xs sm:text-sm">• High-tops may feel different</p>
                    <p className="text-xs sm:text-sm">• Allow for ankle movement</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-brand-light p-4 sm:p-6 bg-brand-primary text-on-primary">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-accent text-on-accent mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-light text-brand-accent mb-3 sm:mb-4 japanese-title">
              Still Not Sure About Your Size?
            </h3>
            <p className="text-sm sm:text-base text-on-primary/80 mb-4 sm:mb-6 chinese-accent">
              Our sizing experts are here to help you find the perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent text-xs sm:text-sm"
              >
                <Link href="/contact">Get Sizing Help</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent flex items-center text-xs sm:text-sm"
              >
                <Link href="tel:+256758306513">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Call: +256 758 306 513
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="text-brand-accent hover:text-brand-accent/80 flex items-center text-xs sm:text-sm"
              >
                <Link href="/size-guide">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Full Size Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}