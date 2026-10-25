"use client";

import { useBulkUpload, useModal } from "@payloadcms/ui";
import { useCallback, useState } from "react";
import { checkPhotos, type PhotoCheck, type PhotoFile } from "./photoRules";

export type Uploaded = Array<{ doc: { id: string | number } }>;

/**
 * "Add photos": checks the chosen files first (advice in plain words for the ones that cannot be used), then starts Payload's own
 * bulk-upload box with the rest, so storage, the file-type list, the 8 MB limit, access rules and the required photo description
 * are exactly those of "Add new". `onUploaded` runs when the box is saved. `free` is how many more photos fit.
 */
export function usePhotoUpload({ free, onUploaded }: { free: number; onUploaded: (forms: Uploaded, errorCount: number) => void }) {
  const { setCollectionSlug, setInitialFiles, setMaxFiles, setOnSuccess, drawerSlug } = useBulkUpload();
  const { openModal } = useModal();
  const [problems, setProblems] = useState<PhotoCheck["problems"]>([]);

  const start = useCallback(
    (list: FileList | File[] | null) => {
      const files = Array.from(list ?? []);
      if (!files.length) return;
      const { ok, problems: bad } = checkPhotos(files as PhotoFile[], free);
      setProblems(bad);
      if (!ok.length) return;
      const transfer = new DataTransfer();
      for (const file of ok as File[]) transfer.items.add(file);
      setCollectionSlug("media");
      setMaxFiles(free);
      setInitialFiles(transfer.files);
      setOnSuccess(((forms: Uploaded, errorCount: number) => {
        setProblems([]);
        onUploaded(forms, errorCount);
      }) as never);
      openModal(drawerSlug);
    },
    [free, setCollectionSlug, setMaxFiles, setInitialFiles, setOnSuccess, onUploaded, openModal, drawerSlug],
  );

  return { start, problems };
}
