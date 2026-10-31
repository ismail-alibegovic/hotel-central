Thin outlined pill CTA, the only button shape on the public site (`src/components/ui.tsx`).

- **Use for** the one primary action of a block: Book now, Send, View room. Max one per block; secondary actions are `LinkLine`s.
- **Tone**: `dark` on ivory and sage grounds (hover fills `ink`, text turns `ivory`); `light` on deep, olive, ink and photographs (hover fills `white`, text turns `ink`).
- **Anatomy**: 1px `currentColor` border, `radius-pill`, `pill` text style (10px, 0.18em, uppercase), 46px tall below 1024px and 40px from 1024px, then the 22×9 hairline arrow. The arrow slides 5px right on hover.
- **The consumer provides** `href`, the label, `tone`, `external` (opens a new tab with `rel="noopener noreferrer"`), and `arrow={false}` to drop the arrow.
- Never fill the pill at rest, add an icon in front, or use a second colour. Disabled state: 50% opacity (contact form "Sending…").
