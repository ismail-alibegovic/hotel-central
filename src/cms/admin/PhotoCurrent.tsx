"use client";

import { useForm, useFormFields } from "@payloadcms/ui";
import { useEffect, useRef, useState } from "react";
import { ACCEPTED_TYPES } from "./photoRules";
import { usePhotoUpload, type Uploaded } from "./usePhotoUpload";

/**
 * The top of every photo field in the page sections: the photo guests see now (an uploaded one, else the website's own), with
 * "Replace photo" / "Add photo" and, for an uploaded photo, "Go back to the website's photo". It writes the same two stored values
 * as the fields underneath (`upload`, `staticPath`), which stay available under "More photo options". Nothing is saved or
 * published until Save Changes.
 */
type Media = { id: string | number; url?: string | null };

export function PhotoCurrent({ path }: { path?: string }) {
  const base = (path ?? "").replace(/[^.]+$/, "");
  const uploadPath = `${base}upload`;
  const staticValue = useFormFields(([fields]) => fields?.[`${base}staticPath`]?.value) as string | undefined;
  const uploadValue = useFormFields(([fields]) => fields?.[uploadPath]?.value) as string | number | Media | null | undefined;
  const { dispatchFields, setModified } = useForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fetched, setFetched] = useState<{ id: string; url: string | null } | null>(null);

  const uploadId = uploadValue && typeof uploadValue === "object" ? String(uploadValue.id) : uploadValue ? String(uploadValue) : "";
  const inlineUrl = uploadValue && typeof uploadValue === "object" ? (uploadValue.url ?? null) : null;

  useEffect(() => {
    if (!uploadId || inlineUrl) return;
    let live = true;
    fetch(`/api/media/${encodeURIComponent(uploadId)}?depth=0`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((doc: Media | null) => live && setFetched({ id: uploadId, url: doc?.url ?? null }))
      .catch(() => live && setFetched({ id: uploadId, url: null }));
    return () => {
      live = false;
    };
  }, [uploadId, inlineUrl]);

  const set = (value: string | number | null) => {
    dispatchFields({ type: "UPDATE", path: uploadPath, value, valid: true } as never);
    setModified(true);
  };
  const onUploaded = (forms: Uploaded) => {
    if (forms[0]) set(forms[0].doc.id);
  };
  const { start, problems } = usePhotoUpload({ free: 1, onUploaded });

  const uploadedUrl = uploadId ? (inlineUrl ?? (fetched?.id === uploadId ? fetched.url : null)) : null;
  const src = uploadId ? uploadedUrl : staticValue ? `/images/${encodeURIComponent(staticValue)}` : null;
  const has = Boolean(uploadId || staticValue);

  return (
    <div className="hc-photo-current" data-hc-photo-current data-hc-photo-source={uploadId ? "uploaded" : staticValue ? "website" : "none"}>
      <div className="hc-photo-current__frame">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" loading="lazy" />
        ) : (
          <span>{uploadId ? "Loading the photo…" : "No photo yet"}</span>
        )}
      </div>
      <div className="hc-photo-current__body">
        <p>
          <strong>{uploadId ? "Your uploaded photo" : staticValue ? "Photo from the website" : "No photo chosen"}</strong>
          <br />
          {uploadId
            ? "Guests see this photo after the changes are published."
            : staticValue
              ? "This is the photo the website uses now. Replace it with your own if you like."
              : "Add a photo, or open “More photo options” to choose one that is already on the website."}
        </p>
        <div className="hc-photo-current__actions">
          <button type="button" className="hc-photos__button" onClick={() => inputRef.current?.click()}>
            {has ? "Replace photo" : "Add photo"}
          </button>
          {uploadId ? (
            <button type="button" className="hc-photo-current__link" onClick={() => set(null)}>
              {staticValue ? "Go back to the website’s photo" : "Remove photo"}
            </button>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            hidden
            accept={ACCEPTED_TYPES.join(",")}
            data-hc-photo-replace-input
            onChange={(e) => {
              start(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
        <p className="hc-photo-current__hint">JPG, PNG, WebP or AVIF, up to 8 MB. Click “Save Changes” afterwards; nothing changes for guests until an administrator publishes.</p>
        {problems.length ? (
          <div className="hc-photos__problems" role="alert">
            {problems.map((p) => (
              <p key={p.name}>
                <strong>{p.name}</strong> — {p.message}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
