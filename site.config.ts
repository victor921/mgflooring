/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Edit the values below and the whole site updates.
 *  Anything marked  // TODO  is a placeholder you should replace.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'MG Flooring',
  shortName: 'MG Flooring',
  tagline: 'Floors & stonework, done beautifully.',
  description:
    'MG Flooring installs premium flooring, kitchen islands, bathrooms, and natural stone for homes and commercial spaces across Miami — including ongoing work at Miami International Airport.',

  // Contact ----------------------------------------------------
  phone: '(786) 340-9665',            // TODO: real phone
  phoneHref: '+17863409665',          // TODO: digits only, with country code
  email: 'geo@mgfloorllc.com',      // TODO: real email
  // Contact-form endpoint (https://formspree.io) — the ID after /f/
  formspreeId: 'mlgyvweo',

  // Location (powers local-SEO structured data) ----------------
  address: {
    street: '123 Main Street',        // TODO
    city: 'Miami',
    region: 'FL',
    postalCode: '33101',              // TODO exact zip
    country: 'US',
  },
  serviceArea: 'Miami-Dade & South Florida',
  geo: { lat: 25.7617, lng: -80.1918 }, // TODO exact shop lat/lng

  hours: 'Mon–Fri 8am–6pm · Sat by appointment',

  /**
   * GALLERY CAPTIONS (optional) --------------------------------
   * Images live in  public/gallery/<residential|commercial>/before + /after
   * and pair up by number:  before1.jpg ↔ after1.jpg,  before2.jpg ↔ after2.jpg …
   * Add a caption for a pair below (keyed by that number). If you skip one,
   * the site shows a generic label like "Residential 03" automatically.
   */
  gallery: {
    captions: {
      residential: {
        1: 'Marble island kitchen — Coral Gables',
        2: 'Primary bath remodel — Brickell',
        3: 'White-oak herringbone — Coconut Grove',
        4: 'Wide-plank living areas — Key Biscayne',
      },
      commercial: {
        1: 'Office suite resurfacing — Brickell',
        2: 'Restaurant build-out — Wynwood',
      },
    } as Record<'residential' | 'commercial', Record<number, string>>,
  },

  social: {
    instagram: '',                    // TODO full URL or leave blank to hide
    facebook: '',
    google: '',                       // Google Business Profile URL
    tiktok:'https://www.tiktok.com/@geovany.olazabal?_r=1&_t=ZP-97oZxLlSkZz',
  },

  // Deployment -------------------------------------------------
  // TODO: switch to the custom domain (e.g. https://www.mgflooring.com)
  // once it's connected in Firebase Hosting — this drives canonical URLs,
  // hreflang, and the sitemap.
  url: 'https://mgfloorllc.com',
  gaId: 'G-X4KXJ3EQHZ',               // GA4 measurement ID (Firebase Analytics)
}

export type SiteConfig = typeof site
