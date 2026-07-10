import type { NextConfig } from "next";

// Config de producción — cutover a rigma.com.ar
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.6.232'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
