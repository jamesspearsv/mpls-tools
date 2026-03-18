<script setup lang="ts">
import type { InteractionType, RefSummary } from '@packages/common'
import FeatherIcon from './FeatherIcon.vue'
import { icon_map } from '@/lib/constants'
import { computed } from 'vue'
import ChartComponent from './ChartComponent.vue'

const { summary } = defineProps<{
  summary: RefSummary | null
  start?: string
  end?: string
}>()

const total = computed(() => {
  if (!summary) return 0
  return Object.entries(summary).reduce((t, entry) => t + entry[1].data, 0)
})
</script>

<template>
  <template v-if="summary">
    <section>
      <p>{{ total }} total transaction<span v-if="total > 1">s</span></p>
    </section>
    <section>
      <article v-for="record in summary" :key="record.label">
        <FeatherIcon :icon="icon_map[record.label as InteractionType]" />
        <p>{{ record.label }}</p>
        <p>{{ record.data }}</p>
      </article>
    </section>
    <section>
      <ChartComponent label="label" :data="0" />
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
