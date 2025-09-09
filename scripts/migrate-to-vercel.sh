#!/bin/bash

# YourDuka Data Migration to Vercel
# Run this script to migrate your local database data to your Vercel deployment

echo "🚀 YourDuka Data Migration to Vercel"
echo "===================================="
echo "📦 This will migrate your local data including size information"
echo ""

# Get Vercel URL from user
read -p "Enter your Vercel deployment URL (e.g., https://yourduka.vercel.app): " VERCEL_URL

# Remove trailing slash
VERCEL_URL=${VERCEL_URL%/}

# Validate URL
if [[ ! $VERCEL_URL =~ ^https?:// ]]; then
    echo "❌ Please enter a valid URL starting with http:// or https://"
    exit 1
fi

echo ""
echo "🎯 Target: $VERCEL_URL"
echo ""

# Step 1: Run migrations
echo "📊 Step 1: Running database migrations..."
MIGRATE_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/migrate")
echo "✅ Migration response: $MIGRATE_RESPONSE"

echo ""

# Step 2: Seed basic data
echo "📋 Step 2: Seeding basic data (categories, products, admin user)..."
SEED_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/seed")
echo "✅ Seed response: $SEED_RESPONSE"

echo ""

# Step 3: Update products with size information
echo "🏪 Step 3: Updating products with your local size data..."
echo ""

# Nike Air Max 270
echo "👟 Updating Nike Air Max 270..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
  "$VERCEL_URL/api/products/nike-air-max-270"

echo "✅ Nike Air Max 270 updated with Unisex sizes"

# Adidas Ultraboost 22
echo "👟 Updating Adidas Ultraboost 22..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
  "$VERCEL_URL/api/products/adidas-ultraboost-22-updated"

echo "✅ Adidas Ultraboost 22 updated with Unisex sizes"

# Timberland Boots
echo "👟 Updating Timberland 6-Inch Premium Boots..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
  "$VERCEL_URL/api/products/timberland-6-inch-premium-boots"

echo "✅ Timberland Boots updated with Unisex sizes"

# New Balance (Men's sizes)
echo "👟 Updating New Balance Fresh Foam X..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["8","8.5","9","9.5","10","10.5","11","11.5","12"],"sizeCategory":"Men"}' \
  "$VERCEL_URL/api/products/new-balance-fresh-foam-x"

echo "✅ New Balance Fresh Foam X updated with Men sizes"

# Vans (Men's sizes)
echo "👟 Updating Vans Old Skool Classic..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["8","8.5","9","9.5","10","10.5","11","11.5","12"],"sizeCategory":"Men"}' \
  "$VERCEL_URL/api/products/vans-old-skool-classic"

echo "✅ Vans Old Skool updated with Men sizes"

# Dr. Martens (Women's sizes)
echo "👟 Updating Dr. Martens 1460 Boots..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["4","4.5","5","5.5","6","6.5","7","7.5","8"],"sizeCategory":"Women"}' \
  "$VERCEL_URL/api/products/dr-martens-1460-boots"

echo "✅ Dr. Martens 1460 updated with Women sizes"

# Converse (Women's sizes)
echo "👟 Updating Converse Chuck Taylor All Star..."
curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["4","4.5","5","5.5","6","6.5","7","7.5","8"],"sizeCategory":"Women"}' \
  "$VERCEL_URL/api/products/converse-chuck-taylor-all-star"

echo "✅ Converse Chuck Taylor updated with Women sizes"

echo ""
echo "🎉 Migration completed successfully!"
echo "==================================="
echo ""
echo "🌐 Your deployment: $VERCEL_URL"
echo "🔐 Admin panel: $VERCEL_URL/admin"
echo "📧 Admin email: admin@yourduka.com"
echo "🔑 Admin password: admin123"
echo ""
echo "✅ Your Vercel deployment now includes:"
echo "   • All product data with size information"
echo "   • Size selector functionality"
echo "   • Size guide modal"
echo "   • Admin panel access"
echo "   • Complete e-commerce functionality"
echo ""
echo "🚀 Your YourDuka store is now live with full size functionality! 👟🛒"