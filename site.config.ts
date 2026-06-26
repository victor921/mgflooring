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
    'MG Flooring & Stone designs and installs premium flooring, natural stone, and surface finishes — hardwood, tile, marble, and custom stonework built to last.',

  // Contact ----------------------------------------------------
  phone: '(555) 123-4567',            // TODO: real phone
  phoneHref: '+15551234567',          // TODO: digits only, with country code
  email: 'hello@mgflooring.com',      // TODO: real email
  // Get a free form endpoint at https://formspree.io (or use Netlify Forms).
  formspreeId: 'xxxxxxxx',            // TODO: your Formspree form ID

  // Location (powers local-SEO structured data) ----------------
  address: {
    street: '123 Main Street',        // TODO
    city: 'Your City',                // TODO
    region: 'ST',                     // TODO state/province
    postalCode: '00000',              // TODO
    country: 'US',
  },
  serviceArea: 'the greater metro area', // TODO e.g. "Austin and surrounding areas"
  geo: { lat: 0, lng: 0 },            // TODO lat/lng for Google Business / maps

  hours: 'Mon–Fri 8am–6pm · Sat by appointment',

  social: {
    instagram: '',                    // TODO full URL or leave blank to hide
    facebook: '',
    google: '',                       // Google Business Profile URL
  },

  // Deployment -------------------------------------------------
  url: 'https://www.mgflooring.com',  // TODO production domain (no trailing slash)
  gaId: 'G-XXXXXXXXXX',               // TODO Google Analytics 4 Measurement ID
}

export type SiteConfig = typeof site
