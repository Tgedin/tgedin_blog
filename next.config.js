/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
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
  // Add this to disable the strict mode in development which can help with hydration issues
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // Important for MDX hydration issues
  webpack: (config, { dev, isServer }) => {
    // Handle MDX better - this can help with entity encoding consistency
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
