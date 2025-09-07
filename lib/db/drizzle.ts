import dotenv from 'dotenv';

dotenv.config();

// Check if we're in build time using multiple indicators
const isBuildTime = (
  (process.env.NODE_ENV === 'production' && !process.env.POSTGRES_URL) ||
  process.env.VERCEL === '1' ||
  process.env.CI === 'true' ||
  process.env.NEXT_PHASE === 'phase-production-build'
) && !process.env.POSTGRES_URL;

let client: any = null;
let db: any = null;

if (process.env.POSTGRES_URL && !isBuildTime) {
  try {
    // Dynamic imports to avoid build-time issues
    const { drizzle } = require('drizzle-orm/postgres-js');
    const postgres = require('postgres');
    const schema = require('./schema');
    
    client = postgres(process.env.POSTGRES_URL);
    db = drizzle(client, { schema });
    
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('⚠️ Database connection failed:', error.message);
    throw error;
  }
} else {
  if (isBuildTime) {
    console.warn('⚠️ Database connection skipped during build time (POSTGRES_URL not available)');
  } else {
    throw new Error('POSTGRES_URL environment variable is not set');
  }
}

export { client, db };
