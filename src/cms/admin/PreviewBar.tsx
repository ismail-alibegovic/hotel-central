"use client";

import { useDocumentInfo, useConfig, useLivePreviewContext } from "@payloadcms/ui";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The line above the form while the preview is open: when does an edit show up on the right, and has it? The preview shows the
 * saved draft. The form saves a draft by itself about 1.5 seconds after typing stops, and every successful save of this document
 * (automatic or "Save Changes") asks the preview to reload and reports when it has; a request that gets no answer is repeated and finally
 * turned into a full reload. "Refresh preview" reloads it from scratch.
 * Display and refresh only; nothing here saves or publishes.
 */
type State = { kind: "idle" } | { kind: "updating" } | { kind: "updated"; at: string } | { kind: "stale" };
const clock = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function PreviewBar() {
  const { isLivePreviewing, iframeRef } = useLivePreviewContext();
  const { collectionSlug, globalSlug, id } = useDocumentInfo();
  const { config } = useConfig();
  const api = config.routes.api;
  const [state, setState] = useState<State>({ kind: "idle" });
  const waiting = useRef(false);
  const latest = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const iframe = useCallback(() => (iframeRef?.current as HTMLIFrameElement | null) ?? (document.getElementById("live-preview-iframe") as HTMLIFrameElement | null), [iframeRef]);
  const stopTimers = useCallback(() => {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
  }, []);
  const stale = useCallback(() => setState((s) => (s.kind === "updating" ? { kind: "stale" } : s)), []);
  const done = useCallback(() => {
    stopTimers();
    waiting.current = false;
    setState({ kind: "updated", at: clock() });
  }, [stopTimers]);
  const send = useCallback((id: number) => iframe()?.contentWindow?.postMessage({ type: "hc-refresh-preview", id }, window.location.origin), [iframe]);

  /**
   * Reloads the preview page from scratch; always works, but flashes. The reloaded page says "ready" once it listens, and the
   * request that is waiting is then sent to it (a page that is still loading would lose it).
   */
  const reload = useCallback(
    (continuing = false) => {
      const frame = iframe();
      if (!frame?.contentWindow) return;
      if (!continuing) {
        stopTimers();
        latest.current += 1;
        timers.current = [setTimeout(stale, 16000)];
      }
      waiting.current = true;
      setState({ kind: "updating" });
      frame.contentWindow.location.reload();
    },
    [iframe, stopTimers, stale],
  );

  /** Asks the preview to fetch the saved draft. Asks again if unanswered, reloads the page if still unanswered, then says so. */
  const askForRefresh = useCallback(() => {
    stopTimers();
    latest.current += 1;
    const id = latest.current;
    waiting.current = true;
    setState({ kind: "updating" });
    send(id);
    timers.current = [setTimeout(() => send(id), 2000), setTimeout(() => send(id), 4000), setTimeout(() => reload(true), 7000), setTimeout(stale, 16000)];
  }, [send, reload, stopTimers, stale]);

  // The preview page says when the newest request has been answered, and when it has started listening.
  useEffect(() => {
    if (!isLivePreviewing) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "hc-preview-refreshed" && event.data.id === latest.current) done();
      if (event.data?.type === "hc-preview-ready" && waiting.current) send(latest.current);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isLivePreviewing, done, send]);

  // Every successful save of THIS document (the automatic draft save, "Save Changes", publish) asks the preview to reload.
  useEffect(() => {
    if (!isLivePreviewing || (!id && !globalSlug)) return;
    const prefix = globalSlug ? `${api}/globals/${globalSlug}` : `${api}/${collectionSlug}/${id}`;
    const original = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await original(...args);
      try {
        const input = args[0];
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const method = (args[1]?.method ?? (typeof input === "object" && "method" in input ? input.method : "GET")).toUpperCase();
        if (response.ok && method !== "GET" && url.includes(prefix)) setTimeout(askForRefresh, 150);
      } catch {
        // never let the preview helper interfere with a save
      }
      return response;
    };
    return () => {
      window.fetch = original;
    };
  }, [isLivePreviewing, id, globalSlug, collectionSlug, api, askForRefresh]);

  useEffect(() => stopTimers, [stopTimers]);

  if (!isLivePreviewing) return null;

  return (
    <div className="hc-previewbar" data-hc-preview-bar data-hc-preview-state={state.kind} role="status">
      <p>
        <strong>Preview of your saved draft.</strong> It reloads about 2 seconds after you stop typing.{" "}
        {state.kind === "idle" ? "Nothing has changed yet." : null}
        {state.kind === "updating" ? "Updating…" : null}
        {state.kind === "updated" ? <>Updated at {state.at}.</> : null}
        {state.kind === "stale" ? "No answer from the preview. Click “Refresh preview”." : null}
      </p>
      <button type="button" className="hc-previewbar__button" onClick={() => reload()}>
        Refresh preview
      </button>
    </div>
  );
};
