<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// TODO: Improve the components timeout logic
// It should appear visible when the props component changes
// and hide when the timout fires

const props = defineProps<{ content: string }>()
const visible = ref(false)

// Add timeout logic to toast
watch(props, () => {
  // If the new props.content value is truthy
  // and the component is timed out then
  // set the time out to false, setTimeout function
  if (props.content) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 1500)
  }
})
</script>
<template>
  <article :class="visible && 'visible'">{{ content }}</article>
</template>

<style scoped>
article {
  position: absolute;
  /*width: 10%;*/
  left: 35%;
  right: 35%;
  top: -10rem;

  transition: all 200ms ease-in-out;
}

article.visible {
  top: 1rem;
}
</style>
