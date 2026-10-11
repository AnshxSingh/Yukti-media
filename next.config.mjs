/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  poweredByHeader: false,

  // Optimize images: convert to WebP/AVIF automatically
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compress responses with gzip/brotli (enabled by default in production)
  compress: true,
};

export default nextConfig;