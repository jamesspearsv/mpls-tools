<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  content: string
  visible: boolean
}>()

// TODO: Fix this hack!
// This component emits a timeout event that the parent can listen to
// that indicates when its visible state should change. This component
// should handle it visibility state internally
const emit = defineEmits<{ timeout: [] }>()
watch(props, () => {
  if (props.visible) {
    setTimeout(() => {
      emit('timeout')
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

  transition: all 250ms ease-in-out;
}

article.visible {
  top: 1rem;
}

article.visible::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 10px;
  background-color: var(--clr-accent);
  /*border-bottom-left-radius: var(--border-radius);*/
  /*border-bottom-right-radius: var(--border-radius);*/
  border-radius: var(--border-radius);

  transition: width 1400ms ease-in-out;

  @starting-style {
    width: 100%;
  }
}
</style>
