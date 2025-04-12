/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  experimental: {
    turbotrace: {
      logLevel: 'error',
    },
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',    // For Google profile images
      'i.ytimg.com',                  // For YouTube thumbnails
      'img.youtube.com',              // Additional YouTube image domain
      'yt3.ggpht.com'                 // For YouTube channel avatars
    ],
  },
}

module.exports = nextConfig