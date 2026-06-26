<script setup lang="ts">
import type { Testimonial } from '~/data/testimonials'
const props = defineProps<{ item: Testimonial }>()
const { t } = useI18n()
</script>

<template>
  <figure class="flex h-full flex-col border border-line bg-paper p-7">
    <StarRating :rating="item.rating" />
    <blockquote class="mt-5 flex-1 text-lg leading-relaxed tracking-tight text-ink">
      “{{ t(`testimonials.${item.id}.quote`) }}”
    </blockquote>
    <figcaption class="mt-6 flex items-baseline justify-between border-t border-line pt-4">
      <span class="text-sm font-medium text-ink">{{ item.name }}</span>
      <span class="text-[11px] uppercase tracking-label text-stone">{{ t(`testimonials.${item.id}.detail`) }}</span>
    </figcaption>
  </figure>
</template>
