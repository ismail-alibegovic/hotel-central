"use client";

import { FormSubmit, toast, useConfig, useDocumentInfo, useEditDepth, useForm, useFormModified, useHotkey, useLocale, useOperation, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import { useCallback, useRef } from "react";
import { SAVED_AS_DRAFT, announce } from "./messages";

/**
 * "Save Changes" (Payload's Save Draft button). Same request as Payload's own button; the only difference is the confirmation
 * the person sees: saving never publishes, so the message says that guests cannot see the change yet.
 */
export function SaveChangesButton() {
  const { config } = useConfig();
  const api = config.routes.api;
  const { id, collectionSlug, globalSlug, setUnpublishedVersionCount, uploadStatus } = useDocumentInfo();
  const modified = useFormModified();
  const { code: locale } = useLocale();
  const ref = useRef<HTMLButtonElement>(null);
  const editDepth = useEditDepth();
  const { t } = useTranslation();
  const { submit } = useForm();
  const operation = useOperation();
  const disabled = (operation === "update" && !modified) || uploadStatus === "uploading";

  const saveDraft = useCallback(async () => {
    if (disabled) return;
    const search = `?locale=${locale}&depth=0&fallback-locale=null&draft=true`;
    let action: string | undefined;
    let method: "POST" | "PATCH" = "POST";
    if (collectionSlug) {
      action = formatAdminURL({ apiRoute: api, path: `/${collectionSlug}${id ? `/${id}` : ""}${search}` });
      if (id) method = "PATCH";
    }
    if (globalSlug) action = formatAdminURL({ apiRoute: api, path: `/globals/${globalSlug}${search}` });
    const result = await submit({ action, method, overrides: { _status: "draft" }, skipValidation: true, disableSuccessStatus: true });
    if (result) {
      setUnpublishedVersionCount((count: number) => count + 1);
      toast.success(SAVED_AS_DRAFT);
      announce("draft");
    }
  }, [disabled, locale, collectionSlug, globalSlug, api, id, submit, setUnpublishedVersionCount]);

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ["s"] }, (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current?.click();
  });

  return (
    <FormSubmit buttonId="action-save-draft" buttonStyle="secondary" className="save-draft" disabled={disabled} onClick={() => void saveDraft()} ref={ref as never} size="medium" type="button">
      {t("version:saveDraft")}
    </FormSubmit>
  );
}
