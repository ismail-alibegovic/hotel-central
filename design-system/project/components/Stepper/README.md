Booking-bar controls on a dark ground: hairline select fields and a circular −/+ guest stepper (`src/components/booking/BookingBar.tsx`).

- Field: 38px tall (50px below 1024px), 45% white underline that turns full white on hover, a 7×4 triangle chevron that flips when open.
- Stepper: 32px circles (40px below 1024px), 40% white border, value in tabular figures; the minus/plus disables at its limit (25% opacity).
- Always on `deep`, `ink` or a photograph; never on ivory.
- Props (Stepper): `label`, `value`, `min`, `max`, `onChange`, `hint`.
