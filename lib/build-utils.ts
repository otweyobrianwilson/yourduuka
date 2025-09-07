/**
 * Utility functions for handling build-time scenarios
 */

/**
 * Check if we're currently in build time
 * This happens when Next.js is building the app, not when the app is running in production
 */
export function isBuildTime(): boolean {
  // The most reliable way to detect build time is via Next.js phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return true;
  }
  
  // During build, these are typically not available or different
  // Check for build-specific environment variables
  const isBuildContext = process.env.NEXT_PHASE?.includes('build') || 
                        process.env.npm_lifecycle_event?.includes('build') ||
                        process.env.VERCEL_GIT_COMMIT_REF && !process.env.VERCEL_URL;
  
  // If we have a database URL, we're likely in runtime, not build time
  const hasDbUrl = !!process.env.POSTGRES_URL;
  
  // Only consider it build time if we're in a build context AND don't have database URL
  // This prevents runtime from being mistaken for build time
  return isBuildContext && !hasDbUrl;
}

/**
 * Create a build-safe response for API routes
 * Returns empty data during build time to prevent database connection errors
 */
export function createBuildSafeResponse(data: any = {}) {
  if (isBuildTime()) {
    console.warn('🔧 Build time: Returning empty response for API route');
    return {
      success: true,
      buildTime: true,
      data: Array.isArray(data) ? [] : data,
      message: 'Build time response - no database connection available'
    };
  }
  return null; // Return null to indicate normal processing should continue
}

/**
 * Throws an error if called during build time to prevent database operations
 */
export function assertNotBuildTime(context: string = 'Database operation') {
  if (isBuildTime()) {
    throw new Error(`⚠️ ${context} blocked during build time - no database available`);
  }
}

/**
 * Wrapper for database operations that should be skipped during build time
 */
export async function buildSafeDbOperation<T>(
  operation: () => Promise<T>,
  fallbackValue: T
): Promise<T> {
  if (isBuildTime()) {
    console.warn('🔧 Build time: Skipping database operation');
    return fallbackValue;
  }
  
  try {
    return await operation();
  } catch (error) {
    if (isBuildTime()) {
      console.warn('🔧 Build time: Database error caught, returning fallback');
      return fallbackValue;
    }
    throw error;
  }
}