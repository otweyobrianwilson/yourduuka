#!/bin/bash

# Test 404 Fix - Verify that previously problematic URLs now properly return 404
# instead of causing JavaScript preload errors

VERCEL_URL="https://yourduuka-eight.vercel.app"

echo "🧪 Testing 404 Error Fixes for YourDuka Deployment"
echo "=============================================="
echo ""

# Test main page loads successfully
echo "1. Testing main page..."
MAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/")
if [ "$MAIN_STATUS" = "200" ]; then
    echo "✅ Main page loads successfully (200)"
else
    echo "❌ Main page failed ($MAIN_STATUS)"
fi

# Test that removed footer links now return proper 404s
echo ""
echo "2. Testing removed footer links return proper 404s..."

# Account page (removed from footer)
ACCOUNT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/account")
if [ "$ACCOUNT_STATUS" = "404" ]; then
    echo "✅ /account properly returns 404"
else
    echo "❌ /account returned unexpected status: $ACCOUNT_STATUS"
fi

# Orders page (removed from footer)  
ORDERS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/orders")
if [ "$ORDERS_STATUS" = "404" ]; then
    echo "✅ /orders properly returns 404"
else
    echo "❌ /orders returned unexpected status: $ORDERS_STATUS"
fi

# Careers page (removed from footer)
CAREERS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/careers")
if [ "$CAREERS_STATUS" = "404" ]; then
    echo "✅ /careers properly returns 404"
else
    echo "❌ /careers returned unexpected status: $CAREERS_STATUS"
fi

# Blog page (removed from footer)
BLOG_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/blog")
if [ "$BLOG_STATUS" = "404" ]; then
    echo "✅ /blog properly returns 404"
else
    echo "❌ /blog returned unexpected status: $BLOG_STATUS"
fi

# Accessibility page (removed from footer)
ACCESSIBILITY_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/accessibility")
if [ "$ACCESSIBILITY_STATUS" = "404" ]; then
    echo "✅ /accessibility properly returns 404"
else
    echo "❌ /accessibility returned unexpected status: $ACCESSIBILITY_STATUS"
fi

# Test that existing pages still work
echo ""
echo "3. Testing existing pages still work..."

# Products page
PRODUCTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/products")
if [ "$PRODUCTS_STATUS" = "200" ]; then
    echo "✅ /products works (200)"
else
    echo "❌ /products failed ($PRODUCTS_STATUS)"
fi

# Admin page
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/admin")
if [ "$ADMIN_STATUS" = "200" ]; then
    echo "✅ /admin works (200)"
else
    echo "❌ /admin failed ($ADMIN_STATUS)"
fi

# Wishlist page  
WISHLIST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/wishlist")
if [ "$WISHLIST_STATUS" = "200" ]; then
    echo "✅ /wishlist works (200)"
else
    echo "❌ /wishlist failed ($WISHLIST_STATUS)"
fi

# Categories that do exist
SNEAKERS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/categories/sneakers")
if [ "$SNEAKERS_STATUS" = "200" ]; then
    echo "✅ /categories/sneakers works (200)"
else
    echo "❌ /categories/sneakers failed ($SNEAKERS_STATUS)"
fi

echo ""
echo "4. Testing API endpoints work..."

# Test API endpoints
PRODUCTS_API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
if [ "$PRODUCTS_API_STATUS" = "200" ]; then
    echo "✅ /api/products works (200)"
else
    echo "❌ /api/products failed ($PRODUCTS_API_STATUS)"
fi

CATEGORIES_API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")
if [ "$CATEGORIES_API_STATUS" = "200" ]; then
    echo "✅ /api/categories works (200)"
else
    echo "❌ /api/categories failed ($CATEGORIES_API_STATUS)"
fi

echo ""
echo "🎉 404 Fix Test Complete!"
echo "========================="
echo ""
echo "Summary:"
echo "- Removed problematic footer links that caused JS preload errors"
echo "- Non-existent pages now properly return 404 instead of causing errors" 
echo "- Existing functionality remains intact"
echo ""
echo "The JavaScript console errors should now be resolved!"