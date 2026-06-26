<script setup lang="ts">
const site = useSite()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description', { name: site.name, phone: site.phone }),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description', { name: site.name, phone: site.phone }),
})

const form = reactive({ name: '', email: '', phone: '', service: 'marble', message: '', company: '' })
const services = ['marble', 'granite', 'stone', 'flooring', 'restoration', 'unsure']
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const endpoint = computed(() => `https://formspree.io/f/${site.formspreeId}`)
const isConfigured = computed(() => site.formspreeId !== 'xxxxxxxx')

async function submit() {
  if (form.company) return
  if (!isConfigured.value) {
    status.value = 'error'
    errorMsg.value = t('contact.error.notConfigured')
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(endpoint.value, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name, email: form.email, phone: form.phone,
        service: t(`contact.services.${form.service}`), message: form.message,
      }),
    })
    if (res.ok) status.value = 'success'
    else throw new Error('failed')
  } catch {
    status.value = 'error'
    errorMsg.value = t('contact.error.generic')
  }
}
</script>

<template>
  <div>
    <section class="rule-b">
      <div class="wrap py-14 md:py-20">
        <p class="label">{{ t('contact.label') }}</p>
        <h1 class="mt-6 max-w-3xl text-[2.4rem] font-medium leading-[1.04] tracking-tightest sm:text-6xl">
          {{ t('contact.h1') }}
        </h1>
        <p class="mt-6 max-w-xl text-base text-stone">{{ t('contact.intro') }}</p>
      </div>
    </section>

    <section class="wrap grid md:grid-cols-12">
      <!-- form -->
      <div class="border-line py-12 md:col-span-7 md:border-r md:pr-12 md:py-16">
        <div v-if="status === 'success'" class="border border-line p-10">
          <p class="label">{{ t('contact.success.label') }}</p>
          <h2 class="mt-4 text-2xl tracking-tight">{{ t('contact.success.title') }}</h2>
          <p class="mt-3 text-stone">{{ t('contact.success.body') }}</p>
        </div>

        <form v-else class="space-y-6" novalidate @submit.prevent="submit">
          <div class="grid gap-6 sm:grid-cols-2">
            <label class="block">
              <span class="label">{{ t('contact.form.name') }}</span>
              <input v-model="form.name" type="text" required autocomplete="name" class="field" :placeholder="t('contact.form.namePh')" />
            </label>
            <label class="block">
              <span class="label">{{ t('contact.form.email') }}</span>
              <input v-model="form.email" type="email" required autocomplete="email" class="field" :placeholder="t('contact.form.emailPh')" />
            </label>
          </div>
          <div class="grid gap-6 sm:grid-cols-2">
            <label class="block">
              <span class="label">{{ t('contact.form.phone') }}</span>
              <input v-model="form.phone" type="tel" autocomplete="tel" class="field" :placeholder="t('contact.form.phonePh')" />
            </label>
            <label class="block">
              <span class="label">{{ t('contact.form.material') }}</span>
              <select v-model="form.service" class="field">
                <option v-for="s in services" :key="s" :value="s">{{ t(`contact.services.${s}`) }}</option>
              </select>
            </label>
          </div>
          <label class="block">
            <span class="label">{{ t('contact.form.details') }}</span>
            <textarea v-model="form.message" rows="5" required class="field resize-none" :placeholder="t('contact.form.detailsPh')" />
          </label>

          <input v-model="form.company" type="text" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

          <p v-if="status === 'error'" class="text-sm text-ink">{{ errorMsg }}</p>
          <button type="submit" class="btn-solid" :disabled="status === 'sending'">
            {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.send') }}
          </button>
        </form>
      </div>

      <!-- details -->
      <aside class="border-t border-line py-12 md:col-span-5 md:border-t-0 md:pl-12 md:py-16">
        <p class="label">{{ t('contact.aside.prefer') }}</p>
        <ul class="mt-8 space-y-8">
          <li>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t('contact.aside.phone') }}</p>
            <a :href="`tel:${site.phoneHref}`" class="mt-1 block text-2xl tracking-tight hover:opacity-60">{{ site.phone }}</a>
          </li>
          <li>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t('contact.aside.email') }}</p>
            <a :href="`mailto:${site.email}`" class="mt-1 block text-2xl tracking-tight hover:opacity-60">{{ site.email }}</a>
          </li>
          <li>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t('contact.aside.hours') }}</p>
            <p class="mt-1 text-ink">{{ site.hours }}</p>
          </li>
          <li>
            <p class="text-[11px] uppercase tracking-label text-stone">{{ t('contact.aside.area') }}</p>
            <p class="mt-1 text-ink">{{ t('common.serving', { area: site.serviceArea }) }}</p>
          </li>
        </ul>
      </aside>
    </section>

    <HomeCta />
  </div>
</template>

<style scoped>
.field {
  @apply mt-2 w-full border border-line bg-paper px-4 py-3 text-ink
         placeholder:text-stone-light transition-colors
         focus:border-ink focus:outline-none;
}
</style>
