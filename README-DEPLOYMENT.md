# Deployment Guide for YourDuka E-commerce Platform

## Environment Setup

This application supports both local development and production deployment with automatic database driver selection:

- **Local Development**: Uses `postgres` driver with `POSTGRES_URL`
- **Production (Vercel + Neon)**: Uses `@neondatabase/serverless` driver with `DATABASE_URL`

## Environment Variables

### Required Variables

```env
# Database (choose one based on environment)
DATABASE_URL=postgresql://username:password@hostname:port/database  # For Neon/Production
POSTGRES_URL=postgresql://username:password@hostname:port/database   # For local development

# Application
BASE_URL=https://yourdomain.com  # Production URL or http://localhost:3000 for local
AUTH_SECRET=your-super-secret-auth-key-at-least-32-chars-long

# Optional - Auto-generated if not provided
NODE_ENV=production  # Set to production for Vercel
```

### For Vercel Deployment

1. **Set up Neon Database**:
   - Create a new project at [neon.tech](https://neon.tech)
   - Copy the connection string

2. **Configure Vercel Environment Variables**:
   ```
   DATABASE_URL=postgresql://username:password@hostname.neon.tech/neondb
   BASE_URL=https://yourdomain.vercel.app
   AUTH_SECRET=your-super-secret-auth-key-at-least-32-chars-long
   NODE_ENV=production
   ```

## Database Driver Selection

The application automatically detects the environment and uses the appropriate driver:

### Production/Serverless (Neon)
- Uses `@neondatabase/serverless` with `drizzle-orm/neon-http`
- Triggers when:
  - `NODE_ENV=production`
  - `VERCEL=1` (Vercel environment)
  - `DATABASE_URL` contains "neon.tech"

### Local Development
- Uses `postgres` with `drizzle-orm/postgres-js`
- Used for local development environment

## Database Operations

### Migrations
```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations
```

### Seeding
```bash
npm run db:seed      # Populate with sample data
```

### Setup (Development)
```bash
npm run db:setup     # Complete setup with migrations
```

## API Endpoints

All API endpoints work seamlessly with both database drivers:

- `GET /api/products` - List products
- `GET /api/categories` - List categories
- `GET /api/cart` - Cart operations
- `GET /api/products/[slug]` - Product details
- `POST /api/orders` - Create orders

## Deployment Steps

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Set Environment Variables in Vercel
- Go to Vercel dashboard → Your project → Settings → Environment Variables
- Add all required environment variables

### 3. Database Setup
- Migrations will run automatically in serverless environment
- For initial seed data, run locally then push to Neon:

```bash
# Set production DATABASE_URL locally
export DATABASE_URL="your-neon-connection-string"
npm run db:seed
```

## Troubleshooting

### Connection Issues
- Ensure `DATABASE_URL` is correctly formatted
- Verify Neon database is accessible
- Check environment variable names (case-sensitive)

### Migration Issues
- Run migrations locally first: `npm run db:migrate`
- Ensure schema changes are committed to git

### Build Issues
- The app includes build-time safety checks
- Database connections are only established at runtime
- Safe to build without database access

## Local Development

```bash
# Install dependencies
npm install

# Set up local database
npm run db:setup

# Start development server
npm run dev
```

## Production Features

- ✅ Automatic driver selection (Neon vs Postgres)
- ✅ Environment-based configuration
- ✅ Build-time safety (no DB required for builds)
- ✅ Serverless-optimized database connections
- ✅ Zero-config deployment ready
- ✅ Backward compatible with existing setups