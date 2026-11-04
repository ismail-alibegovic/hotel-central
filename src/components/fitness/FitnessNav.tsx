"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FitnessContent } from "@/content/fitness";
import { href, type Locale } from "@/lib/i18n";

/** The club's own navigation, directly under the slim hotel bar: logo, the three club pages and the enquiry button. */
export function FitnessNav({ locale, nav }: { locale: Locale; nav: FitnessContent["nav"] }) {
  const pathname = usePathname() ?? "";
  const here = pathname.replace(/^\/(en|bs)/, "");
  const items = [
    { path: "/centralfitnessclub", label: nav.home },
    { path: "/centralfitnessclub/membership", label: nav.membership },
    { path: "/centralfitnessclub/timetable", label: nav.timetable },
  ];
  return (
    <div className="sticky top-[var(--sub-bar-h)] z-[60] border-b border-white/10 bg-fit-green text-white">
      <div className="flex h-[var(--sub-nav-h)] items-center justify-between gap-4 px-[var(--gutter)]">
        <Link href={href(locale, "/centralfitnessclub")} aria-label={nav.label} className="shrink-0">
          <Image src="/brand/central-fitness-club-wordmark-white.png" alt="" width={542} height={179} priority className="h-[30px] w-auto md:h-[34px]" />
        </Link>
        <nav aria-label={nav.label} className="no-scrollbar -mr-[var(--gutter)] flex items-center gap-1 overflow-x-auto pr-[var(--gutter)] font-geo text-[10.5px] font-semibold uppercase tracking-[0.14em] md:mr-0 md:gap-2 md:pr-0 md:text-[11px]">
          {items.map((i) => {
            const active = here === i.path;
            return (
              <Link
                key={i.path}
                href={href(locale, i.path)}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 transition-colors md:px-4 ${active ? "bg-white text-fit-green" : "text-white/85 hover:bg-white/10 hover:text-white"}`}
              >
                {i.label}
              </Link>
            );
          })}
          <a href="#contact" className="ml-1 hidden whitespace-nowrap rounded-full border border-white/70 px-4 py-2 transition-colors hover:bg-white hover:text-fit-green sm:inline-block">
            {nav.enquire}
          </a>
        </nav>
      </div>
    </div>
  );
}
