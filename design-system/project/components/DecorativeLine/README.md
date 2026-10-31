Hairline organic loop traced from the reference artboard, drawn behind a section and animated in on scroll (`src/components/DecorativeLine.tsx`).

- Six fixed paths (hotel, rooms, spa, restaurant, location, footer), authored in a 1025×640 viewBox and stretched to the section with a non-scaling 1px stroke. The SVGs are in the Lines asset group.
- Tones: `dark` rgba(2,13,16,.32) on ivory; `light` rgba(255,255,255,.42) on deep/olive; `sage` rgba(161,170,130,.7).
- Draws over 3.2s with `ease-inout`; reduced motion draws it instantly. Always `aria-hidden`, never interactive, hidden below 1024px in editorial splits.
