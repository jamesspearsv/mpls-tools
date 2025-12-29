<script lang="ts" setup>
import RefSummarySidebar from '@/components/RefSummarySidebar.vue'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const start = defineModel<string>('start')
const end = defineModel<string>('end')
const summary = ref()

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
  if (!start.value || !end.value) return (summary.value = '')
  if (start.value > end.value) return (summary.value = 'Start date must be before end date')

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
    <RefSummarySidebar v-model:start="start" v-model:end="end" />
    <main>
      <!-- <section>
        <form>
          <div>
            <label for="start">Starting Date</label>
            <input type="date" name="start" v-model="start" />
          </div>
          <div>
            <label for="end">Ending Date</label>
            <input type="date" v-model="end" />
          </div>
        </form>
      </section> -->
      <section>
        <pre>{{ summary }}</pre>
      </section>
    </main>
  </div>
</template>
