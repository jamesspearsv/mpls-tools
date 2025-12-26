<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// const start = ref(route.query.start || null)
// const end = ref(route.query.end || null)

const start = defineModel<string>('start')
const end = defineModel<string>('end')
const summary = ref()

// Save query state in current URL
watchEffect(async () => {
  router.replace({ name: 'summary', query: { start: start.value, end: end.value } })
})

// Fetch reference data from server
watchEffect(async () => {
  if (!start.value || !end.value) return (summary.value = '')
  if (start.value > end.value) return (summary.value = '') // TODO: Add UI feedback for this error

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
  <p>
    Query state: { start:
    <span>{{ start }}</span
    >, end: <span>{{ end }}</span> }
  </p>
  <p v-if="start && end">
    Date comparision:
    {{
      start === end ? 'Start and end same' : start < end ? 'Start before end' : 'Start after end'
    }}
  </p>

  <section>
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
  </section>

  <section>
    <pre>{{ summary }}</pre>
  </section>
</template>
