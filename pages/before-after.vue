<script setup lang="ts">
const site = useSite()
const { t } = useI18n()

const gallery = useGallery()
const filters = ['all', 'residential', 'commercial'] as const
const active = ref<(typeof filters)[number]>('all')
const filtered = computed(() =>
  active.value === 'all' ? gallery : gallery.filter((p) => p.sector === active.value),
)

useSeoMeta({
  title: () => t('seo.work.title'),
  description: () => t('seo.work.description', { name: site.name }),
  ogTitle: () => t('seo.work.title'),
  ogDescription: () => t('seo.work.description', { name: site.name }),
  ogImage: `${site.url}/gallery/residential/after/after1.jpg`,
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
        <button v-for="f in filters" :key="f"
          class="text-[12px] font-medium uppercase tracking-[0.12em] transition-colors"
          :class="active === f ? 'text-ink' : 'text-stone hover:text-ink'"
          @click="active = f">
          {{ t(`work.filters.${f}`) }}<span v-if="active === f" class="text-accent"> ·</span>
        </button>
      </div>
    </section>

    <!-- gallery -->
    <section class="wrap py-14 md:py-20">
      <TransitionGroup tag="div" class="grid gap-x-8 gap-y-14 md:grid-cols-2"
        enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0">
        <article v-for="p in filtered" :key="`${p.sector}-${p.n}`">
          <BeforeAfterSlider :before="p.before" :after="p.after" :alt="galleryCaption(p, t)" />
          <div class="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <h2 class="text-xl tracking-tight">{{ galleryCaption(p, t) }}</h2>
            <span class="shrink-0 rounded bg-bg px-2.5 py-1 text-[10px] font-medium uppercase tracking-label text-stone-dark">
              {{ t(`work.filters.${p.sector}`) }}
            </span>
          </div>
        </article>
      </TransitionGroup>
      <p v-if="!filtered.length" class="py-10 text-stone">{{ t('work.empty') }}</p>
    </section>

    <HomeCta />
  </div>
</template>
