<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

const props = defineProps<{
  path: string
}>()

const detailsElement = useTemplateRef('detailsElement')

watch(
  () => props.path,
  () => {
    if (detailsElement.value && detailsElement.value.open) {
      detailsElement.value.open = false
    }
  },
)
</script>

<template>
  <article>
    <details ref="detailsElement">
      <summary>
        {{ props.path.includes('/checkout') ? 'Offline Circulation' : 'LibStats' }}
      </summary>
      <ul>
        <li>
          <router-link :to="{ name: 'libstats' }">LibStats</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'offline-circ' }">Offline Circulation</router-link>
        </li>
      </ul>
    </details>
  </article>
</template>

<style scoped>
article {
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  overflow: hidden;

  transition: all 150ms ease-in-out;
  height: 42px;
}

article:has(details:open),
article:has(details[open]) {
  height: 112px;
}

details {
  min-width: 25dvw;
}

ul {
  list-style: none;
}

li {
  margin-top: 0.25rem;
}

a {
  color: var(--clr-main-400);
}

li:not(:last-child) {
  margin-bottom: 0.25rem;
}
</style>
