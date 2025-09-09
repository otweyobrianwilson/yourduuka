// Quick script to update existing products with size information
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products } from '../lib/db/schema.js';
import { eq } from 'drizzle-orm';

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = postgres(connectionString);
const db = drizzle(sql);

async function updateProductSizes() {
  console.log('🔄 Updating products with size information...');

  try {
    // Sample size data - common UK shoe sizes
    const mensSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
    const womensSizes = ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'];
    const unisexSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];

    // Get all products
    const allProducts = await db.select().from(products);
    
    for (const product of allProducts) {
      let availableSizes;
      let sizeCategory;

      // Determine size category based on product name/brand
      if (product.name.toLowerCase().includes('women') || 
          product.gender?.toLowerCase() === 'women') {
        sizeCategory = 'Women';
        availableSizes = womensSizes.slice(0, Math.floor(Math.random() * 5) + 6); // Random 6-10 sizes
      } else if (product.name.toLowerCase().includes('men') || 
                 product.gender?.toLowerCase() === 'men') {
        sizeCategory = 'Men';
        availableSizes = mensSizes.slice(0, Math.floor(Math.random() * 6) + 7); // Random 7-12 sizes
      } else {
        sizeCategory = 'Unisex';
        availableSizes = unisexSizes.slice(0, Math.floor(Math.random() * 5) + 6); // Random 6-10 sizes
      }

      // Update the product
      await db
        .update(products)
        .set({
          availableSizes: availableSizes,
          sizeCategory: sizeCategory
        })
        .where(eq(products.id, product.id));

      console.log(`✅ Updated ${product.name}: ${sizeCategory} sizes [${availableSizes.join(', ')}]`);
    }

    console.log('🎉 Successfully updated all products with size information!');
  } catch (error) {
    console.error('❌ Error updating products:', error);
  } finally {
    await sql.end();
  }
}

// Run the update
updateProductSizes();