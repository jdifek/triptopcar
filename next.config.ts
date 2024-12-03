import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turboMode: false, // Отключение Turbopack
  },
};

export default nextConfig;
