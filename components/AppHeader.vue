<script setup lang="ts">
const open = ref(false)
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

// Wordmark links home, so the nav leads with the two markets
const links = [
  { to: '/residential', key: 'residential' },
  { to: '/commercial', key: 'commercial' },
  { to: '/before-after', key: 'work' },
  { to: '/testimonials', key: 'reviews' },
  { to: '/contact', key: 'contact' },
]
const route = useRoute()
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-paper">
    <div class="wrap flex h-16 items-center justify-between">
      <!-- Wordmark -->
      <NuxtLink :to="localePath('/')" class="flex items-baseline gap-2" aria-label="Home">
        <span class="text-[15px] font-semibold uppercase tracking-tight">MG Flooring</span>
        <!-- <span class="hidden text-[11px] uppercase tracking-label text-stone sm:inline">Stone &amp; Surfaces</span> -->
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-7 md:flex">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="localePath(l.to)"
          class="text-[12px] font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:text-ink"
          active-class="!text-ink"
        >{{ t(`nav.${l.key}`) }}</NuxtLink>
        <span class="h-4 w-px bg-line" />
        <LangSwitch />
        <a :href="`tel:${site.phoneHref}`" class="text-sm font-semibold tracking-tight text-ink transition-opacity hover:opacity-60">
          {{ site.phone }}
        </a>
        <NuxtLink :to="localePath('/contact')" class="btn-solid !py-2">{{ t('nav.quote') }}</NuxtLink>
      </nav>

      <!-- Mobile toggle -->
      <div class="flex items-center gap-5 md:hidden">
        <LangSwitch />
        <button
          class="relative h-10 w-10"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span class="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-ink transition-transform"
            :class="open ? 'rotate-45' : '-translate-y-1'" />
          <span class="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-ink transition-transform"
            :class="open ? '-rotate-45' : 'translate-y-1'" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <nav v-if="open" class="border-t border-line bg-paper md:hidden">
      <div class="wrap flex flex-col">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="localePath(l.to)"
          class="border-b border-line py-4 text-sm uppercase tracking-[0.12em] text-stone"
          active-class="!text-ink"
        >{{ t(`nav.${l.key}`) }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="btn-solid mt-4">{{ t('nav.quote') }}</NuxtLink>
        <a :href="`tel:${site.phoneHref}`" class="btn-outline mb-4 mt-3">{{ t('common.callUs') }} · {{ site.phone }}</a>
      </div>
    </nav>
  </header>
</template>
