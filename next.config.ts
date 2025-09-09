import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true
  },
  webpack: (config, { isServer }) => {
    // Handle drizzle-orm modules properly
    if (isServer) {
      // For server-side, don't bundle these modules
      config.externals = config.externals || [];
      config.externals.push(
        'drizzle-orm',
        'drizzle-orm/pg-core',
        'drizzle-orm/neon-http',
        'drizzle-orm/postgres-js',
        '@neondatabase/serverless',
        'postgres'
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    '*.clackypaas.com',
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    'drizzle-orm',
    '@neondatabase/serverless',
    'postgres',
    'pg'
  ],
};

export default nextConfig;