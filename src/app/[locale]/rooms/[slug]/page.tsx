import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DecorativeLine } from "@/components/DecorativeLine";
import { FinalBooking } from "@/components/home/FinalBooking";
import { Gallery, PageHero } from "@/components/page/PageParts";
import { Photo } from "@/components/Photo";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { Arrow, PillLink } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import { getRoom, rooms } from "@/content/rooms";
import { href, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type P = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => rooms.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return pageMetadata(locale, `/rooms/${slug}`, room.name[locale], `${room.sizeLabel[locale]}. ${room.summary[locale]}`, room.images[0].src);
}

export default async function RoomPage({ params }: P) {
  const { locale, slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();
  const dict = getDictionary(locale);
  const idx = rooms.findIndex((r) => r.slug === slug);
  const others = rooms.filter((r) => r.slug !== slug);
  const next = rooms[(idx + 1) % rooms.length];
  const bookUrl = booking.roomUrl(room.roomTypeId);
  const imgs = room.images.map((im) => ({ src: im.src, alt: im.alt[locale], position: im.position }));

  return (
    <>
      <PageHero
        image={imgs[0]}
        eyebrow={room.feature[locale]}
        title={room.titleLines[locale]}
        meta={[`(${String(idx + 1).padStart(2, "0")}/${String(rooms.length).padStart(2, "0")})`, room.sizeLabel[locale], "Hotel Central"]}
      />

      {/* Description + specifications */}
      <section className="relative overflow-hidden bg-ivory px-[var(--gutter)] py-16 text-ink md:py-[7vw]">
        <DecorativeLine variant="hotel" className="z-0 hidden md:block" />
        <div className="relative z-[1] grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-[2vw]">
          <div className="md:col-span-5">
            <p className="label mb-8">{room.name[locale]}</p>
            <p className="font-display text-[8.4vw] leading-[0.9] md:text-[4.6vw]">
              <RevealLines lines={[`${room.sizeM2} m²`, room.feature[locale]]} lineClassName={["", "pl-[3vw] md:pl-[3vw]"]} />
            </p>
            <div className="mt-10 space-y-4 md:mt-[3vw] md:pl-[3vw]">
              {room.description[locale].map((p, i) => (
                <FadeIn key={i} as="p" delay={i * 0.08} className={`body-copy max-w-[46ch] ${i ? "opacity-80" : ""}`}>
                  {p}
                </FadeIn>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:pl-[3vw]">
              <PillLink href={bookUrl} external>
                {dict.common.checkAvailability}
              </PillLink>
              <a href={booking.bookingUrl} target="_blank" rel="noopener noreferrer" className="label link-line">
                {dict.nav.book}
              </a>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="relative">
              <Photo src={(imgs[1] ?? imgs[0]).src} alt={(imgs[1] ?? imgs[0]).alt} sizes="(min-width: 768px) 46vw, 100vw" className="aspect-[4/3]" parallax={4} />
            </div>
            <div className="mt-12 md:mt-[4vw]">
              <p className="label mb-5">{dict.common.amenities}</p>
              <ul className="label grid grid-cols-1 border-t border-ink/20 sm:grid-cols-2 sm:gap-x-8">
                {room.amenities[locale].map((a) => (
                  <li key={a} className="border-b border-ink/15 py-[0.75em]">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {imgs.length > 2 && <Gallery images={imgs.slice(2).concat(imgs.slice(0, 1))} tone="deep" />}

      {/* Other rooms */}
      <section className="bg-deep px-[var(--gutter)] pb-16 pt-6 text-white md:pb-[6vw]">
        <div className="label mb-8 flex justify-between border-t border-white/15 pt-6">
          <span>{dict.common.otherRooms}</span>
          <Link href={href(locale, "/rooms")} className="link-line">
            {dict.common.allRooms}
          </Link>
        </div>
        <ul className="divide-y divide-white/15 border-b border-white/15">
          {others.map((r) => (
            <li key={r.slug}>
              <Link
                href={href(locale, `/rooms/${r.slug}`)}
                className="group flex items-baseline justify-between gap-6 py-5 transition-[padding] duration-700 ease-[var(--ease-out)] hover:pl-4"
              >
                <span className="font-display text-[8vw] leading-none opacity-80 transition-opacity group-hover:opacity-100 md:text-[3.6vw]">
                  {r.name[locale]}
                </span>
                <span className="label flex shrink-0 items-center gap-4 opacity-70">
                  <span className="hidden sm:inline">{r.sizeLabel[locale]}</span>
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-end">
          <Link href={href(locale, `/rooms/${next.slug}`)} className="label link-line flex items-center gap-3">
            {dict.common.next}: {next.name[locale]} <Arrow />
          </Link>
        </div>
      </section>

      <FinalBooking dict={dict} image={imgs[0].src} alt={imgs[0].alt} />
    </>
  );
}
