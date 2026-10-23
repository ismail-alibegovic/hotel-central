import type { NextConfig } from "next";
import { indexable } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Belt and braces for non-official deployments (covers non-HTML assets too).
  async headers() {
    if (indexable) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
