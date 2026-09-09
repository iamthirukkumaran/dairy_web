# Aura — marketing website

The official product website for **Aura**, a voice-first personal journal and memory app.

> Your life, beautifully remembered.

This is a **separate Next.js website** for the existing Flutter mobile app. Nothing from the mobile
app is migrated here; this repository only markets it.

## Stack

- Next.js 15 (App Router) · TypeScript
- Tailwind CSS for a small set of design tokens
- No animation library, no WebGL, no scroll effects — the page is static markup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Structure

```
app/                 layout, page, metadata, robots, sitemap, OG image, favicon
sections/            one file per section of the page
components/          Navbar, Footer, StoreBadges, PhoneMockup, StructuredData
components/ui/       Container, Section, SectionHeading, Button
components/screens/  the app screen shown inside the phone frame
data/                every piece of copy and mock content
lib/                 the `cn` class helper
styles/              Tailwind entry + design tokens
```

## Design

Warm paper ground (`ivory`/`paper`/`cream`), one ink scale, one accent (`clay`), hairline borders,
18px card radius. Headings are Fraunces, body is Inter. Everything is a server component except the
navbar, which owns the mobile menu toggle.

Deliberate constraints:

- **No animation.** No entrance reveals, no parallax, no looping decoration. Only plain hover
  colour changes on links and buttons, and the native `<details>` FAQ.
- **No images.** Logos and icons are inline SVG; the book cover and phone frame are CSS.

## Page order

Hero (with App Store / Google Play badges) → How it works → What Aura remembers → Sample entries →
Your year as a book → Privacy → Pricing → FAQ → Get the app → Footer.

## Before launch

- `data/site.ts` → `links.ios` and `links.android` are placeholders (`#ios`, `#android`). Point them
  at the real store listings; both store badges and every "Get the app" button read from there.
- `data/pricing.ts` → `PRICE_PLACEHOLDER` renders as `₹___` until real prices are set.
- `data/privacy.ts` and `data/faq.ts` describe product behaviour only. Do not add security or
  infrastructure claims the app does not actually make.
