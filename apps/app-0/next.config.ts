import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  transpilePackages: ["@repo/components", "@repo/types"],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false, // Disable automatic locale detection to use our middleware
  },
  images: {
    domains: ["cdn.shopify.com", "cdn.builder.io", "images.pexels.com", "placehold.co","shopify.com"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
});

export default nextConfig;
