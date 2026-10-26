"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";

/**
 * Rendered only in Draft Mode (staff), i.e. inside the admin's preview pane.
 *
 * Payload's own `RefreshRouteOnSave` refreshes the page when the admin reports that the document was saved. That report is sent
 * from the end of an asynchronous step that Payload abandons whenever the form changes again just after an automatic save, so
 * about every other edit never reached the preview. The admin therefore also asks for a refresh itself after every successful
 * save (`hc-refresh-preview`, see `PreviewBar`), and this listener answers with `hc-preview-refreshed` once the new page has
 * really arrived, so the admin can say "updated at 14:03:22" instead of guessing. It also says `hc-preview-ready` when it starts
 * listening, because a request that arrives while the page is still loading would otherwise be lost.
 */
export function LivePreviewListener() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const wasPending = useRef(false);
  const lastRequest = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Tell the admin this page is listening now (a request sent while the page was still loading is lost).
    window.parent?.postMessage({ type: "hc-preview-ready" }, window.location.origin);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "hc-refresh-preview") return;
      lastRequest.current = event.data.id;
      startTransition(() => router.refresh());
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  useEffect(() => {
    if (wasPending.current && !pending) window.parent?.postMessage({ type: "hc-preview-refreshed", id: lastRequest.current }, window.location.origin);
    wasPending.current = pending;
  }, [pending]);

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SERVER_URL ?? ""} />;
}
