#!/usr/bin/env node

/**
 * Export Local Database Data for Vercel Migration
 * This script exports all your local database data including the size information
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 YourDuka Database Export Tool');
console.log('=================================');
console.log('📦 Exporting local database data for Vercel migration...\n');

// Database connection info from .env
const DB_CONFIG = {
  host: '127.0.0.1',
  port: '5432',
  database: 'yourduka',
  username: 'postgres',
  password: 'RhvWQQkj'
};

const exportDir = path.join(__dirname, 'db-export');

// Create export directory
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

try {
  console.log('📊 Step 1: Exporting database schema and data...');
  
  // Export complete database dump
  const dumpCommand = `PGPASSWORD=${DB_CONFIG.password} pg_dump -h ${DB_CONFIG.host} -U ${DB_CONFIG.username} -d ${DB_CONFIG.database} --clean --no-owner --no-privileges -f ${exportDir}/complete-dump.sql`;
  execSync(dumpCommand);
  console.log('✅ Complete database dump created: db-export/complete-dump.sql');

  // Export just data (for selective import)
  const dataCommand = `PGPASSWORD=${DB_CONFIG.password} pg_dump -h ${DB_CONFIG.host} -U ${DB_CONFIG.username} -d ${DB_CONFIG.database} --data-only --no-owner --no-privileges -f ${exportDir}/data-only.sql`;
  execSync(dataCommand);
  console.log('✅ Data-only dump created: db-export/data-only.sql');

  // Export individual tables as JSON (easier to work with)
  console.log('\n📋 Step 2: Exporting individual tables as JSON...');
  
  const tables = ['categories', 'products', 'users'];
  
  for (const table of tables) {
    try {
      const jsonCommand = `PGPASSWORD=${DB_CONFIG.password} psql -h ${DB_CONFIG.host} -U ${DB_CONFIG.username} -d ${DB_CONFIG.database} -t -c "SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM ${table}) t;" -o ${exportDir}/${table}.json`;
      execSync(jsonCommand);
      
      // Clean up the JSON file (remove psql formatting)
      const rawData = fs.readFileSync(`${exportDir}/${table}.json`, 'utf8');
      const cleanData = rawData.trim().replace(/^\s+|\s+$/gm, '');
      
      if (cleanData && cleanData !== 'null') {
        const jsonData = JSON.parse(cleanData);
        fs.writeFileSync(`${exportDir}/${table}.json`, JSON.stringify(jsonData, null, 2));
        console.log(`✅ Exported ${table}: ${jsonData.length} records`);
      } else {
        console.log(`⚠️  ${table} table is empty`);
        fs.writeFileSync(`${exportDir}/${table}.json`, '[]');
      }
    } catch (error) {
      console.log(`⚠️  Could not export ${table}: ${error.message}`);
      fs.writeFileSync(`${exportDir}/${table}.json`, '[]');
    }
  }

  console.log('\n🎯 Step 3: Creating migration script for Vercel...');
  
  // Read the products data to create a custom migration
  const productsData = JSON.parse(fs.readFileSync(`${exportDir}/products.json`, 'utf8') || '[]');
  const categoriesData = JSON.parse(fs.readFileSync(`${exportDir}/categories.json`, 'utf8') || '[]');
  
  // Create a migration script
  const migrationScript = `#!/bin/bash

# YourDuka Data Migration to Vercel
# Run this script after deploying to Vercel

echo "🚀 YourDuka Data Migration to Vercel"
echo "===================================="
echo ""

# Get your Vercel deployment URL
read -p "Enter your Vercel deployment URL (e.g., https://yourduka.vercel.app): " VERCEL_URL

# Remove trailing slash
VERCEL_URL=\${VERCEL_URL%/}

echo ""
echo "📊 Step 1: Running database migrations..."
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "\$VERCEL_URL/api/migrate"

echo ""
echo "📋 Step 2: Seeding basic data..."
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "\$VERCEL_URL/api/seed"

echo ""
echo "🏪 Step 3: Updating products with your local size data..."

# Product updates with size information
${productsData.map(product => {
  if (product.available_sizes && product.size_category) {
    return `echo "Updating ${product.name}..."
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \\
  -d '{"availableSizes":${JSON.stringify(product.available_sizes)},"sizeCategory":"${product.size_category}"}' \\
  "\$VERCEL_URL/api/products/${product.slug}"`;
  }
  return '';
}).filter(Boolean).join('\n\n')}

echo ""
echo "✅ Migration completed! Your Vercel deployment now has all your local data."
echo "🔐 Admin access: \$VERCEL_URL/admin"
echo "📧 Email: admin@yourduka.com"
echo "🔑 Password: admin123"
`;

  fs.writeFileSync(`${exportDir}/migrate-to-vercel.sh`, migrationScript);
  fs.chmodSync(`${exportDir}/migrate-to-vercel.sh`, '755');
  console.log('✅ Migration script created: db-export/migrate-to-vercel.sh');

  // Create a JSON file with all the size updates for easy reference
  const sizeUpdates = productsData
    .filter(p => p.available_sizes && p.size_category)
    .map(p => ({
      slug: p.slug,
      name: p.name,
      availableSizes: p.available_sizes,
      sizeCategory: p.size_category
    }));

  fs.writeFileSync(`${exportDir}/size-updates.json`, JSON.stringify(sizeUpdates, null, 2));
  console.log('✅ Size updates reference: db-export/size-updates.json');

  console.log('\n🎉 Export completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: cd scripts/db-export');
  console.log('2. Run: ./migrate-to-vercel.sh');
  console.log('3. Enter your Vercel URL when prompted');
  console.log('\nAll your local data including size information will be migrated! 🚀');

} catch (error) {
  console.error('❌ Error during export:', error.message);
  process.exit(1);
}