"use client";

import { toast, useListQuery } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { staticImages } from "../staticImages";
import { ACCEPTED_TYPES } from "./photoRules";
import { usePhotoUpload, type Uploaded } from "./usePhotoUpload";

/**
 * Top of "Photos & Media": what this library is, why it may look empty, and one obvious "Add photos" action.
 * The photographs that are part of the website itself are files of the website, not library entries, so a new installation shows an
 * empty library; they are listed below (read only) so nothing is a mystery, and can be chosen in any page section.
 * Uploading uses Payload's own upload box (storage, limits and access rules unchanged); nothing here changes or deletes a photo.
 */
const AT_ONCE = 20;

export function MediaIntro() {
  const { data, query } = useListQuery();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const total = data?.totalDocs ?? 0;
  const narrowedDown = Boolean(query?.search) || (query?.where !== undefined && Object.keys(query.where as object).length > 0);

  const onUploaded = useCallback(
    (forms: Uploaded, errorCount: number) => {
      if (forms.length) toast.success(`${forms.length === 1 ? "1 photo added" : `${forms.length} photos added`} to the photo library.`);
      if (errorCount) toast.error(`${errorCount === 1 ? "1 photo" : `${errorCount} photos`} could not be uploaded. Please try again.`);
      router.refresh();
    },
    [router],
  );
  const { start, problems } = usePhotoUpload({ free: AT_ONCE, onUploaded });
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    start(e.dataTransfer.files);
  };

  const empty = total === 0 && !narrowedDown;

  return (
    <section className={`hc-library${empty ? " hc-library--empty" : ""}`} data-hc-library data-hc-library-empty={empty}>
      {empty ? (
        <>
          <h2>Your photo library is empty</h2>
          <p>
            This is where photos you upload are kept, so you can use them in rooms, pages and the homepage. <strong>Nothing has been uploaded yet.</strong>
          </p>
          <p>
            The photos you see on the website today are <strong>built into the website</strong>, so they are not listed here (they are shown below). You can still choose them in a page
            section, or upload a new photo to use instead.
          </p>
        </>
      ) : (
        <p className="hc-library__count">
          <strong>{narrowedDown ? "Matching photos" : "Photos in the library"}:</strong> {total}
        </p>
      )}

      <div
        className={`hc-photos__drop${dragging ? " hc-photos__drop--over" : ""}`}
        role="group"
        aria-label="Add photos"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <button type="button" className="hc-photos__button" onClick={() => inputRef.current?.click()}>
          Add photos
        </button>
        <span>
          or drag photos here. JPG, PNG, WebP or AVIF, up to 8 MB each. You will describe each photo in a few words: the description is read aloud to visitors who cannot see the photo, and helps Google understand it.
        </span>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          data-hc-library-input
          onChange={(e) => {
            start(e.target.files);
            e.target.value = "";
          }}
        />
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

      <details className="hc-library__builtin" data-hc-library-builtin>
        <summary>Photos built into the website ({staticImages.length}) — shown here for reference</summary>
        <p>These come with the website and cannot be changed here. To use one, open a page section and choose it under “More photo options”, or upload a new photo instead.</p>
        <ul>
          {staticImages.map((file) => (
            <li key={file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/${encodeURIComponent(file)}`} alt="" loading="lazy" width={150} height={100} />
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
