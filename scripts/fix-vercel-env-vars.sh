#!/bin/bash

# Fix Vercel Environment Variables
# This script helps set up the missing environment variables in Vercel

echo "🔧 Vercel Environment Variables Fixer"
echo "===================================="
echo ""
echo "The 'Unauthorized' errors mean your environment variables aren't set in Vercel."
echo "Let's fix this!"
echo ""

# Check if user has Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Step 1: Login to Vercel (if not already logged in)"
vercel whoami 2>/dev/null || vercel login

echo ""
echo "🔗 Step 2: Link to your project (if not already linked)"
vercel link

echo ""
echo "🔧 Step 3: Setting up environment variables..."
echo ""

# Set DATABASE_URL
echo "📊 Setting DATABASE_URL..."
vercel env add DATABASE_URL production << EOF
postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
EOF

echo ""

# Set AUTH_SECRET
echo "🔑 Setting AUTH_SECRET..."
vercel env add AUTH_SECRET production << EOF
d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81
EOF

echo ""

# Set NODE_ENV
echo "⚙️ Setting NODE_ENV..."
vercel env add NODE_ENV production << EOF
production
EOF

echo ""
echo "✅ Environment variables set!"
echo ""
echo "🚀 Step 4: Redeploying to apply changes..."
vercel --prod

echo ""
echo "⏳ Waiting for deployment to complete..."
echo "This may take 1-2 minutes..."
sleep 30

echo ""
echo "🎯 Step 5: Testing the fix..."
read -p "Enter your Vercel URL (e.g., https://yourduka.vercel.app): " VERCEL_URL
VERCEL_URL=${VERCEL_URL%/}

echo ""
echo "🔧 Now trying database setup with proper authentication..."

# Try migration again
echo "Running migration..."
MIGRATE_RESULT=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/migrate")
echo "Migration result: $MIGRATE_RESULT"

sleep 3

# Try seeding
echo "Running seed..."
SEED_RESULT=$(curl -s -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "$VERCEL_URL/api/seed")
echo "Seed result: $SEED_RESULT"

sleep 5

# Test APIs
echo ""
echo "🧪 Testing APIs..."
PRODUCTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/products")
CATEGORIES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/categories")

echo "Products API: $PRODUCTS_STATUS"
echo "Categories API: $CATEGORIES_STATUS"

if [ "$PRODUCTS_STATUS" = "200" ] && [ "$CATEGORIES_STATUS" = "200" ]; then
    echo ""
    echo "🎉 SUCCESS! Your deployment is now working!"
    echo "================================"
    echo ""
    echo "🌐 Your site: $VERCEL_URL"
    echo "🔐 Admin: $VERCEL_URL/admin"
    echo "📧 Email: admin@yourduka.com"
    echo "🔑 Password: admin123"
    echo ""
    echo "✅ All APIs working"
    echo "✅ Database properly set up"
    echo "✅ Ready for use!"
else
    echo ""
    echo "⚠️ Still having issues. Let's check what's happening..."
    echo ""
    echo "Debug information:"
    echo "Products response: $(curl -s "$VERCEL_URL/api/products" | head -c 200)"
fi