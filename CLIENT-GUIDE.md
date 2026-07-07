# MG Flooring — How to update the site

Everything you'll ever need to change lives in **two places**:

| What | Where |
|---|---|
| Phone, email, hours, address, captions… | `site.config.ts` (one file, plain text) |
| Before/after photos | `public/gallery/` (drag & drop images) |

After any change, publish with one command from this folder:

```
npm run deploy
```

---

## 1. Business details — `site.config.ts`

Open `site.config.ts` in any text editor. Every field is labeled:

- `phone` / `phoneHref` — the number shown on the site + the digits-only dial link
- `email`
- `hours` — e.g. `'Mon–Fri 8am–6pm · Sat by appointment'`
- `address`, `serviceArea`, `geo` — powers the map info Google sees (local SEO)
- `formspreeId` — connects the contact form (free at formspree.io)
- `social` — paste full URLs; leave `''` to hide a network
- `url` — the live domain (update when the custom domain is connected)
- `gaId` — Google Analytics ID

Save the file, run `npm run deploy`, done.

## 2. Before/after gallery — `public/gallery/`

The folder structure is:

```
public/gallery/
├── residential/
│   ├── before/   before1.jpg  before2.jpg  before3.jpg …
│   └── after/    after1.jpg   after2.jpg   after3.jpg  …
└── commercial/
    ├── before/   before1.jpg  before2.jpg …
    └── after/    after1.jpg   after2.jpg  …
```

**The rule:** `before1` pairs with `after1`, `before2` with `after2`, and so on.
The website finds the pairs automatically — no code changes ever.

To add a project:
1. Drop the "before" photo into the sector's `before/` folder, named `before5.jpg` (next free number).
2. Drop the "after" photo into `after/`, named `after5.jpg`.
3. (Optional) Add a caption for pair 5 in `site.config.ts` under `gallery.captions` — otherwise the site shows a generic label like "Residential 05".
4. Run `npm run deploy`.

Notes:
- Accepted formats: `.jpg` `.jpeg` `.png` `.webp` `.avif`
- A `before` without a matching `after` (or vice versa) is simply skipped — nothing breaks.
- Landscape photos around 1600px wide look best. Keep files under ~500 KB so the page stays fast.
- The homepage features residential pair #1, the Residential page features pair #2, and the Commercial page features commercial pair #1 — put your best work in those slots.

## 3. Publishing

```
npm run deploy
```

Rebuilds the site and pushes it live to https://mgfloorllc-4314d.web.app (about a minute).
If it complains about credentials, run `firebase login --reauth` first.
