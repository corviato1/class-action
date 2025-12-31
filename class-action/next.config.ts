import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    "https://*.replit.dev",
    "https://*.replit.app",
    "https://*.riker.replit.dev",
  ],
};

export default nextConfig;
