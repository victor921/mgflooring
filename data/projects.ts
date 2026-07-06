// Structure only — translatable text (title, scope, location, summary) lives
// in i18n/locales/*.json under `projects.<id>`. Swap the images in
// /public/images with real project photos (same filenames) when available.
export type Sector = 'residential' | 'commercial'

export interface Project {
  id: string
  index: string
  sector: Sector
  before: string
  after: string
}

export const projects: Project[] = [
  {
    id: 'kitchen-island',
    index: '01',
    sector: 'residential',
    before: '/images/residential/kitchen-before.jpg',
    after: '/images/residential/kitchen-after.jpg',
  },
  {
    id: 'bath-remodel',
    index: '02',
    sector: 'residential',
    before: '/images/residential/bath-before.jpg',
    after: '/images/residential/bath-after.jpg',
  },
  {
    id: 'herringbone-floor',
    index: '03',
    sector: 'residential',
    before: '/images/residential/herringbone-before.jpg',
    after: '/images/residential/herringbone-after.jpg',
  },
  {
    id: 'living-floor',
    index: '04',
    sector: 'residential',
    before: '/images/residential/living-before.jpg',
    after: '/images/residential/living-after.jpg',
  },
  {
    id: 'office-suite',
    index: '05',
    sector: 'commercial',
    before: '/images/commercial/office-before.jpg',
    after: '/images/commercial/office-after.jpg',
  },
  {
    id: 'restaurant-wynwood',
    index: '06',
    sector: 'commercial',
    before: '/images/commercial/restaurant-before.jpg',
    after: '/images/commercial/restaurant-after.jpg',
  },
]
