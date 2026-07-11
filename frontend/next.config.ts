import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "contact-app-images-030069488705-ap-south-1-an.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;