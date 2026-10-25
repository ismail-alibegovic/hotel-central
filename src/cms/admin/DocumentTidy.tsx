"use client";

import { getTranslation } from "@payloadcms/translations";
import { useConfig, useDocumentInfo, useDocumentTitle, usePreferences, useTranslation } from "@payloadcms/ui";
import { useEffect, useRef } from "react";
import { pageName } from "../pageNames";

/**
 * Two small things that make an editing form feel finished. Renders nothing; changes only what is shown:
 *  - The title: built-in pages show their friendly name ("Contact", not the page key "contact"), and a document without a name shows
 *    "Untitled room" instead of its internal ID.
 *  - The tab: a form always opens on its first tab. Payload re-opens the tab the person used last, a moment after the form appears,
 *    which can look like the form jumping; choosing a tab afterwards still works as usual.
 */
export function DocumentTidy() {
  const { collectionSlug, id, preferencesKey } = useDocumentInfo();
  const { title, setDocumentTitle } = useDocumentTitle();
  const { getEntityConfig } = useConfig();
  const { i18n } = useTranslation();
  const { setPreference } = usePreferences();

  const forgotTab = useRef(false);
  useEffect(() => {
    if (!preferencesKey || forgotTab.current) return;
    forgotTab.current = true;
    void setPreference(preferencesKey, {});
  }, [preferencesKey, setPreference]);

  // Payload sets the title again right after this component mounts (and whenever the document is saved), so the friendly title is
  // applied one tick later each time the title changes.
  useEffect(() => {
    if (!collectionSlug) return;
    let friendly: string | null = null;
    if (collectionSlug === "pages") {
      const name = pageName(title);
      if (name && name !== title) friendly = name;
    } else if (title && title === id) {
      const singular = getEntityConfig({ collectionSlug })?.labels?.singular;
      friendly = `Untitled ${singular ? getTranslation(singular, i18n).toLowerCase().replace(/^new /, "") : "page"}`;
    }
    if (!friendly) return;
    const later = setTimeout(() => setDocumentTitle(friendly), 0);
    return () => clearTimeout(later);
  }, [collectionSlug, id, title, setDocumentTitle, getEntityConfig, i18n]);

  return null;
}
