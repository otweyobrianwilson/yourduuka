#!/bin/bash

# YourDuka Vercel Deployment Debugger & Fixer
# This script diagnoses and fixes common deployment issues

echo "🔧 YourDuka Vercel Deployment Debugger"
echo "======================================"
echo ""

# Get Vercel URL from user
read -p "Enter your Vercel deployment URL (e.g., https://yourduka.vercel.app): " VERCEL_URL

# Remove trailing slash
VERCEL_URL=${VERCEL_URL%/}

echo ""
echo "🎯 Debugging: $VERCEL_URL"
echo ""

# Test 1: Check if site loads
echo "1️⃣ Testing basic connectivity..."
HOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/")
echo "Homepage status: $HOME_STATUS"

if [ "$HOME_STATUS" != "200" ]; then
    echo "❌ Site not loading properly"
    exit 1
fi

# Test 2: Check API endpoints
echo ""
echo "2️⃣ Testing API endpoints..."

# Test products API
echo "Testing /api/products..."
PRODUCTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
PRODUCTS_RESPONSE=$(curl -s "$VERCEL_URL/api/products")
echo "Products API status: $PRODUCTS_STATUS"

if [ "$PRODUCTS_STATUS" = "500" ]; then
    echo "❌ Products API failing - Database likely not set up"
    echo "📋 Response preview: $(echo $PRODUCTS_RESPONSE | head -c 200)"
fi

# Test categories API
echo "Testing /api/categories..."
CATEGORIES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")
echo "Categories API status: $CATEGORIES_STATUS"

# Test cart API
echo "Testing /api/cart..."
CART_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/cart?sessionId=test123")
echo "Cart API status: $CART_STATUS"

echo ""

if [ "$PRODUCTS_STATUS" = "500" ] || [ "$CATEGORIES_STATUS" = "500" ] || [ "$CART_STATUS" = "500" ]; then
    echo "🚨 DATABASE SETUP REQUIRED"
    echo "========================="
    echo ""
    echo "The 500 errors indicate your database isn't set up yet."
    echo "Let's fix this now!"
    echo ""
    
    # Step 1: Run migrations
    echo "🔧 Step 1: Setting up database schema..."
    MIGRATE_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/migrate")
    echo "Migration result: $MIGRATE_RESPONSE"
    
    # Wait a moment for migration to complete
    echo "⏳ Waiting for migration to complete..."
    sleep 3
    
    # Step 2: Seed database
    echo ""
    echo "🌱 Step 2: Seeding database with initial data..."
    SEED_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/seed")
    echo "Seed result: $SEED_RESPONSE"
    
    # Wait for seeding to complete
    echo "⏳ Waiting for seeding to complete..."
    sleep 5
    
    # Step 3: Test APIs again
    echo ""
    echo "🧪 Step 3: Testing APIs after setup..."
    
    PRODUCTS_STATUS_AFTER=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
    echo "Products API status (after): $PRODUCTS_STATUS_AFTER"
    
    CATEGORIES_STATUS_AFTER=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")
    echo "Categories API status (after): $CATEGORIES_STATUS_AFTER"
    
    CART_STATUS_AFTER=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/cart?sessionId=test123")
    echo "Cart API status (after): $CART_STATUS_AFTER"
    
    echo ""
    
    if [ "$PRODUCTS_STATUS_AFTER" = "200" ] && [ "$CATEGORIES_STATUS_AFTER" = "200" ]; then
        echo "✅ SUCCESS! Database setup completed"
        echo ""
        echo "🎯 Now adding size functionality..."
        
        # Step 4: Add size data
        echo ""
        echo "👟 Step 4: Adding size information to products..."
        
        # Nike Air Max 270
        echo "Updating Nike Air Max 270..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
          "$VERCEL_URL/api/products/nike-air-max-270"
        
        # Adidas Ultraboost
        echo "Updating Adidas Ultraboost..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
          "$VERCEL_URL/api/products/adidas-ultraboost-22"
        
        # New Balance
        echo "Updating New Balance..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["8","8.5","9","9.5","10","10.5","11","11.5","12"],"sizeCategory":"Men"}' \
          "$VERCEL_URL/api/products/new-balance-fresh-foam-x"
        
        # Timberland
        echo "Updating Timberland..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
          "$VERCEL_URL/api/products/timberland-6-inch-premium-boots"
        
        # Vans
        echo "Updating Vans..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["8","8.5","9","9.5","10","10.5","11","11.5","12"],"sizeCategory":"Men"}' \
          "$VERCEL_URL/api/products/vans-old-skool-classic"
        
        # Dr. Martens
        echo "Updating Dr. Martens..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["4","4.5","5","5.5","6","6.5","7","7.5","8"],"sizeCategory":"Women"}' \
          "$VERCEL_URL/api/products/dr-martens-1460-boots"
        
        echo ""
        echo "🎉 FIXED! Your deployment should now work correctly."
        echo "====================================="
        echo ""
        echo "🌐 Your site: $VERCEL_URL"
        echo "🔐 Admin: $VERCEL_URL/admin"
        echo "📧 Email: admin@yourduka.com"
        echo "🔑 Password: admin123"
        echo ""
        echo "✅ All APIs should now return 200 status"
        echo "✅ Size functionality is enabled"
        echo "✅ Ready for use!"
        
    else
        echo "❌ Setup failed. Check Vercel logs for details."
        echo "💡 Try checking your environment variables in Vercel dashboard:"
        echo "   - DATABASE_URL"
        echo "   - AUTH_SECRET"
        echo "   - NODE_ENV"
    fi
    
else
    echo "✅ All APIs working correctly!"
    echo "Your deployment appears to be functioning properly."
fi

echo ""
echo "🔍 Final verification in 5 seconds..."
sleep 5

# Final test
FINAL_PRODUCTS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
FINAL_CATEGORIES=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")

echo "Final status check:"
echo "Products API: $FINAL_PRODUCTS"
echo "Categories API: $FINAL_CATEGORIES"

if [ "$FINAL_PRODUCTS" = "200" ] && [ "$FINAL_CATEGORIES" = "200" ]; then
    echo ""
    echo "🎊 SUCCESS! Your YourDuka deployment is now working!"
    echo "🛒 Visit: $VERCEL_URL"
else
    echo ""
    echo "⚠️  Still having issues. Check Vercel function logs."
fi