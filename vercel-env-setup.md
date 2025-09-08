# Vercel Environment Variables Setup

## Step 2: Set Environment Variables in Vercel

### Option A: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add DATABASE_URL
# Enter: postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

vercel env add BASE_URL
# Enter: https://yourdomain.vercel.app (replace with your actual domain)

vercel env add AUTH_SECRET
# Enter: d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81

vercel env add NODE_ENV
# Enter: production
```

### Option B: Via Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

**DATABASE_URL** (Production, Preview, Development):
```
postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**BASE_URL** (Production, Preview):
```
https://yourdomain.vercel.app
```

**AUTH_SECRET** (Production, Preview, Development):
```
d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81
```

**NODE_ENV** (Production):
```
production
```

## Step 3: Deploy with Vercel

### Deploy Command:
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### Or link to existing project:
```bash
vercel link
vercel --prod
```

## Step 4: Run Migrations (if needed)

After deployment, you may need to run migrations:

### Option A: Using Vercel CLI with production environment:
```bash
# Set production DATABASE_URL locally for migration
export DATABASE_URL="postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
export NODE_ENV="production"

# Run migrations
npm run db:migrate

# Seed database (optional - only run once)
npm run db:seed
```

### Option B: Using Vercel Functions:
Create an API endpoint for migrations (run once after deployment):
```bash
curl -X POST https://yourdomain.vercel.app/api/migrate
```

## Verification

After deployment, test these endpoints:
- `https://yourdomain.vercel.app/` - Home page
- `https://yourdomain.vercel.app/api/products` - Products API
- `https://yourdomain.vercel.app/api/categories` - Categories API

## Troubleshooting

### Database Connection Issues:
- Ensure Neon database is active
- Check connection string format
- Verify environment variables are set correctly

### Build Issues:
- The app is configured to build without database access
- Database connections only happen at runtime

### Function Timeout:
- Neon serverless driver is optimized for fast connections
- Functions are configured with 30s timeout in vercel.json