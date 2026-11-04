import type { Dictionary } from "@/content/dictionary";
import { href, type Locale } from "@/lib/i18n";
import { DecorativeLine } from "../DecorativeLine";
import { Photo } from "../Photo";
import { FadeIn, RevealLines } from "../Reveal";
import { MetaRow, PillLink } from "../ui";
import { img, type HomeImages } from "./homeImages";
import { fitStyle } from "@/lib/fit";

/** Break a long second line into two for narrow screens. */
function splitForMobile([a, b]: string[]) {
  const words = b.split(" ");
  if (words.length < 2 || b.length <= 11) return [a, b];
  const cut = Math.ceil(words.length / 2);
  return [a, words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
}

const MAIN = "[--x:61%] [--y:15%] [--w:29.5%] [--h:47%]";
const COFFEE = "[--x:9%] [--y:38%] [--w:19%] [--h:44%]";

function Title({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`font-display absolute left-[9%] top-[16.5%] text-[6.4cqw] leading-[0.9] ${className}`}>
      <RevealLines lines={splitForMobile(lines)} lineClassName={["", "pl-[7cqw]", "pl-[14cqw]"]} />
    </div>
  );
}

export function RestaurantShowcase({ locale, dict, images }: { locale: Locale; dict: Dictionary; images?: HomeImages }) {
  const d = dict.home.restaurant;
  const main = img(images?.restaurantMain, { src: "/images/hc-comfort-2.jpg", alt: "Breakfast tray with tea, croissants and a single rose", position: "50% 50%" });
  const mainM = img(images?.restaurantMain, { src: "/images/hc-comfort-2.jpg", alt: "Breakfast tray with tea and croissants" });
  const coffee = img(images?.restaurantCoffee, { src: "/images/dorucak6.jpg", alt: "Bosnian coffee served in a copper džezva", position: "40% 50%" });
  const coffeeM = img(images?.restaurantCoffee, { src: "/images/dorucak6.jpg", alt: "Bosnian coffee served in a copper džezva" });
  const buffet = img(images?.restaurantBuffet, { src: "/images/dorucak4.jpg", alt: "The breakfast buffet at Restaurant Central" });
  return (
    <section aria-labelledby="restaurant-title" className="relative overflow-hidden bg-ivory text-ink">
      <h2 id="restaurant-title" className="sr-only">
        {d.title.join(" ")}
      </h2>

      <div className="comp hidden aspect-[1025/660] md:block">
        <DecorativeLine variant="restaurant" className="z-0" />
        <div className="absolute inset-x-0 top-[4.7%] z-[4]">
          <MetaRow left={d.metaLeft} center={d.metaCenter} right={d.metaRight} />
        </div>

        {/* Ink title on paper, beneath the photographs; it never crosses the bright tray photo */}
        <Title lines={d.title} className="z-[1]" />

        <div className={`rect z-[2] ${MAIN}`}>
          <Photo
            src={main.src}
            alt={main.alt}
            sizes="31vw"
            position={main.position}
            className="h-full w-full"
            parallax={4}
          />
        </div>
        <div className={`rect z-[2] ${COFFEE}`}>
          <Photo
            src={coffee.src}
            alt={coffee.alt}
            sizes="20vw"
            position={coffee.position}
            className="h-full w-full"
            parallax={6}
          />
        </div>
        <div className="rect z-[2] [--x:73%] [--y:70%] [--w:16%] [--h:19%]">
          <Photo src={buffet.src} alt={buffet.alt} position={buffet.position} sizes="17vw" className="h-full w-full" reveal="left" />
        </div>

        {/* Overprint in white where the last line crosses the dark coffee photograph */}
        <div aria-hidden className={`clip-rect pointer-events-none absolute inset-0 z-[3] text-white ${COFFEE}`}>
          <Title lines={d.title} />
        </div>

        <div className="absolute left-[33.5%] top-[50%] z-[4] w-[17.5%] space-y-[1.1em] text-[1.02cqw] leading-[1.5]">
          <FadeIn as="p">{d.body}</FadeIn>
          <FadeIn as="p" delay={0.1} className="opacity-75">
            {d.body2}
          </FadeIn>
          <FadeIn delay={0.2} className="pt-[0.6em]">
            <PillLink href={href(locale, "/restaurant")} className="!h-[2.9cqw] !text-[0.8cqw]">
              {d.cta}
            </PillLink>
          </FadeIn>
        </div>
      </div>

      {/* Mobile */}
      <div className="pb-16 pt-[30px] md:hidden">
        <MetaRow left={d.metaLeft} center={d.metaCenter} />
        <div className="font-display mt-10 px-[var(--gutter)] text-[length:var(--fs-m)] leading-[0.9]" style={fitStyle(splitForMobile(d.title), 74, 13)}>
          <RevealLines lines={splitForMobile(d.title)} lineClassName={["", "pl-[8vw]", "pl-[16vw]"]} />
        </div>
        <div className="mt-8 grid grid-cols-[1fr_1.35fr] items-start gap-3 px-[var(--gutter)]">
          <Photo src={coffeeM.src} alt={coffeeM.alt} position={coffeeM.position} sizes="40vw" className="mt-16 aspect-[3/4]" />
          <Photo src={mainM.src} alt={mainM.alt} position={mainM.position} sizes="56vw" className="aspect-[4/5]" />
        </div>
        <div className="mt-10 space-y-5 px-[var(--gutter)]">
          <p className="body-copy max-w-[36ch]">{d.body}</p>
          <p className="body-copy max-w-[36ch] opacity-75">{d.body2}</p>
          <PillLink href={href(locale, "/restaurant")}>{d.cta}</PillLink>
        </div>
      </div>
    </section>
  );
}
