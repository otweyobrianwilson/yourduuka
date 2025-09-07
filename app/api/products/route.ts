import { NextRequest, NextResponse } from 'next/server';
import { getDb, getSchema, getDrizzleORM } from '@/lib/db/safe-drizzle';
import { createBuildSafeResponse } from '@/lib/build-utils';

export async function GET(request: NextRequest) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({
      products: [],
      total: 0,
      page: 1,
      totalPages: 0,
    });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse);
    }
    
    // Get safe database references
    const db = getDb();
    const schema = getSchema();
    const drizzleORM = getDrizzleORM();
    
    if (!db || !schema || !drizzleORM) {
      console.error('⚠️ Database not available in runtime');
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }
    
    const { products, categories } = schema;
    const { eq, and, gte, lte, ilike, or, inArray, desc, asc, isNotNull } = drizzleORM;

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

    // Category filter
    if (category) {
      conditions.push(eq(products.categoryId, parseInt(category)));
    }

    // Categories filter (array)
    if (categoriesFilter.length > 0) {
      // Note: This assumes categories are stored by name in a field
      // You may need to adjust based on your actual schema
      conditions.push(inArray(products.brand, categoriesFilter)); // Adjust this field
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

    // Build the query
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
        brand: products.brand,
        material: products.material,
        color: products.color,
        size: products.size,
        gender: products.gender,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        tags: products.tags,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        categoryId: products.categoryId,
      })
      .from(products);

    // Apply conditions and execute query
    let productsResult;
    if (conditions.length > 0) {
      productsResult = await query
        .where(and(...conditions))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);
    } else {
      productsResult = await query
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);
    }

    // Get total count for pagination
    let countResult;
    if (conditions.length > 0) {
      countResult = await db
        .select({ count: products.id })
        .from(products)
        .where(and(...conditions));
    } else {
      countResult = await db
        .select({ count: products.id })
        .from(products);
    }
    const total = countResult.length;

    return NextResponse.json({
      products: productsResult,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would typically require admin authentication
    // For now, we'll create a basic implementation
    
    const body = await request.json();
    
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({ id: 0 });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse);
    }
    
    // Get safe database references
    const db = getDb();
    const schema = getSchema();
    
    if (!db || !schema) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }
    
    const { products } = schema;
    
    // Create new product
    const [newProduct] = await db
      .insert(products)
      .values({
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        price: body.price,
        comparePrice: body.comparePrice,
        costPrice: body.costPrice,
        sku: body.sku,
        quantity: body.quantity || 0,
        weight: body.weight,
        dimensions: body.dimensions,
        images: body.images || [],
        categoryId: body.categoryId,
        brand: body.brand,
        material: body.material,
        color: body.color,
        size: body.size,
        gender: body.gender,
        isActive: body.isActive !== false,
        isFeatured: body.isFeatured || false,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        tags: body.tags || [],
      })
      .returning();

    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}