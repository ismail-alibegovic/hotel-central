"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { booking, hotel } from "@/content/hotel";
import { href, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Arrow } from "./ui";

const previews: Record<string, string> = {
  "/": "/images/3075.jpg",
  "/about": "/images/3064.jpg",
  "/rooms": "/images/p05.jpg",
  "/spa": "/images/3069.jpg",
  "/restaurant": "/images/dorucak5.jpg",
  "/meetings-events": "/images/3073.jpg",
  "/location": "/images/3064.jpg",
  "/contact": "/images/3075.jpg",
};

const ease = [0.76, 0, 0.24, 1] as const;

export function FullscreenMenu({
  id,
  open,
  onClose,
  locale,
  dict,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string>("/");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = document.querySelectorAll<HTMLElement>(
          `header button[aria-controls="${id}"], #${id} a[href], #${id} button`,
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 450);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [open, onClose, id]);

  const current = pathname?.replace(/^\/(en|bs)/, "") || "/";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.menu}
          className="fixed inset-0 z-[60] overflow-y-auto bg-deep text-white"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="grid min-h-full grid-cols-1 px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+28px)] lg:grid-cols-[1.25fr_1fr] lg:gap-[5vw] lg:pb-12">
            <nav aria-label={dict.nav.menu} className="flex flex-col justify-center">
              <ol className="space-y-[0.6vh]">
                {dict.nav.items.map((item, i) => {
                  const active = current === item.href;
                  return (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "105%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "105%" }}
                        transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.05 }}
                      >
                        <Link
                          href={href(locale, item.href)}
                          onClick={onClose}
                          onMouseEnter={() => setHovered(item.href)}
                          onFocus={() => setHovered(item.href)}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-baseline gap-5 py-[0.4vh] md:gap-8"
                        >
                          <span className="label-sm w-7 shrink-0 opacity-50">{String(i + 1).padStart(2, "0")}</span>
                          <span
                            className={`font-display text-[clamp(34px,6.4vh,76px)] transition-[opacity,transform] duration-700 ease-[var(--ease-out)] group-hover:translate-x-3 ${
                              active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                            }`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <motion.aside
              className="mt-14 flex flex-col justify-between gap-10 lg:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <div className="relative hidden aspect-[4/5] max-h-[56vh] w-full overflow-hidden lg:block">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hovered}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={previews[hovered] ?? previews["/"]} alt="" fill sizes="40vw" className="grade object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/15 pt-6">
                <div className="label space-y-1">
                  <p className="opacity-50">{dict.footer.address}</p>
                  <p>{hotel.street}</p>
                  <p>
                    {hotel.postalCode} {hotel.city}
                  </p>
                </div>
                <div className="label space-y-1">
                  <p className="opacity-50">{dict.footer.contact}</p>
                  <p>
                    <a href={hotel.phoneHref} className="link-line">
                      {hotel.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${hotel.email}`} className="link-line normal-case tracking-[0.06em]">
                      {hotel.email}
                    </a>
                  </p>
                </div>
                <LanguageSwitcher locale={locale} label={dict.nav.language} />
                <a
                  href={booking.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-light justify-self-start"
                >
                  <span>{dict.nav.book}</span>
                  <Arrow />
                </a>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
