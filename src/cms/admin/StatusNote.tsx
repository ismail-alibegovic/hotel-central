"use client";

import { useAuth, useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { useEffect, useState } from "react";
import { DocumentTidy } from "./DocumentTidy";
import { PUBLISHED_NOW, SAVED_AS_DRAFT, SAVED_EVENT, type SavedKind } from "./messages";

/**
 * Plain-language banner at the top of every editing form: is this a draft or published, who can publish, and the one
 * limitation staff must know (a document has ONE draft/published state shared by Bosnian and English).
 * Display only; nothing here is saved and the server still enforces who may publish.
 */
export function StatusNote() {
  const { user } = useAuth();
  const { id, hasPublishedDoc, globalSlug } = useDocumentInfo();
  const status = useFormFields(([fields]) => fields?._status?.value) as string | undefined;
  const isAdmin = (user as { role?: string } | null)?.role === "admin";
  const isNew = !id && !globalSlug;
  // The toast disappears after a few seconds; this keeps the answer to "can guests see it?" on screen until the next save.
  const [saved, setSaved] = useState<SavedKind | null>(null);
  useEffect(() => {
    const on = (e: Event) => setSaved((e as CustomEvent<SavedKind>).detail);
    window.addEventListener(SAVED_EVENT, on);
    return () => window.removeEventListener(SAVED_EVENT, on);
  }, []);

  let tone: "new" | "draft" | "live";
  let headline: string;
  let detail: string;
  if (isNew) {
    tone = "new";
    headline = "New";
    detail = "Not saved yet. Click “Save Changes” to keep it. Visitors cannot see it.";
  } else if (status === "draft") {
    tone = "draft";
    headline = "Draft";
    detail = hasPublishedDoc
      ? "The website still shows the earlier published version. Only you can see these changes, using “Preview Changes”."
      : "This is not published yet. Visitors cannot see it.";
  } else {
    tone = "live";
    headline = "Published";
    detail = "Visitors can see this. When you change something, save your changes and preview them before publishing.";
  }

  return (
    <>
      <DocumentTidy />
      <aside className={`hc-status hc-status--${tone}`} role="status" data-hc-status={tone}>
        <p className="hc-status__head">
          <span className="hc-status__badge">{headline}</span>
          <span>{detail}</span>
        </p>
        {saved ? (
          <p className={`hc-status__saved hc-status__saved--${saved}`} data-hc-saved={saved} role="status">
            {saved === "draft" ? `${SAVED_AS_DRAFT}${hasPublishedDoc ? " The website still shows the published version." : ""}` : PUBLISHED_NOW}
          </p>
        ) : null}
        <p className="hc-status__steps">
          Steps: <strong>1.</strong> Edit <strong>2.</strong> Save Changes <strong>3.</strong> Preview Changes <strong>4.</strong>{" "}
          {isAdmin ? "Publish Changes" : "An administrator publishes"}
        </p>
        {!isAdmin ? <p className="hc-status__steps">You are an editor: you can save changes, and an administrator publishes them.</p> : null}
        <p className="hc-status__limit">
          You edit the Bosnian and English text separately (switch the language at the top), but there is only one draft and one published
          version for both: <strong>publishing publishes the changes in both languages at once.</strong> Your changes are also kept as a draft
          automatically while you type; guests only see them after an administrator publishes.
        </p>
      </aside>
    </>
  );
}
