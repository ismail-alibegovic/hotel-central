/**
 * Checks on photos chosen for upload, before anything is sent. The server enforces the same limits (type list in the Media
 * collection, 8 MB in payload.config); checking first lets staff fix the problem at once, with plain-language advice.
 */
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
export const MAX_ROOM_PHOTOS = 12;

export type PhotoFile = { name: string; type: string; size: number };
export type PhotoCheck = { ok: PhotoFile[]; problems: { name: string; message: string }[] };

const megabytes = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/** Why a file cannot be used, or null when it can. */
export function photoProblem(file: PhotoFile): string | null {
  const isHeic = /image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
  if (isHeic) return "This is an iPhone HEIC photo, which websites cannot show. On the phone, share it as a JPG (or set the camera to “Most Compatible”), then try again.";
  if (!(ACCEPTED_TYPES as readonly string[]).includes(file.type)) return "Only JPG, PNG, WebP or AVIF photos can be used.";
  if (file.size > MAX_PHOTO_BYTES) return `This photo is ${megabytes(file.size)}. The limit is 8 MB: save a smaller copy (for example by exporting it at a lower quality) and try again.`;
  if (file.size === 0) return "This file is empty.";
  return null;
}

/** Splits the chosen files into the ones that can be uploaded (up to the number of free places) and the ones that cannot, with reasons. */
export function checkPhotos(files: PhotoFile[], freePlaces: number): PhotoCheck {
  const ok: PhotoFile[] = [];
  const problems: PhotoCheck["problems"] = [];
  for (const file of files) {
    const problem = photoProblem(file);
    if (problem) problems.push({ name: file.name, message: problem });
    else if (ok.length >= freePlaces) problems.push({ name: file.name, message: `A room can show at most ${MAX_ROOM_PHOTOS} photos, so this one was not added.` });
    else ok.push(file);
  }
  return { ok, problems };
}
