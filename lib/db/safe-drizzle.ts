/**
 * Safe database wrapper that handles build-time scenarios
 */

import { isBuildTime } from '@/lib/build-utils';

let _db: any = null;
let _client: any = null;
let _schema: any = null;
let _drizzleORM: any = null;

/**
 * Get database connection - returns null during build time
 */
export function getDb() {
  if (isBuildTime()) {
    return null;
  }

  if (!_db && process.env.POSTGRES_URL) {
    try {
      // Lazy load modules only when needed
      const { drizzle } = require('drizzle-orm/postgres-js');
      const postgres = require('postgres');
      const schema = require('./schema');
      
      _client = postgres(process.env.POSTGRES_URL);
      _db = drizzle(_client, { schema });
      _schema = schema;
      
      console.log('✅ Database connection established');
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
  
  if (!_schema && process.env.POSTGRES_URL) {
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

// Legacy exports for backward compatibility
export const db = getDb();
export const client = getClient();