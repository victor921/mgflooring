/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Edit the values below and the whole site updates.
 *  Anything marked  // TODO  is a placeholder you should replace.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'MG Flooring & Stone',
  shortName: 'MG Flooring',
  tagline: 'Floors & stonework, done beautifully.',
  description:
    'MG Flooring & Stone installs premium flooring, kitchen islands, bathrooms, and natural stone for homes and commercial spaces across Miami — including ongoing work at Miami International Airport.',

  // Contact ----------------------------------------------------
  phone: '(555) 123-4567',            // TODO: real phone
  phoneHref: '+15551234567',          // TODO: digits only, with country code
  email: 'hello@mgflooring.com',      // TODO: real email
  // Get a free form endpoint at https://formspree.io (or use Netlify Forms).
  formspreeId: 'xxxxxxxx',            // TODO: your Formspree form ID

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

  social: {
    instagram: '',                    // TODO full URL or leave blank to hide
    facebook: '',
    google: '',                       // Google Business Profile URL
  },

  // Deployment -------------------------------------------------
  // TODO: switch to the custom domain (e.g. https://www.mgflooring.com)
  // once it's connected in Firebase Hosting — this drives canonical URLs,
  // hreflang, and the sitemap.
  url: 'https://mgfloorllc-4314d.web.app',
  gaId: 'G-X4KXJ3EQHZ',               // GA4 measurement ID (Firebase Analytics)
}

export type SiteConfig = typeof site
