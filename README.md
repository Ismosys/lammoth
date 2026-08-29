# Lammoth

Official website for Lammoth. Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Structure

```
app/
  page.tsx                 Home
  music/page.tsx           Discography
  music/[slug]/page.tsx    Individual release pages
  archives/page.tsx        Chronological timeline
  about/page.tsx           About
  contact/page.tsx         Contact
  api/contact/route.ts     Contact form handler
  api/subscribe/route.ts   Mailing list handler
  sitemap.ts, robots.ts    SEO routes
components/                UI, split by page where specific
content/                   All editable content
lib/                       Types, theme helpers, form security
sanity/schemas/            CMS schemas, ready to drop into a Studio
public/art/                Release artwork
```

## Content

Nothing that changes over time is written into a component. Everything lives in `content/`:

- `content/releases.ts` carries the discography: titles, artists, dates, artwork, tracklists with durations, credits, editorial copy, and each release's colour identity.
- `content/site.ts` carries navigation, official links, about copy, collaborators, the featured story chapters, and contact categories.

Adding a release means adding one object to the `releases` array. The music page, archives timeline, related release lists, sitemap and static routes all pick it up automatically. Moving the `featured: true` flag moves the Listen Now button and every hero reference to the new release.

### Per release colour identity

Each release carries a `theme` sampled from its own cover artwork. `themeVars()` in `lib/theme.ts` turns that into CSS custom properties, so release pages and the archives timeline recolour themselves without any component knowing which release it is rendering. The archives page transitions the ground colour between eras as the visitor scrolls.

## Moving to a CMS

`sanity/schemas/` holds document schemas matching the types in `lib/types.ts` exactly. To switch over:

1. Create a Sanity Studio and copy `sanity/schemas/` into it.
2. In `sanity/schemas/*.ts`, replace `import type { Rule } from "../types"` with `import type { Rule } from "sanity"`, then delete `sanity/types.ts`.
3. Replace the exports in `content/releases.ts` and `content/site.ts` with GROQ queries that return the same shapes.

No component needs to change, because every one of them reads through the types rather than the files.

## Environment

Both forms validate, rate limit, and screen for bots on the server. Neither is wired to a delivery provider yet, so no address is exposed in the client bundle and nothing is sent anywhere until you choose a provider.

```
CONTACT_TO=            # destination address for the contact form
NEWSLETTER_API_KEY=    # mailing list provider key
```

Add the provider call inside `app/api/contact/route.ts` and `app/api/subscribe/route.ts` where each route notes it.

The rate limiter in `lib/security.ts` is in process. That is fine for a single instance. Move it to a shared store (Vercel KV, Upstash) before running several.

## Content notes

Release data, tracklists, durations, genres and credits come from the official Bandcamp listings. All descriptive copy on the site is original writing. No quoted source text is reproduced.

Only platforms with a verified official presence are linked: Bandcamp, Instagram, Bluesky and Ampwall. There is no confirmed Spotify or Apple Music profile, so neither is listed. Add them to `socials` in `content/site.ts` if that changes.

Before deploying, set the production domain in `content/site.ts` (`site.url`). It drives canonical URLs, Open Graph tags, the sitemap and structured data.

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus states, labelled form fields with inline errors, `aria-live` status messages, and full keyboard access including the mobile menu. Motion honours `prefers-reduced-motion`, which disables the smooth scrolling, parallax and reveal animations. All text and interface colour pairs meet WCAG AA.
