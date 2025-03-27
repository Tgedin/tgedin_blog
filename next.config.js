/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp'], // Prioritize WebP format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Define responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Define image sizes for better optimization
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  // Add this to properly handle image paths from content
  async rewrites() {
    return [
      {
        source: '/content/:path*',
        destination: '/api/content/:path*',
      },
    ];
  },
}

module.exports = nextConfig
