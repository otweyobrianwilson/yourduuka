import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { categories, products } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import { createBuildSafeResponse } from '@/lib/build-utils';

export async function GET(request: NextRequest) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({
      categories: [],
    });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse);
    }

    const { searchParams } = new URL(request.url);
    const includeProductCount = searchParams.get('includeProductCount') === 'true';

    if (includeProductCount) {
      // Get categories with product counts
      const categoriesWithCount = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          imageUrl: categories.imageUrl,
          isActive: categories.isActive,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
          productCount: count(products.id),
        })
        .from(categories)
        .leftJoin(products, eq(categories.id, products.categoryId))
        .where(eq(categories.isActive, true))
        .groupBy(categories.id);

      return NextResponse.json({ categories: categoriesWithCount });
    } else {
      // Get categories without product counts
      const categoriesResult = await db
        .select()
        .from(categories)
        .where(eq(categories.isActive, true));

      return NextResponse.json({ categories: categoriesResult });
    }

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if we're in build time and return safe response
    const buildResponse = createBuildSafeResponse({
      success: true,
      message: 'Category created',
    });
    
    if (buildResponse) {
      return NextResponse.json(buildResponse, { status: 201 });
    }

    // This would typically require admin authentication
    const body = await request.json();
    
    // Create new category
    const [newCategory] = await db
      .insert(categories)
      .values({
        name: body.name,
        slug: body.slug,
        description: body.description,
        imageUrl: body.imageUrl,
        isActive: body.isActive !== false,
      })
      .returning();

    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}