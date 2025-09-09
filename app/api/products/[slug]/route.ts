import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db/connection';
import { eq, and, ne } from 'drizzle-orm';
import { z } from 'zod';

const { products, categories } = schema;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get product with category information
    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        shortDescription: products.shortDescription,
        price: products.price,
        comparePrice: products.comparePrice,
        sku: products.sku,
        barcode: products.barcode,
        quantity: products.quantity,
        minQuantity: products.minQuantity,
        weight: products.weight,
        dimensions: products.dimensions,
        images: products.images,
        brand: products.brand,
        material: products.material,
        color: products.color,
        size: products.size,
        gender: products.gender,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        seoTitle: products.seoTitle,
        seoDescription: products.seoDescription,
        tags: products.tags,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        categoryId: products.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.slug, slug), eq(products.isActive, true)));

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get related products (same category, different product)
    let relatedProducts: any[] = [];
    if (product.categoryId) {
      relatedProducts = await db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          comparePrice: products.comparePrice,
          images: products.images,
          brand: products.brand,
          size: products.size,
          color: products.color,
          isFeatured: products.isFeatured,
        })
        .from(products)
        .where(
          and(
            eq(products.categoryId, product.categoryId),
            eq(products.isActive, true),
            // Exclude current product
            ne(products.id, product.id)
          )
        )
        .limit(4);
    }

    return NextResponse.json({
      product,
      relatedProducts,
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// Admin product update endpoint
const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{2})?$/).optional(),
  comparePrice: z.string().regex(/^\d+(\.\d{2})?$/).optional().nullable(),
  sku: z.string().optional(),
  quantity: z.number().int().min(0).optional(),
  images: z.array(z.string().url()).optional(),
  brand: z.string().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  gender: z.enum(['Men', 'Women', 'Unisex']).optional(),
  categoryId: z.number().int().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // TODO: Add admin authentication check here
    // For now, we'll allow updates but this should be protected
    
    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    // Check if product exists
    const [existingProduct] = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, slug));

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug))
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid product data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // TODO: Add admin authentication check here
    // For now, we'll allow deletions but this should be protected
    
    // Check if product exists
    const [existingProduct] = await db
      .select({ id: products.id, name: products.name })
      .from(products)
      .where(eq(products.slug, slug));

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    // This preserves data integrity and allows for recovery
    const [deletedProduct] = await db
      .update(products)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug))
      .returning({ id: products.id, name: products.name, isActive: products.isActive });

    return NextResponse.json({
      success: true,
      message: `Product "${deletedProduct.name}" has been deactivated`,
      product: deletedProduct,
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', details: error.message },
      { status: 500 }
    );
  }
}