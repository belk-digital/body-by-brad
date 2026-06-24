import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      { source: '/areas-we-serve-charleston-sc', destination: '/areas-we-serve' },
      { source: '/areas-we-serve-charleston-sc/:slug', destination: '/areas-we-serve/:slug' },
      { source: '/fitness-coaching-packages', destination: '/packages' },
    ];
  },
  async redirects() {
    return [
      { source: '/about', destination: '/about-brad', permanent: true },
    ];
  },
};

export default nextConfig;
