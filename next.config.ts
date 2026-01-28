import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.themealdb.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // 👇 Add this new line for the Flaticon icons
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" } 
    ],
  },
};

export default nextConfig;