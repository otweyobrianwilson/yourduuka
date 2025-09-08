/**
 * Safe database wrapper that handles build-time scenarios and supports both Neon and postgres drivers
 */

import { isBuildTime } from '@/lib/build-utils';

let _db: any = null;
let _client: any = null;
let _schema: any = null;
let _drizzleORM: any = null;

/**
 * Determine if we should use Neon based on environment
 */
function shouldUseNeon(): boolean {
  // Use Neon if DATABASE_URL is set and we're in production or Vercel
  return !!(process.env.DATABASE_URL && (
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL ||
    process.env.DATABASE_URL.includes('neon.tech')
  ));
}

/**
 * Get database connection - returns null during build time
 */
export function getDb() {
  if (isBuildTime()) {
    return null;
  }

  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!_db && dbUrl) {
    try {
      const schema = require('./schema');
      _schema = schema;
      
      if (shouldUseNeon()) {
        // Use Neon for production/serverless
        const { neon } = require('@neondatabase/serverless');
        const { drizzle } = require('drizzle-orm/neon-http');
        
        _client = neon(dbUrl);
        _db = drizzle(_client, { schema });
        
        console.log('✅ Neon serverless database connection established');
      } else {
        // Use postgres for local development
        const { drizzle } = require('drizzle-orm/postgres-js');
        const postgres = require('postgres');
        
        _client = postgres(dbUrl);
        _db = drizzle(_client, { schema });
        
        console.log('✅ Postgres database connection established');
      }
    } catch (error) {
      console.error('⚠️ Database connection failed:', error.message);
      throw error;
    }
  }
  
  return _db;
}

/**
 * Get database client - returns null during build time
 */
export function getClient() {
  if (isBuildTime()) {
    return null;
  }
  
  getDb(); // Ensure connection is established
  return _client;
}

/**
 * Get schema - returns null during build time
 */
export function getSchema() {
  if (isBuildTime()) {
    return null;
  }
  
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!_schema && dbUrl) {
    _schema = require('./schema');
  }
  
  return _schema;
}

/**
 * Get Drizzle ORM utilities - returns null during build time
 */
export function getDrizzleORM() {
  if (isBuildTime()) {
    return null;
  }
  
  if (!_drizzleORM) {
    _drizzleORM = require('drizzle-orm');
  }
  
  return _drizzleORM;
}

// Note: Legacy direct exports removed to prevent build-time initialization issues
// Use getDb() and getClient() functions instead