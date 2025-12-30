<script lang="ts" setup>
import RefSummaryInfo from '@/components/RefSummaryInfo.vue'
import RefSummarySidebar from '@/components/RefSummarySidebar.vue'
import type { RefSummary } from '@packages/common'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const start = defineModel<string>('start')
const end = defineModel<string>('end')
const summary = ref<RefSummary | null>(null)

// Save query state in current URL
watchEffect(async () => {
  router.replace({ name: 'summary', query: { start: start.value, end: end.value } })
})

// Fetch reference data from server
watchEffect(async () => {
  // TODO: Improve the flow of this logic.
  // 1. Check is date range is selected; if not return
  // 2. Check that start <= end; if not return error
  // 3. Format query URL
  // 4. Handle request and store summary in state
  if (!start.value || !end.value) return (summary.value = null)
  if (start.value > end.value) return (summary.value = null)

  const res = await fetch(`/libstats/interactions?start=${start.value}&end=${end.value}`)
  const json = await res.json()

  summary.value = json
})

onMounted(() => {
  const query = route.query
  if (query.start && typeof query.start === 'string') start.value = query.start
  if (query.end && typeof query.end === 'string') end.value = query.end
})
</script>

<template>
  <div>
    <aside class="rounded bordered">
      <RefSummarySidebar v-model:start="start" v-model:end="end" />
    </aside>
    <main>
      <RefSummaryInfo :summary="summary" :start="start" :end="end" />
    </main>
  </div>
</template>

<style scoped>
div {
  gap: 2rem;

  /*position: absolute;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 1rem;*/
}

aside {
  position: relative;
  margin-top: 2rem;
  padding: 1rem;
}

/*aside::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1rem;
  width: 2px;
  height: 100%;
  background-color: var(--clr-bg-alt);
}*/
</style>
