/**
 * Pre-deployment environment check for a hosted CMS environment. Pure and side-effect free so it can be
 * unit-tested; `scripts/cms/preflight.mts` is the CLI wrapper. It NEVER returns or prints secret values.
 */
export type Target = "staging" | "production";
export type Finding = { level: "error" | "warn" | "ok"; name: string; message: string };

type Env = Record<string, string | undefined>;

const has = (v: string | undefined) => typeof v === "string" && v.trim() !== "";

/** Rough entropy guard: rejects repeated characters and short alphabets without claiming real strength. */
function looksWeak(secret: string) {
  return new Set(secret).size < 12 || /^(.)\1+$/.test(secret) || /password|secret|changeme|123456|qwerty/i.test(secret);
}

export function preflight(env: Env, target: Target): Finding[] {
  const out: Finding[] = [];
  const add = (level: Finding["level"], name: string, message: string) => out.push({ level, name, message });

  // --- switches
  if (env.CMS_ENABLED === "true") add("ok", "CMS_ENABLED", "enabled");
  else add("error", "CMS_ENABLED", 'must be exactly "true" for a CMS environment (needed at build AND runtime)');

  if (has(env.ALLOW_FIRST_REGISTER)) add("error", "ALLOW_FIRST_REGISTER", "must be unset: it lets anyone claim the administrator account on an empty database");

  if (has(env.CMS_ALLOW_SAMPLE_PUBLISH)) add(target === "production" ? "error" : "warn", "CMS_ALLOW_SAMPLE_PUBLISH", target === "production" ? "must be unset in production: it lets DEMO / SAMPLE sections be published" : "set: DEMO / SAMPLE sections can be published here (fine for a stakeholder demo, never for production)");

  // --- database
  const db = env.DATABASE_URL ?? "";
  let dbUrl: URL | undefined;
  try {
    dbUrl = new URL(db);
  } catch {
    /* reported below */
  }
  if (!has(db)) add("error", "DATABASE_URL", "missing");
  else if (!dbUrl || !/^postgres(ql)?:$/.test(dbUrl.protocol)) add("error", "DATABASE_URL", "must be a PostgreSQL connection string starting with postgres:// or postgresql://");
  else if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(dbUrl.hostname)) add("error", "DATABASE_URL", "points at localhost; a hosted environment needs a hosted database");
  else if (!dbUrl.username || !dbUrl.password) add("error", "DATABASE_URL", "must include a database user AND password");
  else if (/^db\.[a-z0-9]+\.supabase\.co$/.test(dbUrl.hostname)) add("error", "DATABASE_URL", "Supabase direct connections are IPv6-only and unreachable from Vercel; use the pooler string (…pooler.supabase.com) from Project → Connect");
  else if (/\.pooler\.supabase\.com$/.test(dbUrl.hostname) && dbUrl.port === "6543") add("ok", "DATABASE_URL", "present, Supabase transaction pooler, with credentials");
  else if (/\.pooler\.supabase\.com$/.test(dbUrl.hostname)) add("ok", "DATABASE_URL", "present, Supabase session pooler, with credentials");
  else add("ok", "DATABASE_URL", "present, with credentials");
  if (dbUrl && has(db) && (dbUrl.pathname === "" || dbUrl.pathname === "/")) add("warn", "DATABASE_URL", "no database name in the path; the default database will be used");

  // --- secret
  const secret = env.PAYLOAD_SECRET ?? "";
  if (!has(secret)) add("error", "PAYLOAD_SECRET", "missing");
  else if (secret.length < 32) add("error", "PAYLOAD_SECRET", `too short (${secret.length}); need at least 32 characters`);
  else if (looksWeak(secret)) add("error", "PAYLOAD_SECRET", "looks guessable; generate one with `openssl rand -base64 48`");
  else add("ok", "PAYLOAD_SECRET", `${secret.length} characters`);

  // --- public origin
  const origin = env.NEXT_PUBLIC_SERVER_URL ?? "";
  if (!has(origin)) add("error", "NEXT_PUBLIC_SERVER_URL", "missing (CORS/CSRF allow-list and Live Preview need it)");
  else {
    try {
      const u = new URL(origin);
      if (u.protocol !== "https:") add("error", "NEXT_PUBLIC_SERVER_URL", "must be https");
      else if (u.pathname !== "/" || origin.endsWith("/")) add("error", "NEXT_PUBLIC_SERVER_URL", "must be a bare origin without a trailing slash or path");
      else if (/localhost|127\.0\.0\.1/.test(u.hostname)) add("error", "NEXT_PUBLIC_SERVER_URL", "localhost in a hosted environment");
      else add("ok", "NEXT_PUBLIC_SERVER_URL", u.origin);
    } catch {
      add("error", "NEXT_PUBLIC_SERVER_URL", "not a valid URL");
    }
  }

  // --- media
  const blob = env.BLOB_READ_WRITE_TOKEN ?? "";
  if (!has(blob)) add("error", "BLOB_READ_WRITE_TOKEN", "missing: serverless disks are ephemeral, uploads would be lost");
  else if (!/^vercel_blob_rw_[A-Za-z0-9]+_[A-Za-z0-9]+$/.test(blob)) add("error", "BLOB_READ_WRITE_TOKEN", "unexpected format (expected vercel_blob_rw_<store>_<random>)");
  else add("ok", "BLOB_READ_WRITE_TOKEN", "present, correct shape");
  if (has(env.MEDIA_DIR)) add("warn", "MEDIA_DIR", "ignored when Blob is configured; remove it to avoid confusion");

  // --- indexing policy
  if (target === "staging") {
    if (has(env.NEXT_PUBLIC_SITE_URL)) add("error", "NEXT_PUBLIC_SITE_URL", "must be unset on staging, otherwise the site becomes indexable under the official URL");
    else add("ok", "NEXT_PUBLIC_SITE_URL", "unset (staging stays noindex)");
  } else if (!has(env.NEXT_PUBLIC_SITE_URL)) add("warn", "NEXT_PUBLIC_SITE_URL", "unset: production will stay noindexed until launch sets it");
  else if (!/^https:\/\/(www\.)?hotelcentral\.ba\/?$/.test(env.NEXT_PUBLIC_SITE_URL!)) add("error", "NEXT_PUBLIC_SITE_URL", "production must be the official https://www.hotelcentral.ba");
  else add("ok", "NEXT_PUBLIC_SITE_URL", "official URL");

  // --- seeding credentials should not linger
  if (has(env.SEED_ADMIN_PASSWORD)) add("warn", "SEED_ADMIN_PASSWORD", "still set; remove it after the first administrator exists");

  // --- contact form (production)
  if (target === "production" && !(has(env.RESEND_API_KEY) && has(env.CONTACT_FROM))) add("warn", "RESEND_API_KEY/CONTACT_FROM", "contact form will answer 503 until configured (needs the hotel's verified domain)");
  return out;
}

export const hasErrors = (f: Finding[]) => f.some((x) => x.level === "error");
