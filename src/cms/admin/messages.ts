/** Confirmations staff see after saving or publishing. One place, so the wording stays consistent and testable. */
export const SAVED_AS_DRAFT = "Saved as draft — not visible to guests yet.";
export const PUBLISHED_NOW = "Published — guests can see this now, in Bosnian and English.";

/** Fired on `window` by the Save and Publish buttons so the banner at the top of the form can keep the confirmation on screen. */
export const SAVED_EVENT = "hc:saved";
export type SavedKind = "draft" | "published";
export const announce = (kind: SavedKind) => window.dispatchEvent(new CustomEvent<SavedKind>(SAVED_EVENT, { detail: kind }));
