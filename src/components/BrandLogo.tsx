import Image from "next/image";

/**
 * The official Hotel Central logo (building drawing, "HOTEL CENTRAL", "Sarajevo"), cut out of the logo artwork supplied by
 * the hotel (1080 px Instagram file, November 2026; the circle there is only the avatar frame, not part of the logo). Each
 * file exists in near-black ink (light backgrounds) and white (photographs, dark sections). A vector original is still needed.
 */
const files = {
  wordmark: { dark: "/brand/hotel-central-wordmark.png", light: "/brand/hotel-central-wordmark-white.png", w: 742, h: 199 },
  full: { dark: "/brand/hotel-central-logo.png", light: "/brand/hotel-central-logo-white.png", w: 667, h: 700 },
} as const;

export function BrandLogo({
  variant = "wordmark",
  tone = "dark",
  className = "",
  priority = false,
  alt = "Hotel Central Sarajevo",
}: {
  variant?: keyof typeof files;
  /** "dark" = ink for light backgrounds, "light" = white ink for photographs and dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const f = files[variant];
  return <Image src={tone === "dark" ? f.dark : f.light} alt={alt} width={f.w} height={f.h} priority={priority} unoptimized className={`h-auto ${className}`} />;
}
