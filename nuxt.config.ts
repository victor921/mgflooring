import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { site } from './site.config'

/**
 * Scan public/gallery/<sector>/{before,after}/ at build time and pair
 * images by number: before1.jpg ↔ after1.jpg, before2.jpg ↔ after2.jpg, …
 * Drop image pairs into those folders and rebuild — no code changes needed.
 * A "before" without a matching "after" (or vice versa) is skipped.
 */
function scanGallery() {
  const exts = 'jpe?g|png|webp|avif'
  const items: { sector: string; n: number; before: string; after: string }[] = []
  for (const sector of ['residential', 'commercial']) {
    const dir = join(process.cwd(), 'public/gallery', sector)
    let befores: string[] = []
    let afters: string[] = []
    try { befores = readdirSync(join(dir, 'before')) } catch { /* folder missing — fine */ }
    try { afters = readdirSync(join(dir, 'after')) } catch { /* folder missing — fine */ }
    for (const f of befores) {
      const m = f.match(new RegExp(`^before(\\d+)\\.(${exts})$`, 'i'))
      if (!m) continue
      const n = Number(m[1])
      const after = afters.find((a) => new RegExp(`^after${n}\\.(${exts})$`, 'i').test(a))
      if (after) items.push({ sector, n, before: `/gallery/${sector}/before/${f}`, after: `/gallery/${sector}/after/${after}` })
    }
  }
  return items.sort((a, b) => a.sector.localeCompare(b.sector) || a.n - b.n)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gallery: scanGallery(),
    },
  },

  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
  ],

  // English (default, at /) + Spanish (at /es/...). Separate indexable URLs
  // with auto hreflang — good for SEO. Copy lives in i18n/locales/*.json.
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    baseUrl: site.url,
    bundle: { optimizeTranslationDirective: false },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Tailwind via Nuxt's native PostCSS (avoids @nuxtjs/tailwindcss jiti bug)
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Static generation = real HTML per page = best SEO
  ssr: true,
  nitro: {
    // Force a pure-static build (HTML only — no Worker). The site is 100%
    // prerendered, so we don't want Cloudflare's `cloudflare-pages` preset
    // (auto-picked when CF_PAGES=1) injecting a `_worker.js` with a reserved
    // `ASSETS` binding, which Cloudflare Pages rejects at deploy time.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/residential', '/commercial', '/before-after', '/testimonials', '/contact', '/privacy'],
    },
  },

  css: ['~/assets/css/main.css'],

  // Canonical URL + structured data
  site: {
    url: site.url,
    name: site.name,
    description: site.description,
  },

  // Google Analytics 4 — loads only once a real ID is set
  gtag: {
    id: site.gaId,
    enabled: site.gaId !== 'G-XXXXXXXXXX',
  },

  sitemap: {
    autoLastmod: true,
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#FFFFFF' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
