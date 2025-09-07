'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';

export interface FilterOptions {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  genders: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

interface ProductFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export default function ProductFilter({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  onClear,
}: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category',
    'brand',
    'price',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterOptions, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: [
        'Sneakers',
        'Boots',
        'Sandals',
        'Formal Shoes',
        'Casual Shoes',
        'Sports Shoes',
        'Loafers',
      ],
      selectedValues: filters.categories,
    },
    {
      id: 'brand',
      title: 'Brand',
      options: [
        'Nike',
        'Adidas',
        'Puma',
        'Reebok',
        'Converse',
        'Vans',
        'New Balance',
        'Under Armour',
      ],
      selectedValues: filters.brands,
    },
    {
      id: 'size',
      title: 'Size',
      options: [
        '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
      ],
      selectedValues: filters.sizes,
    },
    {
      id: 'color',
      title: 'Color',
      options: [
        'Black',
        'White',
        'Red',
        'Blue',
        'Brown',
        'Gray',
        'Green',
        'Yellow',
        'Pink',
        'Purple',
      ],
      selectedValues: filters.colors,
    },
    {
      id: 'gender',
      title: 'Gender',
      options: ['Men', 'Women', 'Kids', 'Unisex'],
      selectedValues: filters.genders,
    },
  ];

  const activeFiltersCount = 
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    filters.genders.length +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-brand-red text-white text-xs rounded-full px-2 py-1">
                {activeFiltersCount}
              </span>
            )}
          </span>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        lg:block bg-white border border-gray-200 rounded-lg p-4
        ${isOpen ? 'block' : 'hidden'}
        lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                onClick={onClear}
                variant="ghost"
                size="sm"
                className="text-brand-red hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
            <button
              onClick={onToggle}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-900"
          >
            <span>Price Range</span>
            {expandedSections.includes('price') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.includes('price') && (
            <div className="mt-3 space-y-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>UGX {filters.priceRange[0].toLocaleString()}</span>
                <span>UGX {filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter Sections */}
        {filterSections.map((section) => (
          <div key={section.id} className="mb-6">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-900"
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {section.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <Checkbox
                      checked={section.selectedValues.includes(option)}
                      onCheckedChange={() =>
                        toggleArrayFilter(section.id as keyof FilterOptions, option)
                      }
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Additional Filters */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', checked)}
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={filters.onSale}
              onCheckedChange={(checked) => updateFilter('onSale', checked)}
            />
            <span className="text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </div>
    </>
  );
}