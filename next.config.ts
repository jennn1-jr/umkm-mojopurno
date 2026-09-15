import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {},
  async headers() {
    return [
      {
        // Terapkan ke semua halaman
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Izinkan iframe Google Maps Embed
            value:
              "frame-src 'self' https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // izinkan semua domain untuk foto UMKM dari API
      },
    ],
  },
};

export default withPWA(nextConfig);
