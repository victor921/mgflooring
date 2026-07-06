<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <section class="border-t border-line bg-ink text-paper">
    <div class="wrap grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-28">
      <div class="md:col-span-8">
        <p class="text-[11px] font-medium uppercase tracking-label text-stone-light">{{ t('home.cta.label') }}</p>
        <h2 class="mt-6 text-4xl font-medium leading-[1.04] tracking-tightest text-paper sm:text-5xl lg:text-6xl">
          {{ t('home.cta.title') }}
        </h2>
      </div>
      <div class="flex flex-wrap gap-4 md:col-span-4 md:justify-end">
        <NuxtLink :to="localePath('/contact')" class="btn border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper">
          {{ t('common.requestQuote') }}
        </NuxtLink>
        <a :href="`tel:${site.phoneHref}`" class="btn border border-paper/40 text-paper hover:border-paper">
          {{ site.phone }}
        </a>
      </div>
    </div>
  </section>
</template>
