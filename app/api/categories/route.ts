import { NextRequest, NextResponse } from 'next/server';
import { db, categories, products } from '@/lib/db/connection';
import { eq, count } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema for category creation/update
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
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
        .groupBy(categories.id)
        .orderBy(categories.name);

      return NextResponse.json({ categories: categoriesWithCount });
    } else {
      // Get categories without product counts
      const categoriesResult = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          imageUrl: categories.imageUrl,
          isActive: categories.isActive,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .from(categories)
        .where(eq(categories.isActive, true))
        .orderBy(categories.name);

      return NextResponse.json({ categories: categoriesResult });
    }

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    return NextResponse.json({
      success: true,
      category: newCategory,
      message: 'Category created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create category', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');
    
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate input data
    const validatedData = categorySchema.parse(body);
    
    // Check if category exists
    const existingCategory = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, parseInt(categoryId)))
      .limit(1);
      
    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if slug is unique (excluding current category)
    const slugExists = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, validatedData.slug))
      .limit(1);
      
    if (slugExists.length > 0 && slugExists[0].id !== parseInt(categoryId)) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Update category
    const [updatedCategory] = await db
      .update(categories)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, parseInt(categoryId)))
      .returning();

    return NextResponse.json({
      success: true,
      category: updatedCategory,
      message: 'Category updated successfully',
    });

  } catch (error) {
    console.error('Error updating category:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update category', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');
    
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const existingCategory = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, parseInt(categoryId)))
      .limit(1);
      
    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if category has products
    const productsInCategory = await db
      .select({ count: count(products.id) })
      .from(products)
      .where(eq(products.categoryId, parseInt(categoryId)));
      
    if (productsInCategory[0]?.count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with existing products. Please move or delete products first.' },
        { status: 400 }
      );
    }
    
    // Delete category
    await db
      .delete(categories)
      .where(eq(categories.id, parseInt(categoryId)));

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category', details: error.message },
      { status: 500 }
    );
  }
}