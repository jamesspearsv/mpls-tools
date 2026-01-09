<script setup lang="ts">
import { useTemplateRef } from 'vue'
import FeatherIcon from './FeatherIcon.vue'

const modal = useTemplateRef<HTMLDialogElement>('modal')

function toggleModalState() {
  if (!modal.value) return

  if (!modal.value.open) {
    modal.value.showModal()
  } else {
    modal.value.close()
  }
}
</script>

<template>
  <!-- Model button -->
  <button class="help-button" @click="toggleModalState">
    <FeatherIcon icon="help-circle" />
  </button>

  <!-- Modal markup -->
  <dialog ref="modal">
    <article>
      <slot />
      <button type="reset" @click="toggleModalState" />
    </article>
  </dialog>
</template>

<style scoped>
.help-button {
  background-color: var(--clr-bg-alt);
  color: var(--clr-text);
}
</style>
