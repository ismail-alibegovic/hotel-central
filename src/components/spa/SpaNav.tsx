import Image from "next/image";
import Link from "next/link";
import type { DaySpaContent } from "@/content/dayspa";
import { href, type Locale } from "@/lib/i18n";

/** The spa's own navigation under the slim hotel bar: its logo, the page's sections and the (existing) online booking. */
export function SpaNav({ locale, nav, bookingUrl }: { locale: Locale; nav: DaySpaContent["nav"]; bookingUrl: string }) {
  return (
    <div className="sticky top-[var(--sub-bar-h)] z-[60] border-b border-spa-wine/10 bg-spa-paper/95 text-spa-wine backdrop-blur-md">
      <div className="flex h-[var(--sub-nav-h)] items-center justify-between gap-4 px-[var(--gutter)]">
        <Link href={href(locale, "/dayspa")} aria-label={nav.label} className="shrink-0">
          <Image src="/brand/central-day-spa-wordmark.png" alt="" width={640} height={122} priority className="h-[22px] w-auto md:h-[26px]" />
        </Link>
        <nav aria-label={nav.label} className="flex items-center gap-1 text-[10.5px] uppercase tracking-[0.2em] md:gap-3">
          <a href="#treatments" className="hidden px-3 py-2 opacity-80 transition-opacity hover:opacity-100 md:inline">
            {nav.treatments}
          </a>
          <a href="#prices" className="hidden px-3 py-2 opacity-80 transition-opacity hover:opacity-100 sm:inline">
            {nav.prices}
          </a>
          <a href="#spa" className="hidden px-3 py-2 opacity-80 transition-opacity hover:opacity-100 md:inline">
            {nav.spa}
          </a>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="ml-1 whitespace-nowrap rounded-full bg-spa-wine px-4 py-[10px] text-white transition-colors hover:bg-spa-plum md:px-5">
            {nav.book}
          </a>
        </nav>
      </div>
    </div>
  );
}
