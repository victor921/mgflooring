<script setup lang="ts">
const site = useSite()

// Global structured data — LocalBusiness for strong local SEO
useStructuredData(localBusinessNode())

// Per-locale <html lang> + hreflang alternate links (good for multilingual SEO)
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))

useHead({
  titleTemplate: (title) =>
    !title || title.includes(site.name) ? title || site.name : `${title} · ${site.name}`,
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
