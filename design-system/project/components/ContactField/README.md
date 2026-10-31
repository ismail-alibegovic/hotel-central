Underline text field with a floating `label` (the contact form, `src/components/ContactForm.tsx`).

- No box, no radius: a `field-rule` underline that turns `ink` on focus; the label floats up and scales to 90% once focused or filled.
- Errors: a `label-sm` line in `error` below the field, linked by `aria-describedby`, with `aria-invalid` on the input; the first invalid field takes focus on submit.
- Fields sit in a two-column grid (32px column gap, 24px row gap); the message spans both.
- The consumer provides `id`, `name`, label text, and `placeholder=" "` (required for the floating-label CSS).
