"use client";

import { toast, useForm, useFormFields } from "@payloadcms/ui";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { usePhotoUpload, type Uploaded } from "./usePhotoUpload";
import { ACCEPTED_TYPES, MAX_ROOM_PHOTOS } from "./photoRules";

/**
 * The Photos tab of a room: what the website shows now, one "Upload photos" action, and the consequence of adding photos
 * ("they replace the original ones"). Uploading uses Payload's own bulk-upload box (the same one behind "Add new"), so file
 * storage, access rules and the description requirement are unchanged; this only starts it with the chosen files and then puts
 * each uploaded photo into the room's list of photos. Nothing is saved or published until the person uses Save Changes.
 */
type Live = { src: string; alt: string };

export function RoomPhotosPanel({ live }: { live: Live[] }) {
  const rows = useFormFields(([fields]) => (fields?.gallery?.rows as unknown[] | undefined)?.length ?? 0);
  const { addFieldRow, getDataByPath } = useForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const free = Math.max(0, MAX_ROOM_PHOTOS - rows);

  const onUploaded = useCallback(
    (forms: Uploaded, errorCount: number) => {
      const start = (getDataByPath("gallery") as unknown[] | undefined)?.length ?? 0;
      forms.forEach((form, i) => {
        addFieldRow({ path: "gallery", rowIndex: start + i, subFieldState: { image: { value: form.doc.id, initialValue: form.doc.id, valid: true } } } as never);
      });
      if (forms.length) toast.success(`${forms.length === 1 ? "1 photo added" : `${forms.length} photos added`} to this room. Click “Save Changes” to keep them.`);
      if (errorCount) toast.error(`${errorCount === 1 ? "1 photo" : `${errorCount} photos`} could not be uploaded. Please try again.`);
    },
    [addFieldRow, getDataByPath],
  );
  const { start, problems } = usePhotoUpload({ free, onUploaded });

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    start(e.dataTransfer.files);
  };

  return (
    <section className="hc-photos" data-hc-photos>
      <h3>Change the photos of this room</h3>
      <ol className="hc-photos__steps">
        <li>
          Click <strong>Upload photos</strong> and choose one or more photos (or drag them onto the box).
        </li>
        <li>Describe each photo in a few words. This helps visitors who use a screen reader.</li>
        <li>Drag the photos in the list below to put the best one first. The first photo is the main one.</li>
        <li>
          Click <strong>Save Changes</strong>, look at <strong>Preview Changes</strong>, then an administrator clicks <strong>Publish Changes</strong>.
        </li>
      </ol>

      <div
        className={`hc-photos__drop${dragging ? " hc-photos__drop--over" : ""}`}
        role="group"
        aria-label="Upload photos"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <button type="button" className="hc-photos__button" disabled={free === 0} onClick={() => inputRef.current?.click()}>
          Upload photos
        </button>
        <span>or drag photos here. JPG, PNG, WebP or AVIF, up to 8 MB each. {free === 0 ? "This room already has the most photos it can show." : `You can add up to ${free} more.`}</span>
        <input ref={inputRef} type="file" hidden multiple accept={ACCEPTED_TYPES.join(",")} data-hc-photo-input onChange={(e) => { start(e.target.files); e.target.value = ""; }} />
      </div>

      {problems.length ? (
        <div className="hc-photos__problems" role="alert">
          <p>
            <strong>{problems.length === 1 ? "One photo was not added:" : `${problems.length} photos were not added:`}</strong>
          </p>
          <ul>
            {problems.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong> — {p.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rows === 0 ? (
        <div className="hc-photos__live" data-hc-photos-live>
          <p>
            <strong>On the website now:</strong> the {live.length} original photos of this room. Photos you add above <strong>replace all of them</strong>, so add every photo you want guests to see.
          </p>
          {live.length ? (
            <ul>
              {live.map((p) => (
                <li key={p.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="hc-photos__live" data-hc-photos-replaced>
          <strong>{rows === 1 ? "1 photo is listed below." : `${rows} photos are listed below.`}</strong> Guests see exactly these, in this order.
          {live.length > rows ? ` The original website showed ${live.length}: photos that are not in the list below are no longer shown.` : ""}
        </p>
      )}
    </section>
  );
}
