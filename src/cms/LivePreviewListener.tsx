"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/** Rendered only in Draft Mode (staff): refreshes the page when the editor saves in the admin. */
export function LivePreviewListener() {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SERVER_URL ?? ""} />;
}
