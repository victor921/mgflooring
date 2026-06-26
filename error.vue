<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-paper px-6 text-center">
    <div>
      <p class="label">{{ t('error.code', { code: error?.statusCode || 404 }) }}</p>
      <h1 class="mt-5 text-4xl font-medium tracking-tightest sm:text-5xl">{{ t('error.title') }}</h1>
      <p class="mt-4 text-stone">{{ t('error.body') }}</p>
      <button class="btn-solid mt-8" @click="clearError({ redirect: localePath('/') })">{{ t('error.home') }}</button>
    </div>
  </div>
</template>
