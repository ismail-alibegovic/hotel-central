import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`arrow h-[9px] w-[22px] ${className}`} viewBox="0 0 22 9" fill="none">
      <path d="M0 4.5h20.5M17 1l3.8 3.5L17 8" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

/** Small north-east arrow for external links; an SVG so phones never swap it for a coloured emoji. */
export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 10 10" fill="none" className={`ml-[0.4em] inline-block h-[0.7em] w-[0.7em] align-[0.02em] ${className}`}>
      <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`h-[9px] w-[22px] ${className}`} viewBox="0 0 22 9" fill="none">
      <path d="M22 4.5H1.5M5 1L1.2 4.5 5 8" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
  className?: string;
  arrow?: boolean;
  ariaLabel?: string;
};

/** Thin outlined pill CTA, the only button shape used across the site. */
export function PillLink({ href, children, tone = "dark", external, className = "", arrow = true, ariaLabel }: PillProps) {
  const cls = `pill ${tone === "dark" ? "pill-dark" : "pill-light"} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

/** Three-part editorial metadata row: left / centre / right, as in the reference. */
export function MetaRow({
  left,
  center,
  index,
  right,
  rightSub,
  className = "",
}: {
  left: ReactNode;
  center?: ReactNode;
  index?: ReactNode;
  right?: ReactNode;
  rightSub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`label relative grid grid-cols-2 gap-y-3 px-[var(--gutter)] md:block md:min-h-[3.2em] ${className}`}>
      <p>{left}</p>
      {center && <p className="text-right md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:text-center">{center}</p>}
      {(index || right || rightSub) && (
        <div className="col-span-2 md:absolute md:left-[78.7%] md:top-0">
          {(index || right) && (
            <p className="flex gap-[3.4em]">
              {index && <span>{index}</span>}
              {right && <span>{right}</span>}
            </p>
          )}
          {rightSub && <p className="mt-[0.4em] opacity-80">{rightSub}</p>}
        </div>
      )}
    </div>
  );
}
