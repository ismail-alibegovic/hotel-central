import { APIError, type CollectionBeforeChangeHook, type CollectionBeforeDeleteHook, type PayloadRequest } from "payload";
import { sql } from "@payloadcms/db-postgres";

/**
 * The website must always keep at least one administrator: without one nobody can publish, manage team members or
 * give the administrator role back, and the only way out would be a developer editing the database.
 *
 * These hooks run on the server for every write path (admin screens, REST, the Local API used by scripts, bulk
 * updates and deletes, and with or without access control), so the rule does not depend on what the admin UI shows.
 * There is no way to deactivate an account yet, so every administrator account counts as an active administrator.
 */
export const LAST_ADMIN_MESSAGE =
  "This is the only administrator account, so it cannot be removed or changed to Editor. Make another team member an administrator first.";

const refuse = () => new APIError(LAST_ADMIN_MESSAGE, 409, null, true);

/**
 * Serialises "is this the last administrator?" checks between requests: two administrators demoting each other at the
 * same moment must not both succeed. The lock is held until the surrounding transaction ends, so the second check runs
 * after the first change is committed and sees it.
 */
async function lockAdminCheck(req: PayloadRequest) {
  const db = req.payload.db as unknown as { sessions?: Record<string, { db?: { execute: (q: unknown) => Promise<unknown> } }> };
  const id = req.transactionID ? await req.transactionID : undefined;
  const session = id !== undefined ? db.sessions?.[String(id)]?.db : undefined;
  // Outside a transaction a lock would be released at once; Payload runs every REST and Local API write in one.
  if (session) await session.execute(sql`SELECT pg_advisory_xact_lock(hashtext('hotel-central:last-admin'))`);
}

/**
 * Within ONE request (a bulk update or delete), Payload runs the hooks of all documents at the same time and in the same
 * transaction, so each check would still see the others as administrators. The administrators already allowed to go in this
 * request are therefore remembered, and the decision (after reading the current administrators) is taken synchronously, so
 * two checks of the same request cannot interleave between "is someone left?" and "this one goes".
 */
const leaving = new WeakMap<PayloadRequest, Set<string>>();

async function mayRemoveAdmin(req: PayloadRequest, id: string | number): Promise<boolean> {
  await lockAdminCheck(req);
  const { docs } = await req.payload.find({ collection: "users", where: { role: { equals: "admin" } }, pagination: false, depth: 0, select: { role: true }, overrideAccess: true, req });
  // No await below this line.
  const gone = leaving.get(req) ?? new Set<string>();
  leaving.set(req, gone);
  const remaining = docs.map((d) => String(d.id)).filter((x) => x !== String(id) && !gone.has(x));
  if (!remaining.length) return false;
  gone.add(String(id));
  return true;
}

/** Refuses changing the role of the last administrator to anything else. */
export const keepLastAdminOnUpdate: CollectionBeforeChangeHook = async ({ data, originalDoc, operation, req }) => {
  if (operation !== "update" || !originalDoc) return data;
  const before = (originalDoc as { role?: string }).role;
  const after = (data as { role?: string }).role;
  if (before === "admin" && after !== undefined && after !== "admin" && !(await mayRemoveAdmin(req, originalDoc.id))) throw refuse();
  return data;
};

/** Refuses deleting the last administrator (also when several accounts are deleted at once). */
export const keepLastAdminOnDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const doc = (await req.payload.findByID({ collection: "users", id, depth: 0, overrideAccess: true, req, disableErrors: true })) as { role?: string } | null;
  if (doc?.role === "admin" && !(await mayRemoveAdmin(req, id))) throw refuse();
};
