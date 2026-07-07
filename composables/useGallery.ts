import { site } from '~/site.config'

export interface GalleryItem {
  sector: 'residential' | 'commercial'
  n: number
  before: string
  after: string
}

/** Before/after pairs discovered from public/gallery/ at build time. */
export function useGallery(): GalleryItem[] {
  return useRuntimeConfig().public.gallery as GalleryItem[]
}

/** Caption from site.config.ts, or a generic translated fallback. */
export function galleryCaption(item: GalleryItem, t: (key: string) => string): string {
  const custom = site.gallery.captions[item.sector]?.[item.n]
  return custom || `${t(`work.filters.${item.sector}`)} ${String(item.n).padStart(2, '0')}`
}
