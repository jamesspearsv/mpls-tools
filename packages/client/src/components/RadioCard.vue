<script lang="ts" setup>
import type { InteractionTypes } from '@packages/common';
import type { icons } from 'feather-icons';
import FeatherIcon from './FeatherIcon.vue';

defineProps<{
  groupName: string
  value: InteractionTypes
}>()

const icon_map = {
  'Known Item Request': 'book',
  'Information Services': 'info',
  'Tech Help': 'cpu',
  'Digital Resources': 'smartphone',
} satisfies {
  [K in InteractionTypes]: keyof typeof icons
}

// todo: define emit events
</script>

<template>
  <article class="radio-card">
    <label>
      <FeatherIcon :icon="icon_map[value]" /> <span>{{ value }}</span></label
    >
    <input type="radio" :value="value" name="interaction_type" />
  </article>
</template>

<style lang="css" scoped>
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
