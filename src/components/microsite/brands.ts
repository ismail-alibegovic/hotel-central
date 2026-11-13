import type { MicroBrand } from "./MicroHeader";

export const clubBrand: MicroBrand = {
  name: "Central Fitness Club",
  home: "/centralfitnessclub",
  logo: { src: "/brand/central-fitness-club-white.svg", alt: "Central Fitness Club", width: 628, height: 740 },
  bar: "bg-cfc text-white",
  cta: "border-white bg-white text-cfc hover:bg-transparent hover:text-white",
};

export const spaBrand: MicroBrand = {
  name: "Central Day Spa",
  home: "/dayspa",
  logo: { src: "/brand/day-spa.png", alt: "Day Spa — Hotel Central Sarajevo", width: 652, height: 468 },
  bar: "bg-wine text-white",
  cta: "border-sand bg-sand text-wine hover:bg-transparent hover:text-sand",
};
