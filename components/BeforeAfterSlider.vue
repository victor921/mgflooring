<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    before: string
    after: string
    alt?: string
    ratio?: string
  }>(),
  { alt: 'Stone transformation', ratio: 'aspect-[16/10]' },
)

const { t } = useI18n()
const pos = ref(50)
const wrap = ref<HTMLElement | null>(null)
const dragging = ref(false)

const setFromClientX = (clientX: number) => {
  const el = wrap.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  pos.value = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
}
const onDown = (e: PointerEvent) => {
  dragging.value = true
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  setFromClientX(e.clientX)
}
const onMove = (e: PointerEvent) => dragging.value && setFromClientX(e.clientX)
const onUp = () => (dragging.value = false)
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') pos.value = Math.max(0, pos.value - 4)
  if (e.key === 'ArrowRight') pos.value = Math.min(100, pos.value + 4)
}
</script>

<template>
  <div
    ref="wrap"
    :class="['group relative w-full select-none overflow-hidden bg-bg', ratio]"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointerleave="onUp"
  >
    <!-- After -->
    <img :src="after" :alt="`${alt} — after`" draggable="false" loading="lazy"
      class="absolute inset-0 h-full w-full object-cover" />
    <span class="absolute right-4 top-4 bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-label text-paper">{{ t('common.after') }}</span>

    <!-- Before (clipped) -->
    <div class="absolute inset-0 overflow-hidden" :style="{ width: pos + '%' }">
      <img :src="before" :alt="`${alt} — before`" draggable="false" loading="lazy"
        class="absolute inset-0 h-full w-full max-w-none object-cover"
        :style="{ width: wrap?.clientWidth ? wrap.clientWidth + 'px' : '100%' }" />
      <span class="absolute left-4 top-4 bg-paper px-2.5 py-1 text-[10px] font-medium uppercase tracking-label text-ink">{{ t('common.before') }}</span>
    </div>

    <!-- Handle -->
    <div class="absolute inset-y-0 w-px bg-paper" :style="{ left: pos + '%' }">
      <button
        type="button" role="slider"
        :aria-valuenow="Math.round(pos)" aria-valuemin="0" aria-valuemax="100"
        aria-label="Reveal before and after"
        class="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize
               place-items-center border border-ink bg-paper text-ink
               focus:outline-none focus-visible:bg-ink focus-visible:text-paper"
        @pointerdown="onDown" @keydown="onKey"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 7l-5 5 5 5" /><path d="M15 7l5 5-5 5" />
        </svg>
      </button>
    </div>
  </div>
</template>
