import type { CollectionConfig } from "payload";
import { isAdmin, isStaff } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "filename" },
  access: { read: () => true, create: isStaff, update: isStaff, delete: isAdmin },
  upload: {
    // Raster images only: SVG is excluded on purpose (script-capable and the Next image optimiser advisory).
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    staticDir: process.env.MEDIA_DIR ?? ".media",
    focalPoint: true,
  },
  fields: [
    { name: "alt", type: "text", localized: true, required: true, admin: { description: "Describe the image for screen readers, per language." } },
    { name: "credit", type: "text", admin: { description: "Photographer / licence note (ownership and rights)." } },
  ],
};
