"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The footer takes the colour of the part of the site it closes: the hotel's deep olive, the Central Fitness Club green,
 * or the Central Day Spa burgundy. Same content and layout everywhere, so the three stay one family.
 */
export function FooterFrame({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  const theme = /^\/(en|bs)\/centralfitnessclub(\/|$)/.test(path) ? "fitness" : /^\/(en|bs)\/dayspa(\/|$)/.test(path) ? "spa" : "hotel";
  const ground = { hotel: "bg-deep", fitness: "bg-fit-green", spa: "bg-spa-wine" }[theme];
  return (
    <footer data-theme={theme} className={`relative overflow-hidden text-white ${ground}`}>
      {children}
    </footer>
  );
}
