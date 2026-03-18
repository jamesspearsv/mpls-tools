<script setup lang="ts">
import { onWatcherCleanup, useTemplateRef, watchEffect } from 'vue'
import Chart from 'chart.js/auto'

const chart_container = useTemplateRef('chart-container')

const { labels, data } = defineProps<{
  labels: string[]
  data: number[]
}>()

watchEffect(() => {
  if (!chart_container.value) return

  const container = chart_container.value
  const chart = document.createElement('canvas')
  container.appendChild(chart)

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Interactions recorded', data }],
    },
  })

  // Remove chart when data changes
  onWatcherCleanup(() => {
    if (chart_container.value) {
      chart_container.value.removeChild(chart_container.value.lastChild!)
    }
  })
})
</script>

<template>
  <section>
    <div ref="chart-container"></div>
  </section>
</template>
