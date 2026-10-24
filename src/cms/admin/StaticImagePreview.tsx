"use client";

import { useFormFields } from "@payloadcms/ui";

/**
 * Shows the photograph chosen from the site's own photographs (the drop-down only lists file names), so staff see what they
 * picked. Reads the sibling "staticPath" value; display only.
 */
export function StaticImagePreview({ path }: { path?: string }) {
  const siblingPath = (path ?? "").replace(/[^.]+$/, "staticPath");
  const file = useFormFields(([fields]) => fields?.[siblingPath]?.value) as string | undefined;
  return (
    <div className="hc-photo-preview" data-hc-photo-preview>
      {file ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${encodeURIComponent(file)}`} alt="" loading="lazy" />
          <p>Chosen website photo ({file}). If you upload a new photo below, that one is used instead.</p>
        </>
      ) : (
        <p>No website photo chosen. Pick one from the list above, or upload a new photo below.</p>
      )}
    </div>
  );
}
