/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.ytimg.com',
      'img.youtube.com',
      'yt3.ggpht.com',
      'lh3.googleusercontent.com'  // Added Google domain for profile images
    ],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript during production builds
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig