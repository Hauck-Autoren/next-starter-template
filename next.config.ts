import type { NextConfig } from "next";



import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    deviceSizes: [320, 360, 375, 414, 540, 600, 640, 700, 750, 828, 960, 1024, 1200],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 150, 256, 300, 384, 450, 512, 600, 640],
  },
  compiler: { styledComponents: true },
};

export default nextConfig;

