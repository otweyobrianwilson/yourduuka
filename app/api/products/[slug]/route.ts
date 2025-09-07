import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { products, categories } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

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
    const relatedProducts = await db
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
          products.id !== product.id
        )
      )
      .limit(4);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // This would typically require admin authentication
    const { slug } = params;
    const body = await request.json();

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        price: body.price,
        comparePrice: body.comparePrice,
        costPrice: body.costPrice,
        sku: body.sku,
        quantity: body.quantity,
        weight: body.weight,
        dimensions: body.dimensions,
        images: body.images,
        categoryId: body.categoryId,
        brand: body.brand,
        material: body.material,
        color: body.color,
        size: body.size,
        gender: body.gender,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        tags: body.tags,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug))
      .returning();

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // This would typically require admin authentication
    const { slug } = params;

    // Soft delete by setting isActive to false
    const [deletedProduct] = await db
      .update(products)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug))
      .returning();

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}