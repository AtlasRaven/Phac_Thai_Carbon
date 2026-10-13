import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISATS serves authenticated client/admin dashboards plus database-backed
  // pages that are always request-time, so the app opts out of the Cache
  // Components model and renders dynamically.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
