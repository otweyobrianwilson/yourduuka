#!/bin/bash

# =============================================================================
# YourDuka E-commerce - Vercel Deployment Setup Script
# =============================================================================
# This script sets up your Vercel deployment with all required environment variables
# Run this script to complete your deployment setup in one go
# =============================================================================

echo "🚀 YourDuka E-commerce - Vercel Deployment Setup"
echo "=================================================="
echo ""

# Step 1: Install Vercel CLI globally
echo "📦 Step 1: Installing Vercel CLI globally..."
npm i -g vercel
echo "✅ Vercel CLI installed successfully"
echo ""

# Step 2: Login to Vercel
echo "🔐 Step 2: Login to Vercel..."
echo "📝 Note: This will open your browser for authentication"
vercel login
echo "✅ Vercel login completed"
echo ""

# Step 3: Link project to Vercel
echo "🔗 Step 3: Linking project to Vercel..."
echo "📝 Note: Follow the prompts to link your project"
vercel link
echo "✅ Project linked successfully"
echo ""

# Step 4: Set up environment variables
echo "🔧 Step 4: Setting up environment variables..."
echo ""

# DATABASE_URL - Neon PostgreSQL connection string
echo "📊 Adding DATABASE_URL (Neon Database)..."
vercel env add DATABASE_URL production << EOF
postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
EOF
echo "✅ DATABASE_URL added successfully"
echo ""

# AUTH_SECRET - JWT signing secret
echo "🔑 Adding AUTH_SECRET (JWT Secret)..."
vercel env add AUTH_SECRET production << EOF
d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81
EOF
echo "✅ AUTH_SECRET added successfully"
echo ""

# NODE_ENV - Environment mode
echo "⚙️ Adding NODE_ENV (Environment Mode)..."
vercel env add NODE_ENV production << EOF
production
EOF
echo "✅ NODE_ENV added successfully"
echo ""

# Step 5: Deploy to production
echo "🚀 Step 5: Deploying to production..."
echo "📝 Note: This will build and deploy your application"
vercel --prod
echo "✅ Deployment completed successfully"
echo ""

# Step 6: Display next steps
echo "🎉 DEPLOYMENT COMPLETED!"
echo "======================="
echo ""
echo "📋 Next Steps:"
echo "1. Your application is now live on Vercel"
echo "2. Run database migrations using the API endpoints:"
echo ""
echo "   # Replace 'yourdomain.vercel.app' with your actual domain"
echo "   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' https://yourdomain.vercel.app/api/migrate"
echo ""
echo "   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' https://yourdomain.vercel.app/api/seed"
echo ""
echo "🔐 Admin Login Credentials:"
echo "   Email: admin@yourduka.com"
echo "   Password: admin123"
echo ""
echo "🎯 Your YourDuka e-commerce platform is now LIVE! 🛒✨"