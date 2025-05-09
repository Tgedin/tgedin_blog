/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // This will prevent ESLint errors from failing your production builds
    // Only recommended if you're confident in your code quality
    ignoreDuringBuilds: true,
  },
  // This will ignore TypeScript errors during builds (if you're using TypeScript)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com", "localhost"], // Add any external domains you fetch images from
    formats: ["image/webp"], // Prioritize WebP format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Define responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Define image sizes for better optimization
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  // Add this to properly handle image paths from content
  async rewrites() {
    return [
      {
        source: "/content/:path*",
        destination: "/api/content/:path*",
      },
    ];
  },
  // Add server-side caching through response headers
  async headers() {
    return [
      {
        source: "/blog/:year/:slug",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=60, s-maxage=600, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/projects/:slug",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=60, s-maxage=600, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/api/content/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Add s-maxage for better CDN caching on Vercel's edge network
            value:
              "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  // Remove the compiler options to use the default React JSX transform
  webpack: (config) => {
    // Only keep the essential config
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
