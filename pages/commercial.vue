<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

const featured = useGallery().find((g) => g.sector === 'commercial')
const capabilities = ['c1', 'c2', 'c3', 'c4']
const miaStats = ['m1', 'm2', 'm3']

useSeoMeta({
  title: () => t('seo.commercial.title'),
  description: () => t('seo.commercial.description', { name: site.name }),
  ogTitle: () => t('seo.commercial.title'),
  ogDescription: () => t('seo.commercial.description', { name: site.name }),
  ogImage: `${site.url}/images/commercial/airport.jpg`,
})
</script>

<template>
  <div>
    <!-- ── HERO ─────────────────────────────────────────── -->
    <section class="rule-b">
      <div class="wrap grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div class="md:col-span-7">
          <p class="label">{{ t('commercial.label') }}</p>
          <h1 class="mt-6 text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
            {{ t('commercial.h1') }}
          </h1>
          <p class="mt-6 max-w-xl text-base leading-relaxed text-stone">
            {{ t('commercial.intro') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink :to="localePath('/contact')" class="btn-solid">{{ t('commercial.cta') }}</NuxtLink>
            <a :href="`tel:${site.phoneHref}`" class="btn-outline">{{ t('common.callUs') }} · {{ site.phone }}</a>
          </div>
        </div>
        <div class="md:col-span-5">
          <img src="/images/commercial/office-lobby.jpg" :alt="t('commercial.heroAlt')"
            class="h-72 w-full rounded object-cover md:h-full md:max-h-[26rem]" width="1200" height="800" loading="eager" />
        </div>
      </div>
    </section>

    <!-- ── FEATURED: MIAMI INTERNATIONAL AIRPORT ────────── -->
    <section class="bg-ink text-paper">
      <div class="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div class="md:col-span-6">
          <p class="text-[11px] font-medium uppercase tracking-label text-stone-light">{{ t('commercial.mia.label') }}</p>
          <h2 class="mt-6 text-3xl font-medium leading-[1.06] tracking-tighter text-paper sm:text-5xl">
            {{ t('commercial.mia.title') }}
          </h2>
          <p class="mt-6 max-w-xl text-base leading-relaxed text-stone-light">
            {{ t('commercial.mia.body') }}
          </p>
          <dl class="mt-10 grid grid-cols-3 gap-6 border-t border-paper/20 pt-8">
            <div v-for="m in miaStats" :key="m">
              <dt class="text-3xl font-medium tracking-tighter sm:text-4xl">{{ t(`commercial.mia.stats.${m}.value`) }}</dt>
              <dd class="mt-2 text-xs uppercase tracking-label text-stone-light">{{ t(`commercial.mia.stats.${m}.label`) }}</dd>
            </div>
          </dl>
        </div>
        <div class="md:col-span-6">
          <img src="/images/commercial/airport.jpg" :alt="t('commercial.mia.alt')"
            class="h-full min-h-64 w-full rounded object-cover" width="1600" height="1067" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- ── CAPABILITIES ─────────────────────────────────── -->
    <section class="wrap py-16 md:py-24">
      <div class="grid gap-6 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="label">{{ t('commercial.capabilities.label') }}</p>
          <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('commercial.capabilities.title') }}</h2>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-stone">{{ t('commercial.capabilities.note') }}</p>
        </div>
        <div class="md:col-span-8">
          <div class="border-t border-line">
            <div v-for="(c, i) in capabilities" :key="c" class="grid grid-cols-12 gap-4 border-b border-line py-7">
              <span class="col-span-2 text-sm text-stone md:col-span-1">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="col-span-10 text-xl tracking-tight md:col-span-4">{{ t(`commercial.capabilities.items.${c}.title`) }}</h3>
              <p class="col-span-12 text-sm leading-relaxed text-stone md:col-span-7">{{ t(`commercial.capabilities.items.${c}.body`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURED BEFORE/AFTER ────────────────────────── -->
    <section v-if="featured" class="border-t border-line bg-bg py-16 md:py-24">
      <div class="wrap">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="label">{{ t('commercial.featured.label') }}</p>
            <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('commercial.featured.title') }}</h2>
          </div>
          <NuxtLink :to="localePath('/before-after')" class="ulink">{{ t('common.allProjects') }}</NuxtLink>
        </div>
        <div class="mt-10">
          <BeforeAfterSlider :before="featured.before" :after="featured.after" :alt="galleryCaption(featured, t)" ratio="aspect-[16/9]" />
          <div class="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
            <p class="text-lg tracking-tight">{{ galleryCaption(featured, t) }}</p>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t('work.filters.commercial') }}</p>
          </div>
        </div>
      </div>
    </section>

    <HomeCta />
  </div>
</template>
