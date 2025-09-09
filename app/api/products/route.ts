import { NextRequest, NextResponse } from 'next/server';
import { db, products, categories } from '@/lib/db/connection';
import { eq, and, gte, lte, ilike, or, inArray, desc, asc, isNotNull, count } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema for product creation/update
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Product slug is required'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{2})?$/, 'Invalid price format'),
  comparePrice: z.string().regex(/^\d+(\.\d{2})?$/).optional().nullable(),
  sku: z.string().optional(),
  barcode: z.string().optional().nullable(),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  minQuantity: z.number().int().min(0).optional(),
  weight: z.number().positive().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  images: z.array(z.string().url()).optional(),
  categoryId: z.number().int().positive('Category is required'),
  brand: z.string().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  gender: z.enum(['Men', 'Women', 'Kids', 'Unisex']).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const size = searchParams.get('size');
    const color = searchParams.get('color');
    const gender = searchParams.get('gender');
    const inStock = searchParams.get('inStock') === 'true';
    const onSale = searchParams.get('onSale') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Parse array parameters
    const categoriesFilter = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const brands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
    const colors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
    const genders = searchParams.get('genders')?.split(',').filter(Boolean) || [];

    // Build conditions array
    const conditions = [];

    // Only active products
    conditions.push(eq(products.isActive, true));

    // Search condition
    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.description, `%${search}%`),
          ilike(products.brand, `%${search}%`)
        )
      );
    }

    // Category filter by slug
    if (category) {
      // Get category ID from slug
      const categoryRecord = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, category))
        .limit(1);
      
      if (categoryRecord.length > 0) {
        conditions.push(eq(products.categoryId, categoryRecord[0].id));
      } else {
        // If category slug doesn't exist, return empty result
        conditions.push(eq(products.id, -1)); // This will return no results
      }
    }

    // Categories filter (array)
    if (categoriesFilter.length > 0) {
      // Convert category names to IDs
      const categoryIds = await db
        .select({ id: categories.id })
        .from(categories)
        .where(inArray(categories.slug, categoriesFilter));
      
      if (categoryIds.length > 0) {
        conditions.push(inArray(products.categoryId, categoryIds.map(c => c.id)));
      }
    }

    // Brand filter
    if (brand) {
      conditions.push(eq(products.brand, brand));
    }

    // Brands filter (array)
    if (brands.length > 0) {
      conditions.push(inArray(products.brand, brands));
    }

    // Price range
    if (minPrice) {
      conditions.push(gte(products.price, minPrice));
    }
    if (maxPrice) {
      conditions.push(lte(products.price, maxPrice));
    }

    // Size filter
    if (size) {
      conditions.push(eq(products.size, size));
    }

    // Sizes filter (array)
    if (sizes.length > 0) {
      conditions.push(inArray(products.size, sizes));
    }

    // Color filter
    if (color) {
      conditions.push(eq(products.color, color));
    }

    // Colors filter (array)
    if (colors.length > 0) {
      conditions.push(inArray(products.color, colors));
    }

    // Gender filter
    if (gender) {
      conditions.push(eq(products.gender, gender));
    }

    // Genders filter (array)
    if (genders.length > 0) {
      conditions.push(inArray(products.gender, genders));
    }

    // In stock filter
    if (inStock) {
      conditions.push(gte(products.quantity, 1));
    }

    // On sale filter (has compare price and it's higher than current price)
    if (onSale) {
      conditions.push(
        and(
          isNotNull(products.comparePrice),
          gte(products.comparePrice, products.price)
        )
      );
    }

    // Featured filter
    if (featured) {
      conditions.push(eq(products.isFeatured, true));
    }

    // Determine sort column and order
    let orderBy;
    switch (sortBy) {
      case 'name':
        orderBy = sortOrder === 'asc' ? asc(products.name) : desc(products.name);
        break;
      case 'price':
        orderBy = sortOrder === 'asc' ? asc(products.price) : desc(products.price);
        break;
      case 'createdAt':
      default:
        orderBy = sortOrder === 'asc' ? asc(products.createdAt) : desc(products.createdAt);
        break;
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build the query with join to categories
    let query = db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        shortDescription: products.shortDescription,
        price: products.price,
        comparePrice: products.comparePrice,
        sku: products.sku,
        quantity: products.quantity,
        images: products.images,
        categoryId: products.categoryId,
        brand: products.brand,
        material: products.material,
        color: products.color,
        size: products.size,
        gender: products.gender,
        isFeatured: products.isFeatured,
        tags: products.tags,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        // Include category information
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply ordering
    query = query.orderBy(orderBy);

    // Apply pagination
    query = query.limit(limit).offset(offset);

    // Execute query
    const result = await query;

    // Get total count for pagination
    let countQuery = db
      .select({ count: count() })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }

    const [{ count: totalCount }] = await countQuery;

    const totalPages = Math.ceil(totalCount / limit);

    // Format response
    const response = {
      products: result,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    const body = await request.json();
    
    // Validate input data
    const validatedData = productSchema.parse(body);
    
    // Check if product with same slug already exists
    const existingProduct = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, validatedData.slug))
      .limit(1);
      
    if (existingProduct.length > 0) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const categoryExists = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, validatedData.categoryId))
      .limit(1);
      
    if (categoryExists.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }
    
    // Create new product
    const [newProduct] = await db
      .insert(products)
      .values({
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}