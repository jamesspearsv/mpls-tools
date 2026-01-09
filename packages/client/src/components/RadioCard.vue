<script lang="ts" setup>
import type { InteractionType } from '@packages/common'
import FeatherIcon from './FeatherIcon.vue'
import { icon_map } from '@/lib/constants'

const props = defineProps<{
  groupName: string
  value: InteractionType
  selected: boolean
}>()

const emit = defineEmits<{ change: [typeof props.value] }>()

function handleRadioChange() {
  emit('change', props.value)
}
</script>

<template>
  <article class="radio-card">
    <label>
      <FeatherIcon :icon="icon_map[value]" />
      <span>{{ value }}</span>
    </label>
    <input
      type="radio"
      name="interaction_type"
      :value="props.value"
      :checked="props.selected"
      @change="handleRadioChange"
    />
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
