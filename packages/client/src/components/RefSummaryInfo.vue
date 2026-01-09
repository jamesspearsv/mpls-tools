<script setup lang="ts">
import type { InteractionType, RefSummary } from '@packages/common'
import FeatherIcon from './FeatherIcon.vue'
import { icon_map } from '@/lib/constants'

defineProps<{
  summary: RefSummary | null
  start?: string
  end?: string
}>()
</script>

<template>
  <template v-if="summary">
    <section>
      <article article v-for="entry in Object.entries(summary)" :key="entry[0]">
        <FeatherIcon :icon="icon_map[entry[0] as InteractionType]" />
        <p>{{ entry[0] }}</p>
        <p>{{ entry[1] }}</p>
      </article>
    </section>
  </template>
  <template v-else>
    <p class="empty_text">Wow, such empty</p>
  </template>
</template>

<style scoped>
article {
  width: max(250px, 48%);
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.empty_text {
  text-align: center;
}
</style>
