<template>
  <div class="flex min-h-screen flex-col pb-14 md:pb-0">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <MobileCtaBar />
  </div>
</template>
