// Structure only — translatable text (title, material, location, summary) lives
// in i18n/locales/*.json under `projects.<id>`. Replace before/after with real
// photos in /public/stone (same filenames).
export interface Project {
  id: string
  index: string
  category: 'Marble' | 'Granite' | 'Stone' | 'Flooring'
  before: string
  after: string
}

export const projects: Project[] = [
  { id: 'calacatta-bath', index: '01', category: 'Marble', before: '/stone/calacatta-raw.svg', after: '/stone/calacatta-polished.svg' },
  { id: 'carrara-floor', index: '02', category: 'Flooring', before: '/stone/carrara-raw.svg', after: '/stone/carrara-polished.svg' },
  { id: 'nero-feature', index: '03', category: 'Marble', before: '/stone/nero-raw.svg', after: '/stone/nero-polished.svg' },
  { id: 'graphite-counter', index: '04', category: 'Granite', before: '/stone/graphite-raw.svg', after: '/stone/graphite-polished.svg' },
  { id: 'travertine-patio', index: '05', category: 'Stone', before: '/stone/travertine-raw.svg', after: '/stone/travertine-polished.svg' },
  { id: 'basalt-floor', index: '06', category: 'Flooring', before: '/stone/basalt-raw.svg', after: '/stone/basalt-polished.svg' },
]
