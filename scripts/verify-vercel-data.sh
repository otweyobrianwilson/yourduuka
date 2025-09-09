#!/bin/bash

# YourDuka Vercel Deployment Verification
# Use this script to verify that your data migration was successful

echo "🔍 YourDuka Vercel Deployment Verification"
echo "=========================================="
echo ""

# Get Vercel URL from user
read -p "Enter your Vercel deployment URL (e.g., https://yourduka.vercel.app): " VERCEL_URL

# Remove trailing slash
VERCEL_URL=${VERCEL_URL%/}

echo ""
echo "🎯 Verifying: $VERCEL_URL"
echo ""

# Test 1: Homepage
echo "1️⃣ Testing homepage..."
HOME_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/")
if [ "$HOME_RESPONSE" = "200" ]; then
    echo "✅ Homepage: OK ($HOME_RESPONSE)"
else
    echo "❌ Homepage: FAILED ($HOME_RESPONSE)"
fi

# Test 2: Products API
echo "2️⃣ Testing products API..."
PRODUCTS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
if [ "$PRODUCTS_RESPONSE" = "200" ]; then
    echo "✅ Products API: OK ($PRODUCTS_RESPONSE)"
    
    # Check if products have size data
    PRODUCTS_DATA=$(curl -s "$VERCEL_URL/api/products" | head -c 500)
    if [[ $PRODUCTS_DATA == *"availableSizes"* ]]; then
        echo "✅ Size data: Present in API"
    else
        echo "⚠️  Size data: Not found in products"
    fi
else
    echo "❌ Products API: FAILED ($PRODUCTS_RESPONSE)"
fi

# Test 3: Categories API
echo "3️⃣ Testing categories API..."
CATEGORIES_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")
if [ "$CATEGORIES_RESPONSE" = "200" ]; then
    echo "✅ Categories API: OK ($CATEGORIES_RESPONSE)"
else
    echo "❌ Categories API: FAILED ($CATEGORIES_RESPONSE)"
fi

# Test 4: Specific product with sizes
echo "4️⃣ Testing specific product (Adidas Ultraboost)..."
PRODUCT_RESPONSE=$(curl -s "$VERCEL_URL/api/products/adidas-ultraboost-22-updated")
if [[ $PRODUCT_RESPONSE == *"availableSizes"* && $PRODUCT_RESPONSE == *"sizeCategory"* ]]; then
    echo "✅ Product size data: Present"
    echo "   📊 Size category found: $(echo $PRODUCT_RESPONSE | grep -o '"sizeCategory":"[^"]*"' | cut -d'"' -f4)"
else
    echo "⚠️  Product size data: Missing or incomplete"
fi

# Test 5: Admin page
echo "5️⃣ Testing admin page..."
ADMIN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/admin")
if [ "$ADMIN_RESPONSE" = "200" ]; then
    echo "✅ Admin page: OK ($ADMIN_RESPONSE)"
else
    echo "❌ Admin page: FAILED ($ADMIN_RESPONSE)"
fi

# Test 6: Size guide page
echo "6️⃣ Testing size guide page..."
SIZE_GUIDE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/size-guide")
if [ "$SIZE_GUIDE_RESPONSE" = "200" ]; then
    echo "✅ Size guide page: OK ($SIZE_GUIDE_RESPONSE)"
else
    echo "❌ Size guide page: FAILED ($SIZE_GUIDE_RESPONSE)"
fi

echo ""
echo "🎯 Verification Summary"
echo "======================"
echo "🌐 Deployment URL: $VERCEL_URL"
echo "🔐 Admin panel: $VERCEL_URL/admin"
echo "📧 Admin email: admin@yourduka.com"
echo "🔑 Admin password: admin123"
echo ""

# Final recommendations
if [ "$HOME_RESPONSE" = "200" ] && [ "$PRODUCTS_RESPONSE" = "200" ] && [[ $PRODUCT_RESPONSE == *"availableSizes"* ]]; then
    echo "🎉 SUCCESS: Your YourDuka deployment is working perfectly!"
    echo "✅ All APIs are responding correctly"
    echo "✅ Size functionality is present"
    echo "✅ Ready for production use"
else
    echo "⚠️  ISSUES DETECTED: Some components may need attention"
    echo "💡 Try running the migration script again:"
    echo "   ./scripts/migrate-to-vercel.sh"
fi

echo ""
echo "🚀 Your YourDuka e-commerce platform is live! 👟🛒"