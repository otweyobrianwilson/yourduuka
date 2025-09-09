import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth/session';
import * as schema from '@/lib/db/schema';

/**
 * Determine if we should use Neon based on environment
 */
function shouldUseNeon(): boolean {
  return !!(process.env.DATABASE_URL && (
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL ||
    process.env.DATABASE_URL.includes('neon.tech')
  ));
}

export async function POST(request: NextRequest) {
  // Basic security check - only allow with proper auth
  const authHeader = request.headers.get('authorization');
  const expectedAuth = process.env.AUTH_SECRET;
  
  if (!expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if we're in the right environment
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!dbUrl) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not configured' 
      }, { status: 400 });
    }

    console.log('🌱 Starting database seeding...');
    
    let client: any;
    let db: any;
    
    if (shouldUseNeon()) {
      // Use Neon for production/serverless
      const { neon } = await import('@neondatabase/serverless');
      const { drizzle } = await import('drizzle-orm/neon-http');
      
      client = neon(dbUrl);
      db = drizzle(client, { schema });
      
      console.log('✅ Neon serverless database connection established for seeding');
    } else {
      // Use postgres for local development
      const { drizzle } = await import('drizzle-orm/postgres-js');
      const postgres = (await import('postgres')).default;
      
      client = postgres(dbUrl);
      db = drizzle(client, { schema });
      
      console.log('✅ Postgres database connection established for seeding');
    }
    
    const { users, categories, products } = schema;
    
    // Create admin user
    const email = 'admin@yourduka.com';
    const password = 'admin123';
    const passwordHash = await hashPassword(password);

    const [adminUser] = await db
      .insert(users)
      .values([
        {
          email: email,
          passwordHash: passwordHash,
          name: 'YourDuka Admin',
          isAdmin: true,
          phone: '+256 758 306 513',
          address: 'Kampala, Uganda',
          city: 'Kampala',
          country: 'Uganda',
        },
      ])
      .returning();

    console.log('Admin user created.');

    // Create categories
    const categoriesData = [
      {
        name: 'Sneakers',
        slug: 'sneakers',
        description: 'Comfortable and stylish sneakers for everyday wear',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      },
      {
        name: 'Boots',
        slug: 'boots',
        description: 'Durable and fashionable boots for all occasions',
        imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400',
      },
      {
        name: 'Formal Shoes',
        slug: 'formal-shoes',
        description: 'Elegant formal shoes for business and special events',
        imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400',
      },
      {
        name: 'Sandals',
        slug: 'sandals',
        description: 'Comfortable sandals for warm weather',
        imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
      },
      {
        name: 'Sports Shoes',
        slug: 'sports-shoes',
        description: 'High-performance athletic footwear',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      },
    ];

    const insertedCategories = await db
      .insert(categories)
      .values(categoriesData)
      .returning();

    console.log('Categories created.');

    // Create sample products with size information
    const productsData = [
      // Sneakers
      {
        name: 'Nike Air Max 270',
        slug: 'nike-air-max-270',
        description: 'The Nike Air Max 270 is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike\'s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.',
        shortDescription: 'Comfortable Nike sneakers with Air Max technology',
        price: '320000',
        comparePrice: '380000',
        sku: 'NK-AM270-001',
        quantity: 25,
        images: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'
        ],
        categoryId: insertedCategories[0].id,
        brand: 'Nike',
        material: 'Mesh/Synthetic',
        color: 'White/Black',
        size: '42',
        gender: 'Unisex',
        isFeatured: true,
        tags: ['nike', 'air max', 'comfortable', 'trendy'],
        availableSizes: [6, 7, 8, 9, 10, 11, 12],
        sizeCategory: 'Unisex'
      },
      {
        name: 'Adidas Ultraboost 22',
        slug: 'adidas-ultraboost-22',
        description: 'Made with a series of recycled materials, this upper features at least 50% recycled content. This product represents just one of our solutions to help end plastic waste.',
        shortDescription: 'Eco-friendly Adidas running shoes',
        price: '420000',
        comparePrice: '480000',
        sku: 'AD-UB22-001',
        quantity: 18,
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'
        ],
        categoryId: insertedCategories[0].id,
        brand: 'Adidas',
        material: 'Primeknit',
        color: 'Black/White',
        size: '43',
        gender: 'Unisex',
        isFeatured: true,
        tags: ['adidas', 'ultraboost', 'running', 'eco-friendly'],
        availableSizes: [6, 7, 8, 9, 10, 11, 12, 13],
        sizeCategory: 'Unisex'
      },
      // Boots
      {
        name: 'Timberland 6-Inch Premium Boots',
        slug: 'timberland-6-inch-premium-boots',
        description: 'Our original Timberland boot. Crafted for the outdoors with premium waterproof leather, these boots have been an icon of style and function for decades.',
        shortDescription: 'Waterproof premium leather boots',
        price: '580000',
        comparePrice: '650000',
        sku: 'TB-6IP-001',
        quantity: 12,
        images: [
          'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=600',
          'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600'
        ],
        categoryId: insertedCategories[1].id,
        brand: 'Timberland',
        material: 'Premium Leather',
        color: 'Wheat/Brown',
        size: '41',
        gender: 'Unisex',
        isFeatured: false,
        tags: ['timberland', 'boots', 'waterproof', 'durable'],
        availableSizes: [6, 7, 8, 9, 10, 11, 12],
        sizeCategory: 'Unisex'
      },
      // Formal Shoes
      {
        name: 'Cole Haan Grand Crosscourt',
        slug: 'cole-haan-grand-crosscourt',
        description: 'A sophisticated dress shoe that combines classic style with modern comfort technology. Perfect for the office or formal events.',
        shortDescription: 'Elegant dress shoes with comfort technology',
        price: '480000',
        sku: 'CH-GC-001',
        quantity: 8,
        images: [
          'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600',
          'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600'
        ],
        categoryId: insertedCategories[2].id,
        brand: 'Cole Haan',
        material: 'Genuine Leather',
        color: 'Black',
        size: '42',
        gender: 'Men',
        isFeatured: false,
        tags: ['cole haan', 'formal', 'dress shoes', 'leather'],
        availableSizes: [6, 7, 8, 9, 10, 11, 12],
        sizeCategory: 'Men'
      },
      // Sandals
      {
        name: 'Birkenstock Arizona Sandals',
        slug: 'birkenstock-arizona-sandals',
        description: 'The Arizona is our most recognizable two-strap sandal. Iconic style with legendary comfort and support.',
        shortDescription: 'Comfortable two-strap sandals',
        price: '180000',
        comparePrice: '220000',
        sku: 'BK-AZ-001',
        quantity: 30,
        images: [
          'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600',
          'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600'
        ],
        categoryId: insertedCategories[3].id,
        brand: 'Birkenstock',
        material: 'Birko-Flor',
        color: 'Brown',
        size: '40',
        gender: 'Unisex',
        isFeatured: false,
        tags: ['birkenstock', 'sandals', 'comfortable', 'summer'],
        availableSizes: [5, 6, 7, 8, 9, 10, 11],
        sizeCategory: 'Unisex'
      },
      // Sports Shoes
      {
        name: 'New Balance Fresh Foam X',
        slug: 'new-balance-fresh-foam-x',
        description: 'Experience the ultimate in comfort and performance with Fresh Foam X midsole technology.',
        shortDescription: 'High-performance running shoes',
        price: '380000',
        sku: 'NB-FFX-001',
        quantity: 22,
        images: [
          'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600',
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600'
        ],
        categoryId: insertedCategories[4].id,
        brand: 'New Balance',
        material: 'Synthetic/Mesh',
        color: 'Gray/Blue',
        size: '44',
        gender: 'Unisex',
        isFeatured: true,
        tags: ['new balance', 'running', 'fresh foam', 'performance'],
        availableSizes: [6, 7, 8, 9, 10, 11, 12, 13],
        sizeCategory: 'Unisex'
      },
      // More products...
      {
        name: 'Converse Chuck Taylor All Star',
        slug: 'converse-chuck-taylor-all-star',
        description: 'The original basketball shoe. An authentic icon that has remained unchanged through the decades.',
        shortDescription: 'Classic canvas sneakers',
        price: '180000',
        sku: 'CV-CTAS-001',
        quantity: 35,
        images: [
          'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600',
          'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600'
        ],
        categoryId: insertedCategories[0].id,
        brand: 'Converse',
        material: 'Canvas',
        color: 'Red',
        size: '39',
        gender: 'Unisex',
        isFeatured: false,
        tags: ['converse', 'chuck taylor', 'classic', 'canvas'],
        availableSizes: [5, 6, 7, 8, 9, 10, 11, 12],
        sizeCategory: 'Unisex'
      },
      {
        name: 'Vans Old Skool',
        slug: 'vans-old-skool',
        description: 'The Old Skool is Vans classic skate shoe and the first to feature the iconic side stripe.',
        shortDescription: 'Classic skate shoes with side stripe',
        price: '220000',
        comparePrice: '250000',
        sku: 'VN-OS-001',
        quantity: 28,
        images: [
          'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600'
        ],
        categoryId: insertedCategories[0].id,
        brand: 'Vans',
        material: 'Suede/Canvas',
        color: 'Black/White',
        size: '41',
        gender: 'Unisex',
        isFeatured: true,
        tags: ['vans', 'old skool', 'skate', 'iconic'],
        availableSizes: [5, 6, 7, 8, 9, 10, 11, 12],
        sizeCategory: 'Unisex'
      }
    ];

    const insertedProducts = await db
      .insert(products)
      .values(productsData)
      .returning();

    console.log(`${insertedProducts.length} products created.`);
    console.log('Seed data created successfully.');
    
    // Close database connection (only for postgres, Neon connections auto-close)
    if (!shouldUseNeon() && client.end) {
      await client.end();
      console.log('Database connection closed.');
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      results: {
        adminUser: adminUser.email,
        categories: insertedCategories.length,
        products: insertedProducts.length
      }
    });

  } catch (error: any) {
    console.error('Seeding failed:', error);
    
    // Check if it's a duplicate key error (already seeded)
    if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
      return NextResponse.json({
        success: true,
        message: 'Database already seeded (duplicate key detected)',
        warning: 'Some data may already exist'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Seeding failed',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint ready. Use POST with Authorization header.',
    usage: 'curl -X POST -H "Authorization: Bearer YOUR_AUTH_SECRET" /api/seed'
  });
}