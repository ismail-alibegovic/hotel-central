import type { CollectionConfig } from "payload";
import { isAdmin, isStaff } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Photos & Media" },
  admin: {
    group: "Website Content",
    hideAPIURL: true,
    description: "The photo library. Add a new photo (JPG, PNG, WebP or AVIF, up to 8 MB) and write a short description. You then choose photos from here in rooms and pages.",
    useAsTitle: "filename",
  },
  access: { read: () => true, create: isStaff, update: isStaff, delete: isAdmin },
  upload: {
    // Raster images only: SVG is excluded on purpose (script-capable and the Next image optimiser advisory).
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    staticDir: process.env.MEDIA_DIR ?? ".media",
    focalPoint: true,
  },
  fields: [
    { name: "alt", type: "text", localized: true, required: true, label: "Photo description", admin: { description: "One short sentence saying what is in the photo (for visually impaired visitors). Write it separately for Bosnian and English." } },
    { name: "credit", type: "text", label: "Photographer / source", admin: { description: "The photographer's name or a note about usage rights (optional)." } },
  ],
};
