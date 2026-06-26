<script setup lang="ts">
// EN / ES toggle. Uses i18n's locale-aware paths so switching keeps you on the
// same page (e.g. /before-after ⇄ /es/before-after).
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as { code: string }[]).map((l) => l.code),
)
</script>

<template>
  <div class="flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.12em]">
    <template v-for="(code, i) in options" :key="code">
      <span v-if="i > 0" class="text-line">/</span>
      <NuxtLink
        :to="switchLocalePath(code)"
        :aria-current="locale === code ? 'true' : undefined"
        class="transition-colors"
        :class="locale === code ? 'text-ink' : 'text-stone hover:text-ink'"
      >{{ code }}</NuxtLink>
    </template>
  </div>
</template>
