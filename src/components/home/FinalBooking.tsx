import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import type { Phone } from "@/cms/hotelInfoMerge";
import { booking, hotel } from "@/content/hotel";
import { FadeIn, RevealLines } from "../Reveal";
import { Arrow } from "../ui";
import { fitStyle } from "@/lib/fit";

export function FinalBooking({
  dict,
  image = "/images/3067.jpg",
  alt = "A suite at Hotel Central with a double bed and seating area",
  phone = { display: hotel.phoneDisplay, href: hotel.phoneHref },
}: {
  dict: Dictionary;
  image?: string;
  alt?: string;
  /** The main number from Hotel Information. */
  phone?: Phone;
}) {
  const d = dict.home.final;
  return (
    <section aria-labelledby="final-title" className="relative flex min-h-[86svh] items-center justify-center overflow-hidden bg-ink text-white">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover [filter:saturate(0.4)_contrast(1.04)_brightness(0.84)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,16,0.45),rgba(2,13,16,0.3)_45%,rgba(2,13,16,0.55))]" />

      <div className="relative flex flex-col items-center px-[var(--gutter)] py-28 text-center">
        <FadeIn className="label mb-8 flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-white/50" />
          {d.label}
          <span aria-hidden className="h-px w-8 bg-white/50" />
        </FadeIn>
        <h2 id="final-title" className="font-display text-[length:var(--fs-m)] leading-[0.9] md:text-[8.2vw]" style={fitStyle(d.title, 90, 13)}>
          <RevealLines lines={d.title} />
        </h2>
        <FadeIn as="p" delay={0.2} className="body-copy mt-10 max-w-[36ch] opacity-85">
          {d.body}
        </FadeIn>
        <FadeIn delay={0.3} className="mt-9 flex flex-col items-center gap-5">
          <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-book btn-book-light !min-h-[52px] !px-9">
            <span>{d.cta}</span>
            <Arrow />
            <span className="sr-only"> — {dict.booking.opensNew}</span>
          </a>
          <a href={phone.href} className="label link-line opacity-85">
            {phone.display}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
