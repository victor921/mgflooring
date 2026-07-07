<script setup lang="ts">
import { testimonials } from '~/data/testimonials'

const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

const gallery = useGallery()
const featured = gallery.find((g) => g.sector === 'residential') ?? gallery[0]
const quote = testimonials[0]
const heroImage = '/images/hero-living.jpg'

const sectors = [
  { key: 'residential', to: '/residential', img: '/images/residential/card.jpg' },
  { key: 'commercial', to: '/commercial', img: '/images/commercial/airport.jpg' },
]

const disciplines = [
  { n: '01', id: 'd1' },
  { n: '02', id: 'd2' },
  { n: '03', id: 'd3' },
  { n: '04', id: 'd4' },
]
const stats = [
  { value: '20+', id: 's1' },
  { value: '600', id: 's2' },
  { value: '4.9', id: 's3' },
  { value: '100', id: 's4' },
]
const trustPoints = ['p1', 'p2', 'p3']
const steps = ['s1', 's2', 's3']
const faqs = ['f1', 'f2', 'f3', 'f4', 'f5']

// FAQPage rich-result schema, built from the same translated copy shown on page
useStructuredData({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((id) => ({
    '@type': 'Question',
    name: t(`home.faq.items.${id}.q`, { phone: site.phone, area: site.serviceArea }),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`home.faq.items.${id}.a`, { phone: site.phone, area: site.serviceArea }),
    },
  })),
})

useSeoMeta({
  title: () => t('seo.home.title', { name: site.name }),
  description: () => t('seo.home.description', { name: site.name }),
  ogTitle: () => t('seo.home.title', { name: site.name }),
  ogDescription: () => t('seo.home.description', { name: site.name }),
  ogType: 'website',
  ogImage: `${site.url}/images/hero-living.jpg`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- ── HERO ─────────────────────────────────────────── -->
    <section>
      <div class="rule-b">
        <div class="wrap grid grid-cols-2 gap-y-3 py-4 text-[11px] uppercase tracking-label text-stone md:grid-cols-4">
          <span>{{ t('home.meta.est') }}</span>
          <span>{{ t('home.meta.materials') }}</span>
          <span class="hidden md:block">{{ t('home.meta.serving', { area: site.serviceArea }) }}</span>
          <span class="text-right md:text-left text-ink">{{ t('home.meta.free') }}</span>
        </div>
      </div>

      <div class="wrap grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div class="md:col-span-8">
          <h1 class="text-[2.6rem] font-medium leading-[1.02] tracking-tightest sm:text-6xl lg:text-7xl">
            {{ t('home.hero.headline') }}
          </h1>
        </div>
        <div class="flex flex-col justify-end gap-6 md:col-span-4">
          <p class="text-base leading-relaxed text-stone">
            {{ t('home.hero.intro', { area: site.serviceArea }) }}
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink :to="localePath('/contact')" class="btn-solid">{{ t('common.getQuote') }}</NuxtLink>
            <a :href="`tel:${site.phoneHref}`" class="btn-outline">{{ t('common.callUs') }} · {{ site.phone }}</a>
          </div>
          <ul class="space-y-2">
            <li v-for="p in trustPoints" :key="p" class="flex items-start gap-2.5 text-sm text-stone-dark">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {{ t(`home.hero.points.${p}`) }}
            </li>
          </ul>
        </div>
      </div>

      <div class="border-y border-line">
        <img :src="heroImage" :alt="t('home.hero.alt')"
          class="h-[44vh] w-full object-cover md:h-[58vh]" width="1600" height="1067" />
      </div>
    </section>

    <!-- ── RESIDENTIAL / COMMERCIAL ─────────────────────── -->
    <section class="wrap py-16 md:py-24">
      <p class="label">{{ t('home.sectors.label') }}</p>
      <h2 class="mt-5 max-w-2xl text-3xl tracking-tighter sm:text-4xl">{{ t('home.sectors.title') }}</h2>
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <NuxtLink v-for="s in sectors" :key="s.key" :to="localePath(s.to)"
          class="group relative block overflow-hidden rounded">
          <img :src="s.img" :alt="t(`home.sectors.${s.key}.title`)"
            class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="1200" height="900" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-7 md:p-9">
            <p class="text-[11px] font-medium uppercase tracking-label text-paper/70">{{ t(`home.sectors.${s.key}.label`) }}</p>
            <h3 class="mt-2 text-2xl font-medium tracking-tight text-paper sm:text-3xl">{{ t(`home.sectors.${s.key}.title`) }}</h3>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-paper/80">{{ t(`home.sectors.${s.key}.body`) }}</p>
            <span class="mt-5 inline-flex items-center gap-2 border-b border-paper pb-0.5 text-sm font-medium text-paper">
              {{ t(`home.sectors.${s.key}.cta`) }}
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── DISCIPLINES ──────────────────────────────────── -->
    <section class="wrap py-16 md:py-24">
      <div class="grid gap-6 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="label">{{ t('home.disciplines.label') }}</p>
          <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('home.disciplines.title') }}</h2>
        </div>
        <div class="md:col-span-8">
          <div class="border-t border-line">
            <div v-for="d in disciplines" :key="d.id"
              class="grid grid-cols-12 gap-4 border-b border-line py-7 transition-colors hover:bg-bg">
              <span class="col-span-2 text-sm text-stone md:col-span-1">{{ d.n }}</span>
              <h3 class="col-span-10 text-xl tracking-tight md:col-span-4">{{ t(`home.disciplines.items.${d.id}.title`) }}</h3>
              <p class="col-span-12 text-sm leading-relaxed text-stone md:col-span-7">{{ t(`home.disciplines.items.${d.id}.body`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SELECTED WORK ────────────────────────────────── -->
    <section class="border-t border-line bg-bg py-16 md:py-24">
      <div class="wrap">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="label">{{ t('home.work.label') }}</p>
            <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('home.work.title') }}</h2>
          </div>
          <NuxtLink :to="localePath('/before-after')" class="ulink">{{ t('common.allProjects') }}</NuxtLink>
        </div>

        <div v-if="featured" class="mt-10">
          <BeforeAfterSlider :before="featured.before" :after="featured.after" :alt="galleryCaption(featured, t)" ratio="aspect-[16/9]" />
          <div class="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
            <p class="text-lg tracking-tight">{{ galleryCaption(featured, t) }}</p>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t(`work.filters.${featured.sector}`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS ────────────────────────────────────────── -->
    <section class="wrap py-16 md:py-20">
      <dl class="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        <div v-for="s in stats" :key="s.id" class="bg-paper p-7">
          <dt class="flex items-baseline gap-2">
            <span class="text-4xl font-medium tracking-tighter sm:text-5xl">{{ s.value }}</span>
            <span class="text-xs uppercase tracking-label text-stone">{{ t(`home.stats.${s.id}.unit`) }}</span>
          </dt>
          <dd class="mt-3 text-sm text-stone">{{ t(`home.stats.${s.id}.label`) }}</dd>
        </div>
      </dl>
    </section>

    <!-- ── HOW IT WORKS ─────────────────────────────────── -->
    <section class="border-t border-line bg-bg py-16 md:py-24">
      <div class="wrap">
        <p class="label">{{ t('home.steps.label') }}</p>
        <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('home.steps.title') }}</h2>
        <ol class="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          <li v-for="(s, i) in steps" :key="s" class="bg-paper p-8">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">{{ i + 1 }}</span>
            <h3 class="mt-5 text-xl tracking-tight">{{ t(`home.steps.items.${s}.title`) }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-stone">{{ t(`home.steps.items.${s}.body`) }}</p>
          </li>
        </ol>
        <div class="mt-8 flex flex-wrap items-center gap-5">
          <NuxtLink :to="localePath('/contact')" class="btn-solid">{{ t('common.getQuote') }}</NuxtLink>
          <p class="text-sm text-stone">{{ t('home.steps.note') }}</p>
        </div>
      </div>
    </section>

    <!-- ── QUOTE ────────────────────────────────────────── -->
    <section class="border-t border-line py-16 md:py-24">
      <div class="wrap max-w-4xl">
        <StarRating :rating="quote.rating" />
        <blockquote class="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          “{{ t(`testimonials.${quote.id}.quote`) }}”
        </blockquote>
        <p class="mt-6 text-sm text-stone">
          <span class="text-ink">{{ quote.name }}</span> — {{ t(`testimonials.${quote.id}.detail`) }}
        </p>
        <NuxtLink :to="localePath('/testimonials')" class="ulink mt-8">{{ t('common.moreReviews') }}</NuxtLink>
      </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────── -->
    <section class="border-t border-line py-16 md:py-24">
      <div class="wrap grid gap-10 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="label">{{ t('home.faq.label') }}</p>
          <h2 class="mt-5 text-3xl tracking-tighter sm:text-4xl">{{ t('home.faq.title') }}</h2>
          <p class="mt-5 text-sm text-stone">
            {{ t('home.faq.more') }}
            <a :href="`tel:${site.phoneHref}`" class="font-medium text-ink underline underline-offset-2 hover:opacity-60">{{ site.phone }}</a>
          </p>
        </div>
        <div class="md:col-span-8">
          <div class="border-t border-line">
            <details v-for="f in faqs" :key="f" class="group border-b border-line">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-lg tracking-tight [&::-webkit-details-marker]:hidden">
                {{ t(`home.faq.items.${f}.q`, { phone: site.phone, area: site.serviceArea }) }}
                <svg class="h-4 w-4 shrink-0 text-stone transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p class="pb-6 pr-8 text-sm leading-relaxed text-stone">
                {{ t(`home.faq.items.${f}.a`, { phone: site.phone, area: site.serviceArea }) }}
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <HomeCta />
  </div>
</template>
