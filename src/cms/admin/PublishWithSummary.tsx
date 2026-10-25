"use client";

import { getTranslation } from "@payloadcms/translations";
import { Button, FormSubmit, toast, useConfig, useDocumentInfo, useDocumentTitle, useForm, useFormModified, useLocale, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import * as qs from "qs-esm";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PUBLISHED_NOW, announce } from "./messages";
import { changedFields, type LanguageChanges } from "./publishDiff";

/**
 * Administrators' "Publish Changes": instead of publishing at once, a confirmation lists what is about to go live, language by
 * language, and says plainly that Bosnian and English are published together. The publish request itself is Payload's own
 * (same URL, same `_status: published` override), so access rules, hooks and revalidation are unchanged, and the server still
 * refuses every publish by an editor. Payload's extra "Publish in English" menu entry is not offered: it contradicts the
 * shared publishing this website uses.
 */
const LANGUAGE_NAMES: Record<string, string> = { bs: "Bosnian (Bosanski)", en: "English" };
const LANGUAGES = ["bs", "en"] as const;

type Field = { name?: string; label?: unknown; fields?: Field[]; tabs?: Field[] };
type Summary =
  | { state: "loading" }
  | { state: "error" }
  | { state: "first" }
  | { state: "ready"; changes: LanguageChanges };

/** Field name → the label staff see (looking inside the unnamed tabs of the room and page forms). */
function labelsOf(fields: Field[] | undefined, i18n: Parameters<typeof getTranslation>[1], into: Record<string, string> = {}) {
  for (const f of fields ?? []) {
    if (f.name) into[f.name] = f.label ? getTranslation(f.label as string, i18n) : f.name;
    if (!f.name && f.fields) labelsOf(f.fields, i18n, into);
    if (f.tabs) for (const tab of f.tabs) labelsOf(tab.fields, i18n, into);
  }
  return into;
}

const list = (names: string[], labels: Record<string, string>) => names.map((n) => labels[n] ?? n).join(", ");

export function PublishWithSummary() {
  const { id, collectionSlug, globalSlug, hasPublishedDoc, hasPublishPermission, setHasPublishedDoc, setMostRecentVersionIsAutosaved, setUnpublishedVersionCount, unpublishedVersionCount, uploadStatus } =
    useDocumentInfo();
  const { config, getEntityConfig } = useConfig();
  const { i18n } = useTranslation();
  const { submit } = useForm();
  const modified = useFormModified();
  const { code: locale } = useLocale();
  const { title } = useDocumentTitle();
  const api = config.routes.api;

  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState<Summary>({ state: "loading" });
  const [busy, setBusy] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();

  const entity = useMemo(() => (collectionSlug ? getEntityConfig({ collectionSlug }) : globalSlug ? getEntityConfig({ globalSlug }) : undefined), [collectionSlug, globalSlug, getEntityConfig]);
  const labels = useMemo(() => labelsOf(entity?.fields as Field[] | undefined, i18n), [entity, i18n]);

  const canPublish = Boolean(hasPublishPermission) && (modified || unpublishedVersionCount > 0 || !hasPublishedDoc) && uploadStatus !== "uploading";

  const path = globalSlug ? `/globals/${globalSlug}` : `/${collectionSlug}${id ? `/${id}` : ""}`;

  const load = useCallback(async () => {
    if (!hasPublishedDoc || (!id && !globalSlug)) {
      setSummary({ state: "first" });
      return;
    }
    const url = (draft: boolean) => formatAdminURL({ apiRoute: api, path: `${path}${qs.stringify({ locale: "all", draft, depth: 0, "fallback-locale": "null" }, { addQueryPrefix: true })}` as `/${string}` });
    try {
      const [d, p] = await Promise.all([fetch(url(true), { credentials: "include" }), fetch(url(false), { credentials: "include" })]);
      if (!d.ok || !p.ok) throw new Error("not ok");
      const draftDoc = (await d.json()) as Record<string, unknown>;
      const publishedDoc = (await p.json()) as Record<string, unknown>;
      setSummary({ state: "ready", changes: changedFields(draftDoc, publishedDoc, LANGUAGES) });
    } catch {
      setSummary({ state: "error" });
    }
  }, [api, path, hasPublishedDoc, id, globalSlug]);

  // Compare when the confirmation opens, and once more a moment later so changes that were still being saved automatically are included.
  useEffect(() => {
    if (!open) return;
    const first = setTimeout(() => void load(), 0);
    const again = setTimeout(() => void load(), 2200);
    return () => {
      clearTimeout(first);
      clearTimeout(again);
    };
  }, [open, load]);

  // Keyboard: focus the safe choice, Escape cancels, Tab stays inside the box. Focus returns to the Publish button afterwards.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) {
        e.stopPropagation();
        setOpen(false);
      }
      if (e.key === "Tab") {
        const items = [cancelRef.current, confirmRef.current].filter((x): x is HTMLButtonElement => Boolean(x) && !x!.disabled);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      opener?.focus?.();
    };
  }, [open, busy]);

  const publish = useCallback(async () => {
    if (uploadStatus === "uploading") return;
    setBusy(true);
    const action = formatAdminURL({ apiRoute: api, path: `${path}${qs.stringify({ depth: 0, locale }, { addQueryPrefix: true })}` as `/${string}` });
    const result = await submit({ action, overrides: { _status: "published" }, disableSuccessStatus: true });
    setBusy(false);
    if (result) {
      setUnpublishedVersionCount(0);
      setMostRecentVersionIsAutosaved(false);
      setHasPublishedDoc(true);
      setOpen(false);
      toast.success(PUBLISHED_NOW);
      announce("published");
    }
  }, [api, path, locale, submit, uploadStatus, setUnpublishedVersionCount, setMostRecentVersionIsAutosaved, setHasPublishedDoc]);

  if (!hasPublishPermission) return null;

  return (
    <>
      <div className="hc-publish-trigger">
        <FormSubmit buttonId="action-save" disabled={!canPublish} onClick={() => {
            setSummary({ state: "loading" });
            setOpen(true);
          }} size="medium" type="button">
          Publish Changes
        </FormSubmit>
      </div>
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="hc-publish-overlay" data-hc-publish-summary>
              <div className="hc-publish-dialog" role="dialog" aria-modal="true" aria-labelledby={headingId}>
                <h2 id={headingId}>Publish {title ? `“${title}”` : "these changes"}?</h2>
                <p className="hc-publish-dialog__warning">
                  <strong>Bosnian and English are published together.</strong> Guests will see everything below straight away, in both languages.
                </p>
                <div className="hc-publish-dialog__summary" aria-live="polite">
                  {summary.state === "loading" ? <p>Checking what will go live…</p> : null}
                  {summary.state === "error" ? <p>We could not list the changes just now. You can still publish: everything you have saved, in both languages, goes live.</p> : null}
                  {summary.state === "first" ? <p>This has not been published before. Everything you have saved, in both languages, will go live.</p> : null}
                  {summary.state === "ready" ? (
                    <>
                      <h3>What will go live</h3>
                      <ul>
                        {LANGUAGES.map((language) => {
                          const names = summary.changes.byLanguage[language];
                          return (
                            <li key={language} data-language={language}>
                              <strong>{LANGUAGE_NAMES[language]}:</strong> {names.length ? `${names.length === 1 ? "1 change" : `${names.length} changes`} — ${list(names, labels)}` : "no changes"}
                            </li>
                          );
                        })}
                        {summary.changes.shared.length ? (
                          <li data-language="shared">
                            <strong>Both languages:</strong> {list(summary.changes.shared, labels)}
                          </li>
                        ) : null}
                      </ul>
                      {!summary.changes.shared.length && LANGUAGES.every((l) => !summary.changes.byLanguage[l].length) ? <p>There are no changes to publish since the last published version.</p> : null}
                      <p className="hc-publish-dialog__hint">Based on your latest saved changes. If a language lists changes you did not expect, cancel and look at it first (switch the language at the top of the page).</p>
                    </>
                  ) : null}
                </div>
                <div className="hc-publish-dialog__actions">
                  <Button buttonStyle="secondary" disabled={busy} id="action-publish-cancel" onClick={() => setOpen(false)} ref={cancelRef as never} size="medium" type="button">
                    Cancel
                  </Button>
                  <Button buttonStyle="primary" disabled={busy} id="action-publish-confirm" onClick={() => void publish()} ref={confirmRef as never} size="medium" type="button">
                    {busy ? "Publishing…" : "Publish in both languages"}
                  </Button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
