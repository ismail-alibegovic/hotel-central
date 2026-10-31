// Hotel Central — component props, copied from the source (documentation only; the previews are static).
import type { ReactNode } from "react";

export type Tone = "ivory" | "deep" | "olive" | "sage" | "ink";
export type Img = { src: string; alt: string; position?: string };

/** src/components/ui.tsx */
export interface PillLinkProps { href: string; children: ReactNode; tone?: "dark" | "light"; external?: boolean; className?: string; arrow?: boolean; ariaLabel?: string; }
/** src/components/ui.tsx */
export interface MetaRowProps { left: ReactNode; center?: ReactNode; index?: ReactNode; right?: ReactNode; rightSub?: ReactNode; className?: string; }
/** src/components/page/PageParts.tsx */
export interface FactListProps { items: { k: string; v: string }[]; tone?: "dark" | "light"; }
/** src/components/page/PageParts.tsx */
export interface PageHeroProps { image: Img; title: string[]; eyebrow: string; intro?: string; meta?: [ReactNode, ReactNode, ReactNode]; }
/** src/components/page/PageParts.tsx */
export interface StatementProps { text: string; tone?: Tone; label?: string; }
/** src/components/booking/BookingBar.tsx (internal) */
export interface StepperProps { label: string; value: number; min: number; max: number; onChange: (n: number) => void; hint?: string; }
/** src/components/DecorativeLine.tsx */
export interface DecorativeLineProps { variant: "hotel" | "rooms" | "spa" | "restaurant" | "location" | "footer"; className?: string; tone?: "dark" | "light" | "sage"; opacity?: number; }
