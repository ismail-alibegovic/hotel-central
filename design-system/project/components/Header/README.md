Fixed site header: Menu on the left, the tracked "Hotel Central" wordmark centred, Rooms and Book on the right (`src/components/Header.tsx`).

- Transparent over the hero with a `hairline-light` bottom rule; after 40px of scroll it becomes `deep` at 95% with a backdrop blur and shrinks from 88px to 64px (64 → 56 below 1024px).
- Text is always white; links are `label` + `LinkLine`. Book is separated by a vertical hairline.
- Includes a skip link ("Skip to content") that slides in on focus.
