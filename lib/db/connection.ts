import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Simple database connection without complex abstraction
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required');
}

// Create postgres client
const client = postgres(dbUrl, {
  max: 20,
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

// Create drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for easy access
export { schema };

// Export individual schema tables for convenience
export const {
  users,
  categories,
  products,
  carts,
  cartItems,
  orders,
  orderItems,
  activityLogs
} = schema;

console.log('✅ Database connection initialized');