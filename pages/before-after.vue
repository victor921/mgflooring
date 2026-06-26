<script setup lang="ts">
import { projects } from '~/data/projects'

const site = useSite()
const { t } = useI18n()

const categories = ['All', 'Marble', 'Granite', 'Stone', 'Flooring'] as const
const active = ref<(typeof categories)[number]>('All')
const filtered = computed(() =>
  active.value === 'All' ? projects : projects.filter((p) => p.category === active.value),
)

useSeoMeta({
  title: () => t('seo.work.title'),
  description: () => t('seo.work.description', { name: site.name }),
  ogTitle: () => t('seo.work.title'),
  ogDescription: () => t('seo.work.description', { name: site.name }),
  ogImage: `${site.url}/stone/calacatta-polished.svg`,
})
</script>

<template>
  <div>
    <!-- header -->
    <section class="rule-b">
      <div class="wrap py-14 md:py-20">
        <p class="label">{{ t('work.label') }}</p>
        <h1 class="mt-6 max-w-4xl text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
          {{ t('work.h1') }}
        </h1>
        <p class="mt-6 max-w-xl text-base text-stone">{{ t('work.intro') }}</p>
      </div>
    </section>

    <!-- filter bar -->
    <section class="rule-b sticky top-16 z-30 bg-paper">
      <div class="wrap flex flex-wrap gap-x-8 gap-y-2 py-4">
        <button v-for="c in categories" :key="c"
          class="text-[12px] font-medium uppercase tracking-[0.12em] transition-colors"
          :class="active === c ? 'text-ink' : 'text-stone hover:text-ink'"
          @click="active = c">
          {{ t(`work.filters.${c}`) }}<span v-if="active === c" class="text-stone"> ·</span>
        </button>
      </div>
    </section>

    <!-- gallery -->
    <section class="wrap py-14 md:py-20">
      <TransitionGroup tag="div" class="grid gap-x-8 gap-y-16 md:grid-cols-2"
        enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0">
        <article v-for="p in filtered" :key="p.id">
          <BeforeAfterSlider :before="p.before" :after="p.after" :alt="t(`projects.${p.id}.title`)" />
          <div class="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <h2 class="text-xl tracking-tight">{{ t(`projects.${p.id}.title`) }}</h2>
            <span class="shrink-0 text-[11px] uppercase tracking-label text-stone">{{ p.index }}</span>
          </div>
          <p class="mt-1 text-[11px] uppercase tracking-label text-stone">{{ t(`projects.${p.id}.material`) }} · {{ t(`projects.${p.id}.location`) }}</p>
          <p class="mt-3 max-w-prose text-sm leading-relaxed text-stone">{{ t(`projects.${p.id}.summary`) }}</p>
        </article>
      </TransitionGroup>
    </section>

    <HomeCta />
  </div>
</template>
