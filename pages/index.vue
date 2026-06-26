<script setup lang="ts">
import { projects } from '~/data/projects'
import { testimonials } from '~/data/testimonials'

const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

const featured = projects[0]
const quote = testimonials[0]
const heroImage = '/stone/hero.svg'

const disciplines = [
  { n: '01', id: 'd1' },
  { n: '02', id: 'd2' },
  { n: '03', id: 'd3' },
  { n: '04', id: 'd4' },
]
const stats = [
  { value: '15', id: 's1' },
  { value: '600', id: 's2' },
  { value: '4.9', id: 's3' },
  { value: '100', id: 's4' },
]

useSeoMeta({
  title: () => t('seo.home.title', { name: site.name }),
  description: () => t('seo.home.description', { name: site.name }),
  ogTitle: () => t('seo.home.title', { name: site.name }),
  ogDescription: () => t('seo.home.description', { name: site.name }),
  ogType: 'website',
  ogImage: `${site.url}/stone/hero.svg`,
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
            <NuxtLink :to="localePath('/before-after')" class="btn-outline">{{ t('common.viewWork') }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="border-y border-line">
        <img :src="heroImage" :alt="t('home.hero.alt')"
          class="h-[44vh] w-full object-cover md:h-[58vh]" width="1600" height="1200" />
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

        <div class="mt-10">
          <BeforeAfterSlider :before="featured.before" :after="featured.after" :alt="t(`projects.${featured.id}.title`)" ratio="aspect-[16/9]" />
          <div class="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
            <p class="text-lg tracking-tight">{{ t(`projects.${featured.id}.title`) }}</p>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t(`projects.${featured.id}.material`) }} · {{ t(`projects.${featured.id}.location`) }}</p>
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

    <HomeCta />
  </div>
</template>
