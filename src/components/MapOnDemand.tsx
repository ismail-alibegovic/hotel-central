"use client";

import { useState } from "react";

/**
 * A Google map that loads only when the visitor asks for it. The embed is heavy (a whole page of script in its own
 * process, re-tinted by a CSS filter), and on the homepage it slowed every scroll frame even for visitors who never
 * looked at it. Until then the frame shows a quiet hairline reticle with the address and one dark pill.
 */
export function MapOnDemand({ title, src, address, label }: { title: string; src: string; address: string; label: string }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <iframe
        title={title}
        src={src}
        referrerPolicy="no-referrer-when-downgrade"
        className="map-tint absolute inset-0 h-full w-full border-0"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-ivory px-6 text-center text-ink">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeOpacity="0.16" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeOpacity="0.16" />
        <circle cx="50%" cy="50%" r="64" stroke="currentColor" strokeOpacity="0.28" />
        <circle cx="50%" cy="50%" r="3" fill="currentColor" />
      </svg>
      <p className="label relative mt-[180px] bg-ivory px-3">{address}</p>
      <button type="button" onClick={() => setOpen(true)} className="pill pill-dark relative bg-ivory">
        {label}
      </button>
    </div>
  );
}
