import path from "path";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Rooms } from "./cms/collections/Rooms";
import { Users } from "./cms/collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Secrets come from the environment only. During `next build` (no runtime secrets) a placeholder
// keeps the config loadable; it is never used because nothing is served at build time.
const building = process.env.NEXT_PHASE === "phase-production-build";
const secret = process.env.PAYLOAD_SECRET ?? (building ? "build-time-placeholder" : "");
if (!secret) throw new Error("PAYLOAD_SECRET is required when the CMS is enabled.");

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — Hotel Central CMS", robots: "noindex, nofollow" },
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const slug = (data as { slug?: string })?.slug;
        if (!slug) return `${serverURL}/en`;
        const route = collectionConfig?.slug === "rooms" ? `/rooms/${slug}` : `/${slug}`;
        // Goes through the authenticated preview route, which enables Draft Mode for staff only.
        return `${serverURL}/api/preview?path=${encodeURIComponent(`/${locale?.code ?? "en"}${route}`)}`;
      },
      collections: ["pages", "rooms"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  // Only REST is exposed; GraphQL is off so there is a single, tested write path.
  graphQL: { disable: true },
  collections: [Users, Media, Pages, Rooms],
  // bs and en are authored independently; a missing translation stays empty (never silently English).
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "bs", label: "Bosanski" },
    ],
    defaultLocale: "en",
    fallback: false,
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({ url: process.env.DATABASE_URL ?? "" }),
  secret,
  // Cookie-authenticated requests are only accepted from our own origin (CSRF protection).
  ...(serverURL ? { serverURL, csrf: [serverURL] } : {}),
  sharp,
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    // Media goes to Vercel Blob when a token is configured; otherwise to the local MEDIA_DIR (dev/test only —
    // serverless disks are ephemeral, so production must set BLOB_READ_WRITE_TOKEN).
    vercelBlobStorage({ enabled: Boolean(blobToken), collections: { media: true }, token: blobToken ?? "" }),
  ],
});
