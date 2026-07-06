import { site } from '~/site.config'

/**
 * Inject JSON-LD structured data via useHead — renders a real
 * <script type="application/ld+json"> into the static HTML for rich
 * results in Google. Reliable across SSR/SSG with no extra deps.
 */
export function useStructuredData(node: Record<string, any>) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(node),
      },
    ],
  })
}

/** Base LocalBusiness node used site-wide (strong local SEO signal). */
export function localBusinessNode(extra: Record<string, any> = {}) {
  const sameAs = Object.values(site.social).filter(Boolean)
  const hasGeo = site.geo.lat !== 0 || site.geo.lng !== 0
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: `+${site.phoneHref.replace(/\D/g, '')}`,
    email: site.email,
    image: `${site.url}/images/hero-living.jpg`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.serviceArea,
    openingHours: 'Mo-Fr 08:00-18:00',
    ...(sameAs.length ? { sameAs } : {}),
    ...(hasGeo
      ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } }
      : {}),
    ...extra,
  }
}
