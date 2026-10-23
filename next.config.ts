import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { indexable } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Lets the end-to-end runner build a CMS-off reference site next to the CMS-on one (HTML parity test).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // withPayload would otherwise advertise "X-Powered-By: Next.js, Payload".
  poweredByHeader: false,
  // Photographs uploaded through the CMS are served from Vercel Blob (public store).
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
  // Belt and braces for non-official deployments (covers non-HTML assets too).
  async headers() {
    // The admin and the CMS API must never be indexed, even on the official domain.
    // Admin + CMS API only (the public site's responses are unchanged): never indexed, no MIME sniffing,
    // framed only by ourselves (live preview), minimal referrer.
    const always = [
      {
        source: "/(admin|api)/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
    if (indexable) return always;
    return [...always, { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default withPayload(nextConfig);
