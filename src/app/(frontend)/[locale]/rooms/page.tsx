import type { Metadata } from "next";
import Link from "next/link";
import { FinalBooking } from "@/components/home/FinalBooking";
import { PageHero } from "@/components/page/PageParts";
import { Photo } from "@/components/Photo";
import { FadeIn, RevealLines } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getDictionary } from "@/content/dictionary";
import { booking } from "@/content/hotel";
import { getPages } from "@/content/pages";
import { LivePreviewListener } from "@/cms/LivePreviewListener";
import { getRooms } from "@/cms/rooms";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { fitStyle } from "@/lib/fit";

type P = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const m = getPages(locale).rooms.meta;
  return pageMetadata(locale, "/rooms", m.title, m.description, "/images/p05.jpg");
}

export default async function Rooms({ params }: P) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const r = getPages(locale).rooms;
  const { rooms, draft } = await getRooms(locale);
  return (
    <>
      {draft && <LivePreviewListener />}
      <PageHero
        image={{ src: "/images/3067.jpg", alt: "A suite at Hotel Central" }}
        eyebrow={r.hero.eyebrow}
        title={r.hero.title}
        intro={r.hero.intro}
        meta={["Hotel Central", `(${String(rooms.length).padStart(2, "0")})`, dict.home.rooms.metaCenter]}
      />

      <section className="bg-deep text-white">
        {rooms.map((room, i) => {
          const flip = i % 2 === 1;
          const roomHref = href(locale, `/rooms/${room.slug}`);
          return (
            <article
              key={room.slug}
              className="relative grid grid-cols-1 gap-8 border-t border-white/15 px-[var(--gutter)] py-14 md:grid-cols-12 md:gap-x-[2vw] md:py-[6vw]"
            >
              <div className={`md:col-span-6 ${flip ? "md:col-start-7" : ""}`}>
                <Link href={roomHref} aria-label={room.name[locale]} className="group block">
                  <Photo
                    src={room.images[0].src}
                    alt={room.images[0].alt[locale]}
                    position={room.images[0].position}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-[4/3] transition-transform duration-[1.4s] ease-[var(--ease-out)]"
                    imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    parallax={3}
                  />
                </Link>
              </div>
              <div className={`flex flex-col justify-between md:col-span-5 ${flip ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}>
                <div className="label flex justify-between">
                  <span className="tabular-nums">({String(i + 1).padStart(2, "0")})</span>
                  <span>{room.sizeLabel[locale]}</span>
                </div>
                <div className="my-10 md:my-0">
                  <p className="text-[7vw] font-light uppercase leading-none tracking-[-0.01em] md:text-[2.6vw]">{room.feature[locale]}</p>
                  <h2
                    style={fitStyle(room.titleLines[locale], 84, 13)}
                    className={`font-display relative z-[2] mt-3 text-[length:var(--fs-m)] leading-[0.9] md:text-[5.4vw] ${flip ? "" : "md:-ml-[9vw]"}`}
                  >
                    <Link href={roomHref} className="hover:opacity-80 transition-opacity">
                      <RevealLines lines={room.titleLines[locale]} lineClassName={["", "pl-[6vw] md:pl-[3vw]"]} />
                    </Link>
                  </h2>
                  <FadeIn as="p" className="body-copy mt-8 max-w-[42ch] opacity-85">
                    {room.summary[locale]}
                  </FadeIn>
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a href={booking.roomUrl(room.roomTypeId)} target="_blank" rel="noopener noreferrer" className="pill pill-light">
                    <span>{dict.common.checkAvailability}</span>
                  </a>
                  <Link href={roomHref} className="label link-line flex items-center gap-3">
                    {dict.common.viewRoom} <Arrow />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <FinalBooking dict={dict} />
    </>
  );
}
