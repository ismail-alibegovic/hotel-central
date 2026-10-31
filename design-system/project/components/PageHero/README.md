Cinematic photographic hero shared by every secondary page (`PageHero` in `src/components/page/PageParts.tsx`).

- A full-bleed photograph with the heavy hero grade (`saturate .28, contrast 1.1, brightness .6, sepia .3, hue-rotate 28deg`) and a top/bottom `ink` gradient, so white text always passes contrast.
- Eyebrow (`label` between two 32px hairlines), stacked `display-hero` title, optional `body-copy` intro at 85% opacity, optional three-part meta strip under a 20% white rule.
- Height 78svh (82svh from 1024px), minimum 520/560px.
- Props: `image {src, alt, position}`, `title: string[]` (one entry per line), `eyebrow`, `intro`, `meta`.
