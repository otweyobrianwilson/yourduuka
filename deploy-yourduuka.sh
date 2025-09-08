#!/bin/bash

# =============================================================================
# YourDuka E-commerce - Complete Build & Deploy Script
# =============================================================================
# Single command to build and deploy your entire e-commerce platform
# This script combines: npm run build + Vercel deployment + environment setup
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 YourDuka E-commerce - Complete Build & Deploy${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""

# Step 1: Build the application locally first
echo -e "${YELLOW}📦 Step 1: Building application locally...${NC}"
echo -e "${BLUE}📝 Running: npm run build${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local build completed successfully${NC}"
else
    echo -e "${RED}❌ Local build failed. Please check the errors above.${NC}"
    exit 1
fi
echo ""

# Step 2: Install Vercel CLI globally
echo -e "${YELLOW}📦 Step 2: Installing Vercel CLI globally...${NC}"
npm i -g vercel
echo -e "${GREEN}✅ Vercel CLI installed successfully${NC}"
echo ""

# Step 3: Login to Vercel
echo -e "${YELLOW}🔐 Step 3: Login to Vercel...${NC}"
echo -e "${BLUE}📝 Note: This will open your browser for authentication${NC}"
vercel login
echo -e "${GREEN}✅ Vercel login completed${NC}"
echo ""

# Step 4: Link project to Vercel
echo -e "${YELLOW}🔗 Step 4: Linking project to Vercel...${NC}"
echo -e "${BLUE}📝 Note: Follow the prompts to link your project${NC}"
vercel link
echo -e "${GREEN}✅ Project linked successfully${NC}"
echo ""

# Step 5: Set up environment variables
echo -e "${YELLOW}🔧 Step 5: Setting up environment variables...${NC}"
echo ""

# DATABASE_URL - Neon PostgreSQL connection string
echo -e "${BLUE}📊 Adding DATABASE_URL (Neon Database)...${NC}"
echo "postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | vercel env add DATABASE_URL production
echo -e "${GREEN}✅ DATABASE_URL added successfully${NC}"
echo ""

# AUTH_SECRET - JWT signing secret
echo -e "${BLUE}🔑 Adding AUTH_SECRET (JWT Secret)...${NC}"
echo "d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" | vercel env add AUTH_SECRET production
echo -e "${GREEN}✅ AUTH_SECRET added successfully${NC}"
echo ""

# NODE_ENV - Environment mode
echo -e "${BLUE}⚙️ Adding NODE_ENV (Environment Mode)...${NC}"
echo "production" | vercel env add NODE_ENV production
echo -e "${GREEN}✅ NODE_ENV added successfully${NC}"
echo ""

# Step 6: Deploy to production
echo -e "${YELLOW}🚀 Step 6: Deploying to production...${NC}"
echo -e "${BLUE}📝 Note: This will build and deploy your application on Vercel${NC}"
DEPLOYMENT_URL=$(vercel --prod --yes)
echo -e "${GREEN}✅ Deployment completed successfully${NC}"
echo ""

# Extract the deployment URL from the output
if [[ $DEPLOYMENT_URL =~ https://[^[:space:]]+ ]]; then
    DEPLOYED_URL="${BASH_REMATCH[0]}"
    echo -e "${GREEN}🌍 Your application is live at: ${DEPLOYED_URL}${NC}"
else
    echo -e "${YELLOW}⚠️ Deployment URL not detected. Check Vercel dashboard for your live URL.${NC}"
    DEPLOYED_URL="yourdomain.vercel.app"
fi

# Step 7: Database setup
echo -e "${YELLOW}🗄️ Step 7: Setting up database...${NC}"
echo -e "${BLUE}📝 Running database migrations and seeding...${NC}"

# Wait a moment for deployment to be fully ready
echo -e "${BLUE}⏳ Waiting 10 seconds for deployment to be fully ready...${NC}"
sleep 10

# Run migrations
echo -e "${BLUE}🔄 Running database migrations...${NC}"
MIGRATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "${DEPLOYED_URL}/api/migrate")
MIGRATE_HTTP_CODE=$(echo "$MIGRATE_RESPONSE" | tail -n1)

if [ "$MIGRATE_HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Database migrations completed successfully${NC}"
else
    echo -e "${YELLOW}⚠️ Migration response: $MIGRATE_HTTP_CODE. Check manually if needed.${NC}"
fi

# Run seeding
echo -e "${BLUE}🌱 Seeding database with initial data...${NC}"
SEED_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" "${DEPLOYED_URL}/api/seed")
SEED_HTTP_CODE=$(echo "$SEED_RESPONSE" | tail -n1)

if [ "$SEED_HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Database seeding completed successfully${NC}"
else
    echo -e "${YELLOW}⚠️ Seeding response: $SEED_HTTP_CODE. Check manually if needed.${NC}"
fi

echo ""

# Step 8: Final success message
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}=======================================${NC}"
echo ""
echo -e "${BLUE}🌍 Your YourDuka E-commerce Platform is now LIVE!${NC}"
if [[ $DEPLOYED_URL != "yourdomain.vercel.app" ]]; then
    echo -e "${GREEN}🔗 Live URL: ${DEPLOYED_URL}${NC}"
else
    echo -e "${YELLOW}🔗 Live URL: Check your Vercel dashboard${NC}"
fi
echo ""
echo -e "${BLUE}🔐 Admin Login Credentials:${NC}"
echo -e "${GREEN}   📧 Email: admin@yourduka.com${NC}"
echo -e "${GREEN}   🔑 Password: admin123${NC}"
echo ""
echo -e "${BLUE}📱 Features Available:${NC}"
echo -e "${GREEN}   ✅ Product catalog with categories${NC}"
echo -e "${GREEN}   ✅ Shopping cart and checkout${NC}"
echo -e "${GREEN}   ✅ User authentication${NC}"
echo -e "${GREEN}   ✅ Admin panel for management${NC}"
echo -e "${GREEN}   ✅ Order processing${NC}"
echo -e "${GREEN}   ✅ Responsive mobile design${NC}"
echo ""
echo -e "${BLUE}🛠️ Manual Database Setup (if needed):${NC}"
if [[ $DEPLOYED_URL != "yourdomain.vercel.app" ]]; then
    echo -e "${YELLOW}   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' ${DEPLOYED_URL}/api/migrate${NC}"
    echo -e "${YELLOW}   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' ${DEPLOYED_URL}/api/seed${NC}"
else
    echo -e "${YELLOW}   Replace 'yourdomain.vercel.app' with your actual domain:${NC}"
    echo -e "${YELLOW}   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' https://yourdomain.vercel.app/api/migrate${NC}"
    echo -e "${YELLOW}   curl -X POST -H 'Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81' https://yourdomain.vercel.app/api/seed${NC}"
fi
echo ""
echo -e "${GREEN}🎯 Your e-commerce platform is ready for customers! 🛒✨${NC}"