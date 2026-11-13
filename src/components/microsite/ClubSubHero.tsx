import { Photo } from "../Photo";

/** Compact hero for the Fitness Club's sub-pages: club green, the club's display face, one photograph. */
export function ClubSubHero({ eyebrow, title, intro, image, alt }: { eyebrow: string; title: string[]; intro: string; image: string; alt: string }) {
  return (
    <section className="bg-cfc text-white">
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col justify-end px-[var(--gutter)] pb-12 pt-16 md:pb-[5vw] md:pt-[7vw]">
          <p className="label opacity-75">{eyebrow}</p>
          <h1 className="font-club mt-5 text-[16vw] md:text-[7.4vw]">
            {title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="body-copy mt-6 max-w-[40ch] text-[16px] opacity-90">{intro}</p>
        </div>
        <Photo src={image} alt={alt} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] md:aspect-auto md:min-h-[460px]" grade="none" />
      </div>
    </section>
  );
}
