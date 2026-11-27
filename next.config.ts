import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  // Animation and Illustration were retired for Product development; keep old links working.
  async redirects() {
    return ["animation", "illustration"].map((slug) => ({
      source: `/case-studies/${slug}`,
      destination: "/case-studies/product-development",
      permanent: true,
    }));
  },
};

export default nextConfig;
