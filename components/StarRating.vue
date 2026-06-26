<script setup lang="ts">
defineProps<{ rating: number }>()
</script>

<template>
  <div class="flex items-center gap-1" :aria-label="`${rating} out of 5 stars`">
    <svg v-for="i in 5" :key="i" width="13" height="13" viewBox="0 0 24 24"
      :fill="i <= rating ? '#141414' : 'none'" stroke="#141414" stroke-width="1.5">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.9 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
    </svg>
  </div>
</template>
