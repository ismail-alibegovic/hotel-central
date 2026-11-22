/** Organic shapes of the club's design (after the FIJI reference): leaves, cream cut-outs, the wave clip and pebbles. */

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden className={className}>
      <path d="M12 288C40 160 140 42 290 12 252 140 162 252 12 288Z" />
      <path d="M12 288C110 190 190 110 290 12" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  );
}

/** Defines the wave used by `.cfc-wave` photographs; render once per page. */
export function WaveDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="cfc-wave" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H1 V0.88 C0.86,0.81 0.77,0.96 0.61,0.93 C0.45,0.9 0.36,0.81 0.2,0.87 C0.1,0.91 0.04,0.94 0,0.91 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Cream cut-outs that soften the hero photograph's corners. */
export function HeroCutouts() {
  return (
    <>
      <svg viewBox="0 0 600 420" preserveAspectRatio="none" aria-hidden className="absolute right-0 top-0 z-[1] h-[38%] w-[46%] fill-[var(--cfc-cream)] max-md:h-[22%] max-md:w-[64%]">
        <path d="M110,0 C185,72 322,40 418,92 C516,146 520,262 600,334 V0 Z" />
      </svg>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden className="absolute -bottom-px left-0 z-[1] h-[70px] w-full fill-[var(--cfc-cream)] md:h-[110px]">
        <path d="M0,120 V58 C120,18 230,110 370,96 C520,80 560,120 600,120 Z M760,120 C860,88 980,26 1080,58 C1140,76 1180,40 1200,18 V120 Z" />
      </svg>
    </>
  );
}

export function Pebble({ href, label, tone = "green", children = "→" }: { href: string; label: string; tone?: "green" | "cream"; children?: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} className={`cfc-pebble ${tone === "cream" ? "cfc-pebble--cream" : ""}`}>
      <span aria-hidden>{children}</span>
    </a>
  );
}
