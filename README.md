# MG Flooring & Stone

A modern, minimal, **SEO-first** marketing site for a flooring & natural-stone
business. Built with **Nuxt 3** and statically generated (real HTML per page) so
it ranks well and loads fast.

**Design:** Architectural Minimal — monochrome (paper / near-black / stone-grey),
a single typeface (Inter), sharp corners, hairline rules, and a strict grid. No
decorative CSS (no shadows, gradients, blur, or animation). Real **marble &
granite** imagery is generated procedurally (SVG turbulence) so the site is
self-contained.

---

## ⚡ Quick start

```bash
npm install
npm run dev        # local dev at http://localhost:3000
npm run generate   # build static site → .output/public
npm run preview    # preview the production build
```

## 📝 Before you launch — fill in your details

**Everything you need to edit lives in one file: [`site.config.ts`](./site.config.ts).**
Search it for `// TODO` and replace each value:

| What | Why it matters |
| --- | --- |
| `name`, `tagline`, `description` | Brand + the meta description Google shows |
| `phone`, `email` | Shown in header/footer/contact, and click-to-call |
| `address`, `serviceArea`, `geo` | **Local SEO** — powers the LocalBusiness schema |
| `url` | Your production domain (canonical URLs + sitemap) |
| `gaId` | Google Analytics 4 ID (`G-XXXXXXXX`) — analytics only loads once set |
| `formspreeId` | Contact-form endpoint (see below) |

## 📨 Contact form (Formspree)

The form posts to [Formspree](https://formspree.io) (free tier works):

1. Create a form at formspree.io → copy its ID (the `xxxxxxxx` in
   `https://formspree.io/f/xxxxxxxx`).
2. Paste it into `formspreeId` in `site.config.ts`.

Submissions then arrive in your email. A honeypot field blocks basic spam bots.
Prefer Netlify Forms or your own API later? Swap the `submit()` function in
[`pages/contact.vue`](./pages/contact.vue).

## 🌍 Languages — English & Spanish

The site is bilingual: **English at `/`** and **Spanish at `/es/...`**. A clear
**EN / ES** switcher sits in the header (it keeps you on the same page when you
switch). Search engines see separate, indexable URLs per language plus automatic
`hreflang` tags.

**All copy lives in two files — edit these to change any text:**

- [`i18n/locales/en.json`](./i18n/locales/en.json) — English
- [`i18n/locales/es.json`](./i18n/locales/es.json) — Spanish

The two files share the same keys, so you can edit them side by side. Notes:
- `{area}`, `{name}`, `{phone}`, `{n}`, `{avg}` are auto-filled values — leave them in.
- To write a literal `@` (e.g. in an email), escape it as `{'@'}`.
- **Add another language** later: drop a new `xx.json` in `i18n/locales/` and add
  one line to the `i18n.locales` array in `nuxt.config.ts`. The switcher updates
  automatically.

> Uses `@nuxtjs/i18n` **v9** on purpose — v10 pulls a native `oxc-transform`
> binary that fails to install on some machines/CI.

## 🖼️ Replace the placeholder images

Demo stone imagery lives in `public/stone/` — procedurally generated marble &
granite (regenerate with `node scripts/gen-stone.mjs`). Drop in real photos with
the **same filenames** (`<material>-raw.*` = before, `<material>-polished.*` =
after, plus `hero.*`) and update captions in
[`data/projects.ts`](./data/projects.ts). JPG/WebP recommended for photos.
Edit reviews in [`data/testimonials.ts`](./data/testimonials.ts).

## 🔍 SEO features built in

- **Static HTML** for every page (Nuxt prerender) — fully crawlable.
- Per-page `<title>`, meta description, Open Graph + Twitter cards.
- **JSON-LD structured data**: `LocalBusiness` site-wide, plus
  `AggregateRating` + `Review` on the testimonials page (rich-result eligible).
- Auto-generated **`sitemap.xml`** and canonical URLs (`@nuxtjs/sitemap`).
- **Google Analytics 4** via `nuxt-gtag` (privacy-friendly, loads on consent of
  your choosing).
- Semantic headings, fast fonts (`display=swap`), responsive + accessible.

> After deploying, submit your `sitemap.xml` in
> [Google Search Console](https://search.google.com/search-console) to speed up
> indexing.

## 🚀 Deploy — Cloudflare Pages

`npm run generate` outputs a static `.output/public/` folder. This site is set up
to deploy to **Cloudflare Pages** via Wrangler (config in
[`wrangler.toml`](./wrangler.toml)).

**One-off / CLI deploy (build locally, upload):**

```bash
npx wrangler login     # first time only — opens the browser to authorize
npm run deploy         # = nuxt generate && wrangler pages deploy
```

The first deploy prompts to create the Pages project (accept the default name
`mgflooring`). It prints a `*.pages.dev` URL when done. To preview the production
build locally on Cloudflare's runtime: `npm run cf:preview`.

**Git-connected deploy (Cloudflare builds on every push) — recommended for prod:**
In the Cloudflare dashboard → *Workers & Pages* → *Create* → *Pages* → connect this
repo, then set:

| Setting | Value |
| --- | --- |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| Node version | `22` (env var `NODE_VERSION=22`) |

Add your custom domain under the project's *Custom domains* tab, then update `url`
in [`site.config.ts`](./site.config.ts) to match (canonical URLs + sitemap).

> Prefer another host? `.output/public` is plain static files — upload it to
> Netlify, Vercel, S3, nginx, etc.

## 🗂️ Project structure

```
site.config.ts      ← ALL business details (edit this)
pages/              ← home, before-after, testimonials, contact
components/         ← header, footer, before/after slider, cards, CTA
data/               ← projects + testimonials content
composables/        ← site config + JSON-LD helpers
i18n/locales/       ← en.json + es.json (ALL site copy)
assets/css/         ← Tailwind + design tokens
public/stone/       ← marble/granite imagery (replace with real photos)
scripts/gen-stone.mjs ← procedural stone-texture generator
```

## Notes / gotchas

- Tailwind is wired through Nuxt's **native PostCSS** (not `@nuxtjs/tailwindcss`),
  which avoids a jiti/`import.meta` build crash in current Nuxt versions. Tweak
  the theme in [`tailwind.config.ts`](./tailwind.config.ts).
