#!/bin/bash

# Redeploy Vercel App and Run Migration
# This script redeploys your app with the fixed migration and sets up the database

echo "🚀 YourDuka - Redeploy and Migration Fix"
echo "======================================="
echo ""

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Step 1: Ensure you're logged in to Vercel"
vercel whoami 2>/dev/null || vercel login

echo ""
echo "🚀 Step 2: Redeploying with fixes..."
echo "This will deploy the updated migration code and package.json"
vercel --prod

echo ""
echo "⏳ Waiting for deployment to complete..."
echo "This usually takes 1-2 minutes..."
sleep 60

echo ""
echo "🎯 Step 3: Testing the migration fix..."
read -p "Enter your Vercel URL (e.g., https://yourduuka-eight.vercel.app): " VERCEL_URL
VERCEL_URL=${VERCEL_URL%/}

echo ""
echo "🔧 Running database migration with fixed code..."
MIGRATE_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/migrate")

echo "Migration response:"
echo "$MIGRATE_RESPONSE"

# Check if migration was successful
if [[ $MIGRATE_RESPONSE == *"\"success\":true"* ]]; then
    echo ""
    echo "✅ Migration successful! Now seeding database..."
    
    sleep 3
    
    SEED_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/seed")
    echo "Seed response:"
    echo "$SEED_RESPONSE"
    
    sleep 5
    
    echo ""
    echo "🧪 Testing APIs..."
    PRODUCTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
    CATEGORIES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")
    
    echo "Products API status: $PRODUCTS_STATUS"
    echo "Categories API status: $CATEGORIES_STATUS"
    
    if [ "$PRODUCTS_STATUS" = "200" ] && [ "$CATEGORIES_STATUS" = "200" ]; then
        echo ""
        echo "🎉 SUCCESS! Your deployment is now working!"
        echo "========================================"
        echo ""
        echo "🌐 Your store: $VERCEL_URL"
        echo "🔐 Admin panel: $VERCEL_URL/admin"
        echo "📧 Email: admin@yourduka.com"  
        echo "🔑 Password: admin123"
        echo ""
        echo "✅ Database migrated successfully"
        echo "✅ All APIs working (200 status)"
        echo "✅ Ready for production use!"
        echo ""
        echo "🛒 Your YourDuka shoe store is now live! 👟"
        
        # Add size information
        echo ""
        echo "👟 Adding size information to products..."
        
        # Update a few key products with sizes
        echo "Updating Nike Air Max 270..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
          "$VERCEL_URL/api/products/nike-air-max-270"
          
        echo "Updating Adidas Ultraboost..."
        curl -s -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
          -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
          "$VERCEL_URL/api/products/adidas-ultraboost-22"
          
        echo ""
        echo "✅ Size functionality enabled!"
        echo "🎊 Your store now has working size selectors and size guides!"
        
    else
        echo ""
        echo "⚠️ APIs still returning errors. Debugging..."
        echo "Products response sample:"
        curl -s "$VERCEL_URL/api/products" | head -c 300
    fi
    
else
    echo ""
    echo "❌ Migration still failing. Response:"
    echo "$MIGRATE_RESPONSE"
    echo ""
    echo "💡 Possible issues:"
    echo "- Environment variables not set correctly"
    echo "- Database connection issues"
    echo "- Need to check Vercel function logs"
fi

echo ""
echo "🔍 Deployment complete. Check your site at: $VERCEL_URL"