<script setup lang="ts">
const site = useSite()
const localePath = useLocalePath()
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description', { name: site.name, phone: site.phone }),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description', { name: site.name, phone: site.phone }),
})

const form = reactive({ name: '', email: '', phone: '', service: 'flooring', message: '', consent: false, gotcha: '' })
const services = ['flooring', 'kitchen', 'bathroom', 'commercial', 'design', 'unsure']
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const endpoint = computed(() => `https://formspree.io/f/${site.formspreeId}`)

// Progressive enhancement: the form also works as a plain HTML POST to
// Formspree (action/method/name attributes), so it still submits if JS
// ever fails. With JS, we intercept and show in-page success/error states.
async function submit() {
  if (form.gotcha) return // honeypot — silently drop bot submissions
  if (!form.consent) return // required checkbox; browser validation shows the prompt
  status.value = 'sending'
  errorMsg.value = ''
  try {
    const res = await fetch(endpoint.value, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: t(`contact.services.${form.service}`),
        message: form.message,
        privacyConsent: 'agreed',
        _subject: `New quote request — ${form.name}`,
      }),
    })
    if (res.ok) {
      status.value = 'success'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      status.value = 'error'
      errorMsg.value = t('contact.error.generic')
    }
  } catch {
    status.value = 'error'
    errorMsg.value = t('contact.error.network')
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
        <div v-if="status === 'success'" role="status" aria-live="polite" class="rounded border border-line bg-bg p-10">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-paper">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 class="mt-5 text-2xl tracking-tight">{{ t('contact.success.title') }}</h2>
          <p class="mt-3 text-stone">{{ t('contact.success.body') }}</p>
          <button type="button" class="ulink mt-8" @click="status = 'idle'">{{ t('contact.success.again') }}</button>
        </div>

        <form v-else :action="endpoint" method="POST" class="space-y-6" @submit.prevent="submit">
          <div class="grid gap-6 sm:grid-cols-2">
            <label class="block">
              <span class="label">{{ t('contact.form.name') }}</span>
              <input v-model="form.name" name="name" type="text" required autocomplete="name" class="field" :placeholder="t('contact.form.namePh')" />
            </label>
            <label class="block">
              <span class="label">{{ t('contact.form.email') }}</span>
              <input v-model="form.email" name="email" type="email" required autocomplete="email" class="field" :placeholder="t('contact.form.emailPh')" />
            </label>
          </div>
          <div class="grid gap-6 sm:grid-cols-2">
            <label class="block">
              <span class="label">{{ t('contact.form.phone') }}</span>
              <input v-model="form.phone" name="phone" type="tel" autocomplete="tel" class="field" :placeholder="t('contact.form.phonePh')" />
            </label>
            <label class="block">
              <span class="label">{{ t('contact.form.material') }}</span>
              <select v-model="form.service" name="service" class="field">
                <option v-for="s in services" :key="s" :value="s">{{ t(`contact.services.${s}`) }}</option>
              </select>
            </label>
          </div>
          <label class="block">
            <span class="label">{{ t('contact.form.details') }}</span>
            <textarea v-model="form.message" name="message" rows="5" required class="field resize-none" :placeholder="t('contact.form.detailsPh')" />
          </label>

          <label class="flex items-start gap-3">
            <input v-model="form.consent" name="consent" type="checkbox" required class="mt-0.5 h-4 w-4 shrink-0 accent-accent" />
            <span class="text-sm leading-relaxed text-stone">
              {{ t('contact.form.consentPre') }}
              <NuxtLink :to="localePath('/privacy')" class="font-medium text-ink underline underline-offset-2 hover:opacity-60">{{ t('contact.form.consentLink') }}</NuxtLink>.
            </span>
          </label>

          <!-- Honeypot: Formspree discards submissions where _gotcha is filled -->
          <input v-model="form.gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

          <div v-if="status === 'error'" role="alert" aria-live="assertive" class="rounded border border-accent/40 bg-accent/5 p-4">
            <p class="text-sm font-medium text-ink">{{ errorMsg }}</p>
            <p class="mt-1 text-sm text-stone">
              {{ t('contact.error.fallback') }}
              <a :href="`tel:${site.phoneHref}`" class="font-medium text-ink underline underline-offset-2">{{ site.phone }}</a>
              ·
              <a :href="`mailto:${site.email}`" class="font-medium text-ink underline underline-offset-2">{{ site.email }}</a>
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-5">
            <button type="submit" class="btn-solid disabled:cursor-not-allowed disabled:opacity-60" :disabled="status === 'sending'">
              {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.send') }}
            </button>
            <p class="text-sm text-stone">{{ t('contact.form.note') }}</p>
          </div>
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
  @apply mt-2 w-full rounded border border-line bg-paper px-4 py-3 text-ink
         placeholder:text-stone-light transition-colors
         focus:border-ink focus:outline-none;
}
</style>
