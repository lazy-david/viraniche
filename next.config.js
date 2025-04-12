/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Add output configuration for better caching
  output: 'standalone',
  // Add experimental features for better performance
  experimental: {
    // Enable caching for faster builds
    turbotrace: {
      logLevel: 'error',
    },
    // Enable persistent caching
    cache: true,
  },
  // Increase build cache size
  distDir: '.next',
}

module.exports = nextConfig