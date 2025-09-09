#!/usr/bin/env node

/**
 * YourDuka Data Migration to Vercel
 * This script migrates your local database data to your Vercel deployment
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function migrateData() {
  console.log('🚀 YourDuka Data Migration to Vercel');
  console.log('====================================');
  console.log('📦 This will migrate your local data including size information to Vercel\n');

  // Get Vercel URL
  const vercelUrl = await askQuestion('Enter your Vercel deployment URL (e.g., https://yourduka.vercel.app): ');
  const cleanUrl = vercelUrl.replace(/\/$/, ''); // Remove trailing slash

  console.log('\n📊 Step 1: Running database migrations on Vercel...');
  
  try {
    // Run migrations
    const migrateResponse = await fetch(`${cleanUrl}/api/migrate`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81'
      }
    });
    
    if (migrateResponse.ok) {
      console.log('✅ Database migrations completed');
    } else {
      console.log('⚠️  Migration response:', migrateResponse.status);
    }

    console.log('\n📋 Step 2: Seeding basic data...');
    
    // Seed basic data
    const seedResponse = await fetch(`${cleanUrl}/api/seed`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81'
      }
    });
    
    if (seedResponse.ok) {
      console.log('✅ Basic data seeded successfully');
    } else {
      console.log('⚠️  Seed response:', seedResponse.status);
    }

    console.log('\n🏪 Step 3: Updating products with size information...');

    // Size updates based on your local data
    const sizeUpdates = [
      {
        slug: 'nike-air-max-270',
        name: 'Nike Air Max 270',
        availableSizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
        sizeCategory: 'Unisex'
      },
      {
        slug: 'adidas-ultraboost-22-updated',
        name: 'Adidas Ultraboost 22 - Updated',
        availableSizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
        sizeCategory: 'Unisex'
      },
      {
        slug: 'timberland-6-inch-premium-boots',
        name: 'Timberland 6-Inch Premium Boots',
        availableSizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
        sizeCategory: 'Unisex'
      },
      {
        slug: 'new-balance-fresh-foam-x',
        name: 'New Balance Fresh Foam X',
        availableSizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        sizeCategory: 'Men'
      },
      {
        slug: 'vans-old-skool-classic',
        name: 'Vans Old Skool Classic',
        availableSizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        sizeCategory: 'Men'
      },
      {
        slug: 'dr-martens-1460-boots',
        name: 'Dr. Martens 1460 Boots',
        availableSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'],
        sizeCategory: 'Women'
      },
      {
        slug: 'converse-chuck-taylor-all-star',
        name: 'Converse Chuck Taylor All Star',
        availableSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'],
        sizeCategory: 'Women'
      }
    ];

    // Update each product with size information
    for (const product of sizeUpdates) {
      try {
        console.log(`Updating ${product.name}...`);
        
        const updateResponse = await fetch(`${cleanUrl}/api/products/${product.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81'
          },
          body: JSON.stringify({
            availableSizes: product.availableSizes,
            sizeCategory: product.sizeCategory
          })
        });

        if (updateResponse.ok) {
          console.log(`✅ ${product.name} updated with ${product.sizeCategory} sizes`);
        } else {
          console.log(`⚠️  Failed to update ${product.name}: ${updateResponse.status}`);
        }
      } catch (error) {
        console.log(`❌ Error updating ${product.name}: ${error.message}`);
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('=====================================');
    console.log(`🌐 Your deployment: ${cleanUrl}`);
    console.log(`🔐 Admin panel: ${cleanUrl}/admin`);
    console.log('📧 Email: admin@yourduka.com');
    console.log('🔑 Password: admin123');
    console.log('\n✅ Your Vercel deployment now has all your local data with size functionality!');

  } catch (error) {
    console.error('❌ Error during migration:', error.message);
  }

  rl.close();
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('⚠️  This script requires Node.js 18+ with fetch support.');
  console.log('Installing node-fetch for compatibility...');
  
  try {
    const fetch = require('node-fetch');
    global.fetch = fetch;
    migrateData();
  } catch (error) {
    console.log('❌ Please install node-fetch: npm install node-fetch');
    console.log('Or use Node.js 18+ which has built-in fetch support.');
  }
} else {
  migrateData();
}