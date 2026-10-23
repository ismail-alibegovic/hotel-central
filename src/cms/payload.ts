import "server-only";
import { getPayload } from "payload";

/** Single entry point to the Payload Local API (config is imported lazily so a disabled CMS costs nothing). */
export async function getPayloadClient() {
  const { default: config } = await import("@payload-config");
  return getPayload({ config });
}
