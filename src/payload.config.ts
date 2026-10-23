import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { isStaffUser } from "./cms/access";
import { adminI18n } from "./cms/admin/i18n";
import { poolSettings } from "./cms/db";
import { Media } from "./cms/collections/Media";
import { CustomPages } from "./cms/collections/CustomPages";
import { Pages } from "./cms/collections/Pages";
import { Rooms } from "./cms/collections/Rooms";
import { Users } from "./cms/collections/Users";
import { Footer } from "./cms/globals/Footer";
import { Homepage } from "./cms/globals/Homepage";
import { Navigation } from "./cms/globals/Navigation";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Secrets come from the environment only. During `next build` (no runtime secrets) a placeholder
// keeps the config loadable; it is never used because nothing is served at build time.
const building = process.env.NEXT_PHASE === "phase-production-build";
const secret = process.env.PAYLOAD_SECRET ?? (building ? "build-time-placeholder" : "");
if (!secret) throw new Error("PAYLOAD_SECRET is required when the CMS is enabled.");
if (process.env.NODE_ENV === "production" && !building && secret.length < 32) throw new Error("PAYLOAD_SECRET must be at least 32 characters in production.");

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — Hotel Central Website Manager", robots: "noindex, nofollow", icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }] },
    dateFormat: "dd MMM yyyy, HH:mm",
    components: {
      graphics: { Logo: "/cms/admin/Logo#Logo", Icon: "/cms/admin/Icon#Icon" },
      beforeLogin: ["/cms/admin/BeforeLogin#BeforeLogin"],
      afterLogin: ["/cms/admin/BeforeLogin#AfterLogin"],
      views: { dashboard: { Component: "/cms/admin/Dashboard#Dashboard" } },
    },
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const raw = (data as { slug?: string | Record<string, string> })?.slug;
        const slug = typeof raw === "object" && raw ? raw[locale?.code ?? "en"] : raw;
        // Globals (the home page) have no slug: preview the language's home page, through the authenticated preview route.
        if (!slug) return `${serverURL}/api/preview?path=${encodeURIComponent(`/${locale?.code ?? "en"}`)}`;
        const route = collectionConfig?.slug === "rooms" ? `/rooms/${slug}` : `/${slug}`;
        // Goes through the authenticated preview route, which enables Draft Mode for staff only.
        return `${serverURL}/api/preview?path=${encodeURIComponent(`/${locale?.code ?? "en"}${route}`)}`;
      },
      collections: ["pages", "custom-pages", "rooms"],
      globals: ["homepage"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  // Only REST is exposed; GraphQL is off so there is a single, tested write path.
  graphQL: { disable: true },
  collections: [Users, Media, Pages, CustomPages, Rooms],
  globals: [Navigation, Footer, Homepage],
  // bs and en are authored independently; a missing translation stays empty (never silently English).
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "bs", label: "Bosanski" },
    ],
    defaultLocale: "en",
    fallback: false,
  },
  i18n: adminI18n,
  editor: lexicalEditor(),
  // Schema changes are applied by migrations (src/migrations, `npm run cms:migrate`), never by auto-push, so a
  // deployment cannot alter the database on its own. Ids stay strings (uuid), as they were with the previous adapter.
  db: postgresAdapter({
    pool: poolSettings(process.env.DATABASE_URL),
    idType: "uuid",
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  secret,
  // Cookie-authenticated requests are only accepted from our own origin (CSRF protection).
  ...(serverURL ? { serverURL, csrf: [serverURL], cors: [serverURL] } : {}),
  // No relationships exist; keep REST/Local queries shallow.
  maxDepth: 2,
  sharp,
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    // Media goes to Vercel Blob when a token is configured; otherwise to the local MEDIA_DIR (dev/test only —
    // serverless disks are ephemeral, so production must set BLOB_READ_WRITE_TOKEN).
    // clientUploads: browsers upload straight to Blob, because Vercel Functions reject request bodies over 4.5 MB.
    // Only staff can obtain an upload token; the collection's own create access and mime-type list still apply.
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: { media: true },
      token: blobToken ?? "",
      clientUploads: { access: ({ req }) => isStaffUser(req.user) },
    }),
  ],
});
