<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// const start = ref(route.query.start || null)
// const end = ref(route.query.end || null)

const start = defineModel<string>('start')
const end = defineModel<string>('end')

/* TODO: fix navigation bug below.
When models are defined the watcher is fired and resets navigation history.
Read more about Vue scope. https://michaelnthiessen.com/levels-of-vue-scope
*/
watchEffect(() => {
  router.push({ name: 'summary', query: { start: start.value, end: end.value } })
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
