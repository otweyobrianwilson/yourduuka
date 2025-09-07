import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// Check if we're in build time using multiple indicators
const isBuildTime = (
  (process.env.NODE_ENV === 'production' && !process.env.POSTGRES_URL) ||
  process.env.VERCEL === '1' ||
  process.env.CI === 'true' ||
  process.env.NEXT_PHASE === 'phase-production-build'
) && !process.env.POSTGRES_URL;

if (!process.env.POSTGRES_URL) {
  if (isBuildTime) {
    console.warn('⚠️  Database connection skipped during build time (POSTGRES_URL not available)');
  } else {
    throw new Error('POSTGRES_URL environment variable is not set');
  }
}

// Create a mock client for build time
const mockClient = {
  query: () => Promise.resolve({ rows: [] }),
  end: () => Promise.resolve(),
} as any;

export const client = process.env.POSTGRES_URL ? postgres(process.env.POSTGRES_URL) : mockClient;
export const db = drizzle(client, { schema });
