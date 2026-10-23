import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { indexable } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Belt and braces for non-official deployments (covers non-HTML assets too).
  async headers() {
    // The admin and the CMS API must never be indexed, even on the official domain.
    const always = [{ source: "/(admin|api)/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
    if (indexable) return always;
    return [...always, { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default withPayload(nextConfig);
