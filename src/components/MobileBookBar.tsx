"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { ContactLinks } from "@/cms/hotelInfoMerge";
import { booking } from "@/content/hotel";
import { Arrow } from "./ui";

/** Thumb-reach booking strip for phones, shown once the visitor scrolls past the hero. */
export function MobileBookBar({ dict, contact }: { dict: Dictionary; contact: ContactLinks }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 520;
      setShow(window.scrollY > window.innerHeight * 0.85 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/10 bg-deep/95 px-[var(--gutter)] pb-[max(12px,env(safe-area-inset-bottom))] pt-3 text-white backdrop-blur-md md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <a href={contact.phone.href} className="pill pill-light !h-[46px] !px-5" aria-label={`${dict.common.call} ${contact.phone.display}`}>
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M3.5 1.5h2.6l1.2 3.2-1.7 1.1a8.6 8.6 0 0 0 4.6 4.6l1.1-1.7 3.2 1.2v2.6c0 .6-.5 1-1.1 1C7 13.2 2.8 9 2.5 2.6c0-.6.4-1.1 1-1.1Z" />
              </svg>
            </a>
            <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="pill flex-1 !h-[46px] border-white bg-white text-deep">
              <span>{dict.nav.book}</span>
              <Arrow />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
