import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // assetPrefix: '/android_asset/h5/',
  /* config options here */
  assetPrefix: '.',
  output: 'export',
  images: {
    // domains: ["192.168.50.247"],
    domains: ["192.168.1.33"],
    unoptimized: true,
  },
};

export default nextConfig;
