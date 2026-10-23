/**
 * Connection settings for the PostgreSQL pool (Supabase in hosted environments, a local server in tests).
 * Pure so it can be unit-tested; the URL (which contains the password) is never logged.
 */
export type PoolSettings = {
  connectionString: string;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
  query_timeout: number;
  ssl?: { rejectUnauthorized: boolean };
};

const isLocal = (host: string) => host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "[::1]" || host.startsWith("/");

export function poolSettings(url: string | undefined): PoolSettings {
  const base = {
    // Small on purpose: every serverless instance keeps its own pool and the Supabase pooler has a client cap.
    max: 3,
    idleTimeoutMillis: 10_000,
    // Short timeouts so an unreachable database fails fast and pages fall back to static content
    // instead of hanging for the driver default.
    connectionTimeoutMillis: 4000,
    query_timeout: 15_000,
  };
  const raw = url ?? "";
  let host = "";
  try {
    host = new URL(raw).hostname;
  } catch {
    return { connectionString: raw, ...base };
  }
  if (isLocal(host)) return { connectionString: raw, ...base };
  // Hosted databases require TLS. Supabase presents a certificate from its own CA that Node does not trust by
  // default, so the connection is encrypted but the server certificate is not verified. `sslmode` is removed from
  // the string because node-postgres would otherwise let it override the explicit setting below.
  const u = new URL(raw);
  u.searchParams.delete("sslmode");
  return { connectionString: u.toString(), ...base, ssl: { rejectUnauthorized: false } };
}
