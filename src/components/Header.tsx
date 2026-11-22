"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import type { ContactLinks } from "@/cms/hotelInfoMerge";
import { FullscreenMenu } from "./FullscreenMenu";

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

  const solid = scrolled && !open;

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
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className={`fixed inset-x-0 top-0 z-[70] text-white transition-[background-color,height,backdrop-filter] duration-700 ease-[var(--ease-out)] ${
          solid ? "bg-deep/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`relative grid grid-cols-[1fr_auto_1fr] items-stretch border-b px-[var(--gutter)] transition-[height,border-color] duration-700 ${
            solid ? "h-[56px] border-white/10 md:h-[64px]" : "h-[var(--header-h)] border-[var(--hairline-light)]"
          } ${open ? "border-transparent" : ""}`}
        >
          {/* Left: menu */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="label group -ml-2 flex min-h-[44px] items-center gap-[14px] py-3 pl-2 pr-3"
            >
              <span aria-hidden className="relative block h-[9px] w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-px bg-current transition-all duration-500 ${
                    open ? "top-1/2 w-full rotate-45" : "w-full"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${
                    open ? "bottom-auto top-1/2 w-full -rotate-45" : "w-[62%] group-hover:w-full"
                  }`}
                />
              </span>
              <span>{open ? dict.nav.close : dict.nav.menu}</span>
            </button>
          </div>

          {/* Centre: the full logo at the top of the page; once scrolled, only the "HOTEL CENTRAL" wordmark, larger */}
          <Link href={href(locale)} className="relative flex items-center justify-center" aria-label="Hotel Central Sarajevo — home">
            <Image
              src="/brand/hotel-central-white.png"
              alt=""
              width={900}
              height={809}
              priority
              sizes="64px"
              className={`h-auto w-auto max-h-[46px] transition-opacity duration-500 md:max-h-[56px] ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/brand/hotel-central-white-wordmark.png"
              alt=""
              width={793}
              height={123}
              priority
              sizes="200px"
              className={`absolute left-1/2 top-1/2 h-[20px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 md:h-[26px] ${solid ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
          </Link>

          {/* Right: rooms + book */}
          <div className="flex items-stretch justify-end">
            <Link
              href={href(locale, "/rooms")}
              className="label hidden items-center px-6 opacity-90 transition-opacity hover:opacity-100 md:flex lg:px-10"
            >
              <span className="link-line">{dict.nav.rooms}</span>
            </Link>
            {/* CH-003: the booking button is solid gold and always visible */}
            <span className="flex items-center">
              <a
                href={booking.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex min-h-[40px] items-center rounded-full bg-[#b49a6a] px-5 text-white transition-colors duration-300 hover:bg-[#9c8455] md:min-h-[44px] md:px-6"
              >
                {dict.nav.book}
              </a>
            </span>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu id="site-menu" open={open} onClose={close} locale={locale} dict={dict} contact={contact} />
    </>
  );
}
