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
          className={`relative grid grid-cols-[1fr_auto_1fr] items-stretch border-b px-[max(var(--gutter),calc((100%-1200px)/2))] transition-[height,border-color] duration-700 ${
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

          {/* Centre: the full logo (building + "Hotel Central Club & Spa") at the top of the page; once scrolled, only the text part remains */}
          <Link href={href(locale)} className="relative flex items-center justify-center" aria-label="Hotel Central Sarajevo — home">
            <Image
              src="/brand/hotel-central-logo-white.png"
              alt=""
              width={556}
              height={551}
              priority
              sizes="88px"
              className={`h-auto w-auto max-h-[60px] transition-opacity duration-500 md:max-h-[84px] ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/brand/hotel-central-text-white.png"
              alt=""
              width={556}
              height={117}
              priority
              sizes="200px"
              className={`absolute left-1/2 top-1/2 h-[34px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 md:h-[40px] ${solid ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
          </Link>

          {/* Right: rooms + book */}
          <div className="flex items-stretch justify-end">
            <Link
              href={href(locale, "/rooms")}
              className="label hidden items-center px-6 opacity-90 transition-opacity hover:opacity-100 md:flex"
            >
              <span className="link-line">{dict.nav.rooms}</span>
            </Link>
            {/* CH-003: over the hero the booking link is plain text with no box; once the page scrolls it turns into the solid gold pill */}
            <span className="flex items-center">
              <a
                href={booking.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-[32px] items-center whitespace-nowrap rounded-full px-4 font-sans text-[9.5px] uppercase leading-none tracking-[0.14em] text-white transition-[background-color,color] duration-500 md:h-[38px] md:px-6 md:text-[10.5px] md:tracking-[0.16em] ${
                  solid ? "bg-[#b49a6a] hover:bg-[#9c8455]" : "bg-transparent hover:text-[#d9c48f]"
                }`}
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
