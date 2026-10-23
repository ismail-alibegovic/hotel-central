import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { isStaffUser } from "@/cms/access";
import { cmsEnabled } from "@/cms/enabled";
import { getPayloadClient } from "@/cms/payload";

/**
 * Enables Draft Mode and redirects to a localized page. Only authenticated staff (valid Payload session
 * cookie) may enable it, and only for internal /en|/bs paths (no open redirect).
 */
export async function GET(req: NextRequest) {
  if (!cmsEnabled()) return new Response("Not found", { status: 404 });
  const path = req.nextUrl.searchParams.get("path") ?? "";
  if (!/^\/(en|bs)(\/[a-z0-9-]+){0,2}$/.test(path)) return new Response("Invalid path", { status: 400 });

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: req.headers });
  if (!isStaffUser(user)) return new Response("Unauthorized", { status: 401 });

  (await draftMode()).enable();
  redirect(path);
}
