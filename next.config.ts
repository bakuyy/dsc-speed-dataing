import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ['/admin/:path*']
};

export default nextConfig;
