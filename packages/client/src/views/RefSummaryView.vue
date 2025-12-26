<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// const start = ref(route.query.start || null)
// const end = ref(route.query.end || null)

const start = defineModel<string>('start')
const end = defineModel<string>('end')

watchEffect(() => {
  router.replace({ name: 'summary', query: { start: start.value, end: end.value } })
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
    >, end: <span>{{ end }}</span
    >}
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
</template>
