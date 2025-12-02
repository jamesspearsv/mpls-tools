<script setup lang="ts">
import FeatherIcon from '@/components/FeatherIcon.vue'
import { INTERACTION_TYPES } from '@packages/common'
</script>

<template>
  <main>
    <article v-for="type in INTERACTION_TYPES" :key="type" class="radio-card">
      <label>
        <FeatherIcon icon="cpu" /> <span>{{ type }}</span></label
      >
      <input type="radio" :value="type" name="interaction_type" />
    </article>
    <button>Submit</button>
  </main>
</template>

<style scoped>
main {
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.radio-card {
  width: 45%;
  height: 120px;

  position: relative;
  text-align: center;
}

.radio-card:has(input[type='radio']:checked) {
  background-color: var(--clr-accent);
  border-color: var(--clr-accent);
  color: var(--clr-light);

  transition-property: background-color, opacity, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

input[type='radio'] {
  appearance: none;
  opacity: 0;
  cursor: pointer;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
