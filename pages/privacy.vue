<script setup lang="ts">
const site = useSite()
const { t } = useI18n()

const sections = ['s1', 's2', 's3', 's4', 's5', 's6', 's7']

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description', { name: site.name }),
})
</script>

<template>
  <div>
    <section class="rule-b">
      <div class="wrap py-14 md:py-20">
        <p class="label">{{ t('privacy.label') }}</p>
        <h1 class="mt-6 max-w-3xl text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
          {{ t('privacy.h1') }}
        </h1>
        <p class="mt-6 text-[11px] uppercase tracking-label text-stone">{{ t('privacy.updated') }}</p>
      </div>
    </section>

    <section class="wrap max-w-3xl py-14 md:py-20">
      <p class="text-base leading-relaxed text-stone-dark">
        {{ t('privacy.intro', { name: site.name }) }}
      </p>
      <div v-for="s in sections" :key="s" class="mt-12">
        <h2 class="text-2xl tracking-tight">{{ t(`privacy.sections.${s}.title`) }}</h2>
        <p class="mt-4 text-base leading-relaxed text-stone">
          {{ t(`privacy.sections.${s}.body`, { name: site.name, email: site.email, phone: site.phone }) }}
        </p>
      </div>
    </section>
  </div>
</template>
