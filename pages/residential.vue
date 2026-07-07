<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

const residentialPairs = useGallery().filter((g) => g.sector === 'residential')
// Home features pair #1, so this page leads with the next one
const featured = residentialPairs[1] ?? residentialPairs[0]
const services = ['s1', 's2', 's3', 's4']
const gallery = [
  { src: '/images/residential/kitchen-white.jpg', key: 'g1' },
  { src: '/images/residential/bath-tub.jpg', key: 'g2' },
  { src: '/images/residential/bedroom.jpg', key: 'g3' },
]

useStructuredData(breadcrumbNode([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.residential'), path: localePath('/residential') },
]))

useSeoMeta({
  title: () => t('seo.residential.title'),
  description: () => t('seo.residential.description', { name: site.name, area: site.serviceArea }),
  ogTitle: () => t('seo.residential.title'),
  ogDescription: () => t('seo.residential.description', { name: site.name, area: site.serviceArea }),
  ogImage: `${site.url}/gallery/residential/after/after1.jpg`,
})
</script>

<template>
  <div>
    <!-- ── HERO ─────────────────────────────────────────── -->
    <section class="rule-b">
      <div class="wrap grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div class="md:col-span-7">
          <p class="label">{{ t('residential.label') }}</p>
          <h1 class="mt-6 text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
            {{ t('residential.h1') }}
          </h1>
          <p class="mt-6 max-w-xl text-base leading-relaxed text-stone">
            {{ t('residential.intro', { area: site.serviceArea }) }}
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink :to="localePath('/contact')" class="btn-solid">{{ t('common.getQuote') }}</NuxtLink>
            <a :href="`tel:${site.phoneHref}`" class="btn-outline">{{ t('common.callUs') }} · {{ site.phone }}</a>
          </div>
        </div>
        <div class="md:col-span-5">
          <img src="/images/residential/stairs.jpg" :alt="t('residential.heroAlt')"
            class="h-72 w-full rounded object-cover md:h-full md:max-h-[26rem]" width="800" height="1200" loading="eager" />
        </div>
      </div>
    </section>

    <!-- ── SERVICES ─────────────────────────────────────── -->
    <section class="wrap py-16 md:py-24">
      <div class="grid gap-6 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="label">{{ t('residential.services.label') }}</p>
          <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('residential.services.title') }}</h2>
        </div>
        <div class="md:col-span-8">
          <div class="border-t border-line">
            <div v-for="(s, i) in services" :key="s" class="grid grid-cols-12 gap-4 border-b border-line py-7">
              <span class="col-span-2 text-sm text-stone md:col-span-1">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="col-span-10 text-xl tracking-tight md:col-span-4">{{ t(`residential.services.items.${s}.title`) }}</h3>
              <p class="col-span-12 text-sm leading-relaxed text-stone md:col-span-7">{{ t(`residential.services.items.${s}.body`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── GALLERY STRIP ────────────────────────────────── -->
    <section class="border-t border-line bg-bg py-16 md:py-24">
      <div class="wrap">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="label">{{ t('residential.gallery.label') }}</p>
            <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('residential.gallery.title') }}</h2>
          </div>
          <NuxtLink :to="localePath('/before-after')" class="ulink">{{ t('common.allProjects') }}</NuxtLink>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <img v-for="g in gallery" :key="g.key" :src="g.src" :alt="t(`residential.gallery.alts.${g.key}`)"
            class="aspect-[4/5] w-full rounded object-cover" width="800" height="1000" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- ── FEATURED BEFORE/AFTER ────────────────────────── -->
    <section v-if="featured" class="wrap py-16 md:py-24">
      <p class="label">{{ t('residential.featured.label') }}</p>
      <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('residential.featured.title') }}</h2>
      <div class="mt-10">
        <BeforeAfterSlider :before="featured.before" :after="featured.after" :alt="galleryCaption(featured, t)" ratio="aspect-[16/9]" />
        <div class="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
          <p class="text-lg tracking-tight">{{ galleryCaption(featured, t) }}</p>
          <p class="text-[11px] uppercase tracking-label text-stone">{{ t('work.filters.residential') }}</p>
        </div>
      </div>
    </section>

    <HomeCta />
  </div>
</template>
