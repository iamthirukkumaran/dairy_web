# Aura — marketing website

The official product website for **Aura**, a voice-first personal journal and memory app.

> Your life, beautifully remembered.

This is a **separate Next.js website** for the existing Flutter mobile app. Nothing from the mobile
app is migrated here; this repository only markets it.

## Stack

- Next.js 15 (App Router) · TypeScript
- Tailwind CSS for the design system
- `motion` (Framer Motion) for scroll-linked storytelling and micro-interaction
- `three` for the two places WebGL genuinely earns its weight (see **3D**)
- All artwork is hand-authored SVG or generated on a canvas — no stock photography

GSAP/ScrollTrigger was considered and skipped: `motion` already drives every
scroll-linked scene here, and adding a second animation runtime would double the
cost for no capability we are missing.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Structure

```
app/              layout, page, metadata, robots, sitemap, OG image, favicon
sections/         one file per chapter of the page
components/       Navbar, Footer, PhoneMockup, VoiceDemo, MemoryCard, BookMockup, …
components/art/   the illustrated world: LandscapeScene, Flower, Sprig, palette
components/webgl/ the 3D layer: Book3D, AuraField, shared renderer plumbing
components/screens/  app UI shown inside the phone mockups
animations/       motion primitives — Reveal, TextReveal, parallax, quality, reduced motion
data/             every piece of copy and mock content
lib/              utilities, WebGL capability detection, canvas texture painting
styles/           design tokens + global CSS
```

`app/page.tsx` composes the sections and nothing else. The scroll-heavy scenes (garden, book,
year, search, privacy, editions, gifting) are `next/dynamic` imports so they stay out of the
initial bundle while still server-rendering their copy for search engines.

## Replacing content

Everything a marketer or CMS would touch lives in `data/`:

| File | Controls |
| --- | --- |
| `data/site.ts` | brand lines, nav, footer, store links |
| `data/memories.ts` | memory cards and the six things Aura writes per entry |
| `data/year.ts` | Year in Review stats, themes and chapters |
| `data/book.ts` | the six pages the 3D book turns through |
| `data/pricing.ts` | plans, book editions, order flow |
| `data/faq.ts`, `data/privacy.ts` | FAQ answers and privacy controls |
| `data/garden.ts`, `data/ask.ts` | the garden field and Ask-My-Life demo |

### Pricing

Prices are **not** hard-coded. `data/pricing.ts` uses `amount: null`, which `formatPrice()` renders
as `₹___`. Supply real numbers — or wire `plans` / `bookEditions` to a CMS or config service — and
every price on the page updates. No layout change is needed.

### Artwork

`components/art/LandscapeScene.tsx` and `components/art/Flower.tsx` are placeholders in the sense
that they are code, not painted assets — but they are complete, on-brand and production-usable.
When commissioned illustration arrives, replace the internals of those components (or swap in
`next/image`); every section only depends on their **box**, never their contents.

The palette lives in exactly two places, kept in sync: `tailwind.config.ts` and
`styles/globals.css` (`:root` custom properties, which the SVG artwork reads).

## What is deliberately not built

- **No payment or order processing.** The book flow is presented visually; every CTA is a
  placeholder anchor. `data/pricing.ts` → `bookFlow` describes the intended journey so the
  ecommerce backend can be dropped in behind it later.
- **No security or encryption claims.** `data/privacy.ts` and `data/faq.ts` describe user-facing
  product behaviour only. Add infrastructure claims there only once they ship.
- **No fake backend.** All content is mock data in `data/`.

## 3D

Two things are real WebGL, and nothing else is:

**The book** (`components/webgl/Book3D.tsx`) — the emotional climax, so it is an
actual object: hard boards with cloth that catches the light, a page block with
thickness, sheets that bow as they turn, and a shadow cast by the geometry
rather than painted underneath it. Page contents are drawn to canvases in
`lib/bookTextures.ts` using the site's own fonts, so the printed pages match the
typography everywhere else. Scroll drives camera approach → cover → page turns →
close, on the same timeline as the CSS book, so the captions stay in sync either
way. The camera distance is *fitted* to the viewport, so a tall phone screen
never crops the spread.

**The hero light field** (`components/webgl/AuraField.tsx`) — pollen and light at
true depths, size-attenuated by perspective, drifting on the GPU. This is the
one thing CSS cannot do here: moving the pointer parallaxes the motes against
each other instead of sliding a flat layer.

Both are `next/dynamic` with `ssr: false`, so `three` never enters the main
bundle — first-load JS stays at ~191 kB. `lib/webgl.ts` picks a quality tier
from WebGL support, pointer type, cores and device memory; phones get the same
picture with fewer particles, fewer page segments and a capped pixel ratio.
`animations/useQuality.ts` returns `'off'` until after mount, so the CSS book is
what renders if anything says no — including reduced motion, no WebGL, or JS
never arriving. Frames only run while the canvas is on screen and the tab is
visible.

## Motion

Six signature moments, in priority order: hero → voice-to-diary → memory cards → growing garden →
year recap → book opening. Everything else is a fade or a lift.

`prefers-reduced-motion` is honoured twice over: globally in CSS, and in JS via
`animations/useCalmMotion.ts`, which makes components render their **final** state and collapses
the long sticky scroll stages so there is no dead scrolling.

## Verified

Driven in a real Chrome (WebGL live) across 1440 / 1280 / 1024 / 768 / 430 / 390
/ 375 / 320, scrolling the whole page at each width:

- zero horizontal overflow at every breakpoint
- clean console — no runtime errors, hydration warnings, or failed requests
- with `prefers-reduced-motion: reduce`: no WebGL, no custom cursor, CSS book
  fallback, all copy rendered at full opacity, no hydration mismatch; the page
  drops from ~31k to ~21k pixels tall
- memory card expands into a labelled `aria-modal` dialog, moves focus to the
  close button, and closes on Escape
- the voice demo's transcript genuinely reorganises (44 spoken tokens → 34 kept
  words in two paragraphs)
- FAQ toggles by keyboard, cover chooser switches the book, skip link present

## Accessibility

Semantic landmarks, a skip link, one `h1` with no skipped heading levels, keyboard-operable nav and
FAQ accordion (`aria-expanded` / `aria-controls`), focus-visible rings, alt-free decorative SVG
marked `aria-hidden`, and warm-on-ivory contrast held above 4.5:1 for body copy.
