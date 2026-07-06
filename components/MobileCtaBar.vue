<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <!-- Sticky lead bar — mobile only, where most local-service traffic converts -->
  <div class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-line bg-line md:hidden"
    style="padding-bottom: env(safe-area-inset-bottom)">
    <a :href="`tel:${site.phoneHref}`"
      class="flex items-center justify-center gap-2 bg-paper py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      {{ t('common.callUs') }}
    </a>
    <NuxtLink :to="localePath('/contact')"
      class="flex items-center justify-center bg-accent py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-paper">
      {{ t('common.freeQuote') }}
    </NuxtLink>
  </div>
</template>
