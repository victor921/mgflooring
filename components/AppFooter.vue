<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()
const year = new Date().getFullYear()
const socials = computed(() =>
  Object.entries(site.social).filter(([, url]) => !!url),
)
const links = [
  { to: '/', key: 'home' },
  { to: '/residential', key: 'residential' },
  { to: '/commercial', key: 'commercial' },
  { to: '/before-after', key: 'work' },
  { to: '/testimonials', key: 'reviews' },
  { to: '/contact', key: 'contact' },
]
</script>

<template>
  <footer class="mt-px border-t border-line bg-bg">
    <div class="wrap grid gap-10 py-16 md:grid-cols-12 md:py-20">
      <div class="md:col-span-6">
        <p class="label">{{ site.shortName }}</p>
        <p class="mt-5 max-w-md text-2xl tracking-tighter text-ink sm:text-3xl">
          {{ t('footer.tagline') }}
        </p>
        <NuxtLink :to="localePath('/contact')" class="ulink mt-8">{{ t('common.requestQuote') }}</NuxtLink>
      </div>

      <div class="md:col-span-3">
        <p class="label">{{ t('footer.index') }}</p>
        <ul class="mt-5 space-y-3 text-sm">
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="localePath(l.to)" class="text-stone transition-colors hover:text-ink">{{ t(`nav.${l.key}`) }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="label">{{ t('footer.contact') }}</p>
        <ul class="mt-5 space-y-3 text-sm">
          <li><a :href="`tel:${site.phoneHref}`" class="text-stone transition-colors hover:text-ink">{{ site.phone }}</a></li>
          <li><a :href="`mailto:${site.email}`" class="text-stone transition-colors hover:text-ink">{{ site.email }}</a></li>
          <li class="text-stone">{{ site.hours }}</li>
          <li class="text-stone">{{ t('common.serving', { area: site.serviceArea }) }}</li>
        </ul>
        <div v-if="socials.length" class="mt-5 flex gap-4">
          <a v-for="[name, url] in socials" :key="name" :href="url" target="_blank" rel="noopener"
            class="text-[11px] uppercase tracking-label text-stone hover:text-ink">{{ name }}</a>
        </div>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="wrap flex flex-col justify-between gap-2 py-6 text-[11px] uppercase tracking-label text-stone sm:flex-row">
        <p>
          © {{ year }} {{ site.name }}
          <span class="mx-2 text-line">·</span>
          <span>{{ t('footer.craftedBy') }}</span>
          <a href="https://rocox.co/" target="_blank" rel="noopener"
            class="font-medium text-stone-dark transition-colors hover:text-accent">RocoX</a>
        </p>
        <div class="flex gap-6">
          <NuxtLink :to="localePath('/privacy')" class="transition-colors hover:text-ink">{{ t('nav.privacy') }}</NuxtLink>
          <p>{{ t('footer.bottomTagline') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
