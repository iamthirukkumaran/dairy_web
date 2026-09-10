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
components/          Navbar, Footer, StoreBadges, Mark, StructuredData
components/ui/       Container, Button, NavLink
data/                every piece of copy and mock content
data/legal/          the policies, as structured blocks, plus entity.ts
lib/                 the `cn` class helper and the `asset` path helper
public/images/       the photographs, with sources in CREDITS.md
styles/              Tailwind entry + design tokens
```

## Design

Warm paper ground (`ivory`/`paper`/`cream`), one ink scale, one accent (`clay`), hairline borders,
18px card radius. Everything is a server component except the navbar, which owns the mobile menu
toggle.

**One typeface: Inter, loaded with its optical-size axis** so large text gets the tighter apertures
and spacing of a display cut. There is no second family and no italic. Headlines are separated from
body text by weight, tracking and leading alone — `.display` (500, `-0.035em`) and `.heading` (550,
`-0.02em`). `clay` appears on buttons, links, icons and step numbers, never inside a headline.

This is deliberate and worth keeping. A large serif headline whose second line is set in a coloured
italic is the signature of a generated landing page; it was on this site and it read as one. Where a
heading writes its own line breaks it carries `.display-broken`, which turns off `text-wrap: balance`
so the breaks survive.

Deliberate constraints:

- **No animation.** No entrance reveals, no parallax, no looping decoration. Only plain hover
  colour changes on links and buttons, and the native `<details>` FAQ.
- **Photographs, self-hosted.** The warm desk, landscape and photo-book images live in
  `public/images/` and load from there — nothing is hotlinked. Every source is listed in
  `public/images/CREDITS.md`; all of them are Unsplash License. Logos and icons stay inline SVG.
  Reference them through `asset()` in `lib/utils.ts`, not a bare `/images/…` string, or they break
  under the Pages `basePath`.

## Policies

Five documents live at `/legal`, written India-primary — the DPDP Act 2023, the IT Act 2000 with
the SPDI Rules 2011, the IT (Intermediary Guidelines) Rules 2021, and the Consumer Protection
(E-Commerce) Rules 2020 — with GDPR/UK GDPR and CCPA/CPRA sections, since the app ships on stores
that reach the EU, the UK and California.

```
/legal                     index, plus the Grievance Officer block
/legal/privacy-policy      what is collected, why, who receives it, rights
/legal/terms               account, content licence, AI limits, liability
/legal/refunds             subscription and book cancellation, defects
/legal/shipping            production and delivery timelines, duties, loss
/legal/cookies             what the site and the app store on a device
```

They are written as `Block` data (`data/legal/types.ts`), not markup, so wording can be reviewed
and edited without touching a component. Every company-specific fact lives in
`data/legal/entity.ts` as a `[[PLACEHOLDER]]`.

While any placeholder remains, that document is treated as unfinished, automatically:

- the placeholder is highlighted in the rendered text rather than printed raw;
- the page shows a "Draft — not yet in force" banner;
- the page is served `noindex`;
- it is left out of `sitemap.xml`;
- the footer omits the seller identity line instead of printing a broken one.

All five behaviours switch off on their own once `entity.ts` is filled in. Nothing needs
remembering.

**These documents have not been reviewed by a lawyer.** They are a thorough first draft with the
statutory scaffolding in place; they are not legal advice, and they must be reviewed by counsel
qualified in your jurisdiction before you rely on them.

## Page order

Hero → Remember how it felt → How it works → Aura Connections → What Aura remembers →
Your year as a book → Pricing → Privacy → FAQ → Get the app → Footer.

## Before launch

- `data/site.ts` → `links.ios` and `links.android` are placeholders (`#ios`, `#android`). Point them
  at the real store listings; both store badges and every "Get the app" button read from there.
- `data/pricing.ts` → `PRICE_PLACEHOLDER` renders as `₹___` until real prices are set.
- `data/privacy.ts` and `data/faq.ts` describe product behaviour only. Do not add security or
  infrastructure claims the app does not actually make.
- `data/legal/entity.ts` → every value is a placeholder. Fill in the legal entity, registered
  address, GSTIN, jurisdiction, support and privacy emails, the Grievance Officer's name, email,
  phone and postal address, the EU/UK Article 27 representative, and the effective date.
- The policies also carry placeholders for facts only the shipped system can answer: your cloud
  host, AI provider and their regions, whether content is used for model training, the payment
  processor, print and logistics partners, retention windows, security measures, and production and
  delivery times. Grep for `[[` across `data/legal/` to find every one.
- Answer those from the implementation, not from what sounds reassuring. A privacy policy that
  overstates what the system does is a misrepresentation, and the whole point of the draft banner is
  that shipping an unfinished one is visible rather than silent.
- Have counsel review the result, then set `effectiveDate` and `lastUpdated`.
