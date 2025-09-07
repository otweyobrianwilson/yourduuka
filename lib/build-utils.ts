/**
 * Utility functions for handling build-time scenarios
 */

/**
 * Check if we're currently in build time
 * This happens when Vercel is building the app but environment variables aren't available
 */
export function isBuildTime(): boolean {
  // During Vercel builds, we might not have database URLs available
  // Also check for Vercel-specific build environment variables
  const isVercelBuild = process.env.VERCEL === '1' || process.env.CI === 'true';
  const hasNoDbUrl = !process.env.POSTGRES_URL;
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Consider it build time if:
  // 1. We're in a CI/Vercel environment without database URL, OR
  // 2. We're in production without database URL, OR  
  // 3. We're explicitly in a build context (Next.js sets this during builds)
  return (
    (isVercelBuild && hasNoDbUrl) ||
    (isProduction && hasNoDbUrl) ||
    process.env.NEXT_PHASE === 'phase-production-build'
  );
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