<script setup lang="ts">
import { testimonials } from '~/data/testimonials'

const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()
const avg = (testimonials.reduce((s, x) => s + x.rating, 0) / testimonials.length).toFixed(1)

useStructuredData(breadcrumbNode([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('nav.reviews'), path: localePath('/testimonials') },
]))

useSeoMeta({
  title: () => t('seo.reviews.title'),
  description: () => t('seo.reviews.description', { name: site.name, avg }),
  ogTitle: () => t('seo.reviews.title'),
  ogDescription: () => t('seo.reviews.description', { name: site.name, avg }),
})

useStructuredData(
  localBusinessNode({
    aggregateRating: { '@type': 'AggregateRating', ratingValue: avg, reviewCount: testimonials.length, bestRating: 5 },
    review: testimonials.map((x) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: x.rating, bestRating: 5 },
      author: { '@type': 'Person', name: x.name },
      reviewBody: t(`testimonials.${x.id}.quote`),
    })),
  }),
)
</script>

<template>
  <div>
    <section class="rule-b">
      <div class="wrap grid gap-8 py-14 md:grid-cols-12 md:py-20">
        <div class="md:col-span-8">
          <p class="label">{{ t('reviews.label') }}</p>
          <h1 class="mt-6 text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
            {{ t('reviews.h1', { area: site.serviceArea }) }}
          </h1>
        </div>
        <div class="flex items-end md:col-span-4 md:justify-end">
          <div>
            <div class="flex items-baseline gap-3">
              <span class="text-6xl font-medium tracking-tighter">{{ avg }}</span>
              <StarRating :rating="5" />
            </div>
            <p class="mt-2 text-sm text-stone">{{ t('reviews.count', { n: testimonials.length }) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap py-14 md:py-20">
      <div class="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        <TestimonialCard v-for="x in testimonials" :key="x.id" :item="x" class="!border-0" />
      </div>
    </section>

    <HomeCta />
  </div>
</template>
