"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import type { ContactLinks } from "@/cms/hotelInfoMerge";
import { BrandLogo } from "./BrandLogo";
import { FullscreenMenu } from "./FullscreenMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Arrow } from "./ui";

/**
 * Site header (CH-001, CH-003): the official Hotel Central logo in the centre, the menu on the left with direct links to
 * the Fitness Club and the Day Spa on wide screens, and on the right the language switcher, the rooms link and the one
 * filled "Book now" button (ivory, the only filled button on the site). Transparent over the hero photograph; deep olive once the visitor scrolls.
 */
export function Header({ locale, dict, contact }: { locale: Locale; dict: Dictionary; contact: ContactLinks }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change (adjust state during render rather than in an effect)
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  const current = pathname?.replace(/^\/(en|bs)/, "") || "/";
  // Central Fitness Club and Central Day Spa read like sites of their own: the hotel shrinks to a slim bar above their
  // own navigation (rendered by their section layouts), still one click from the hotel, the menu and booking.
  const sub = current.startsWith("/centralfitnessclub") || current.startsWith("/dayspa");
  const solid = (scrolled || sub) && !open;
  const quick = [
    { path: "/centralfitnessclub", label: dict.nav.fitness },
    { path: "/dayspa", label: dict.nav.spa },
  ];

  return (
    <>
      <a
        href="#content"
        className="label fixed left-4 top-3 z-[80] -translate-y-20 bg-ivory px-4 py-2 text-ink transition-transform focus:translate-y-0"
      >
        {dict.nav.skip}
      </a>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,color,box-shadow] duration-500 ease-[var(--ease-out)] ${
          sub && !open ? "bg-ink text-white" : solid ? "bg-deep/95 text-white backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <div
          className={`relative grid grid-cols-[1fr_auto_1fr] items-center border-b px-[var(--gutter)] transition-[height,border-color] duration-500 ${
            sub ? "h-[var(--sub-bar-h)] border-white/10" : solid ? "h-[60px] border-white/10 md:h-[68px]" : "h-[var(--header-h)] border-[var(--hairline-light)]"
          } ${open ? "border-transparent" : ""}`}
        >
          {/* Left: menu + direct links to the two new sections */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="label group -ml-2 flex min-h-[44px] items-center gap-[14px] py-3 pl-2 pr-3"
            >
              <span aria-hidden className="relative block h-[9px] w-[18px]">
                <span className={`absolute left-0 top-0 h-px bg-current transition-all duration-500 ${open ? "top-1/2 w-full rotate-45" : "w-full"}`} />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${
                    open ? "bottom-auto top-1/2 w-full -rotate-45" : "w-[62%] group-hover:w-full"
                  }`}
                />
              </span>
              <span className="hidden min-[380px]:inline">{open ? dict.nav.close : dict.nav.menu}</span>
            </button>
            <nav aria-label={dict.nav.sections} className={`hidden items-center gap-7 ${sub ? "" : "xl:flex"}`}>
              {quick.map((q) => (
                <Link
                  key={q.path}
                  href={href(locale, q.path)}
                  aria-current={current.startsWith(q.path) ? "page" : undefined}
                  className="label link-line opacity-90 transition-opacity hover:opacity-100"
                >
                  {q.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre: the hotel's logo */}
          <Link href={href(locale)} className="flex items-center justify-center" aria-label={dict.nav.homeLabel}>
            <BrandLogo
              tone="light"
              priority
              alt=""
              className={`transition-[width] duration-500 ${sub ? "w-[84px] md:w-[96px]" : `w-[118px] min-[400px]:w-[134px] md:w-[168px] ${solid ? "md:w-[150px]" : ""}`}`}
            />
          </Link>

          {/* Right: language, rooms, booking */}
          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <LanguageSwitcher locale={locale} label={dict.nav.language} className="hidden lg:flex" />
            <Link href={href(locale, "/rooms")} className={`label hidden opacity-90 transition-opacity hover:opacity-100 ${sub ? "" : "md:inline-flex"}`}>
              <span className="link-line">{dict.nav.rooms}</span>
            </Link>
            <a
              href={booking.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-book btn-book-light -mr-1 ${sub ? "!min-h-[30px] !px-4 !text-[9.5px] !shadow-none" : "!min-h-[40px] !px-4 !text-[10px] md:!min-h-[44px] md:!px-6 md:!text-[11px]"}`}
            >
              <span>{sub ? dict.nav.bookRoom : dict.nav.book}</span>
              <Arrow className="hidden md:block" />
              <span className="sr-only"> — {dict.booking.opensNew}</span>
            </a>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu id="site-menu" open={open} onClose={close} locale={locale} dict={dict} contact={contact} />
    </>
  );
}
