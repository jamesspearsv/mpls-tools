<script setup lang="ts">
import FeatherIcon from '@/components/FeatherIcon.vue'
import RadioCard from '@/components/RadioCard.vue'
import { INTERACTION_TYPES, type InteractionTypes } from '@packages/common'
import { ref } from 'vue'

const selected_type = ref<InteractionTypes | null>(null)

function handleRadioChange(value: InteractionTypes) {
  console.log('selected value', value)
  selected_type.value = value
}

function handleReset() {
  selected_type.value = null
}

async function handleSubmit() {
  if (selected_type.value) {
    const submissionUrl = '/libstats/interactions'

    await fetch(submissionUrl, {
      method: 'POST',
      body: JSON.stringify({
        type: selected_type.value,
      }),
    })
  }
}
</script>

<template>
  <p>Selected type is {{ selected_type ?? 'null' }}</p>
  <main>
    <section class="radio-section">
      <RadioCard
        @change="handleRadioChange"
        v-for="type in INTERACTION_TYPES"
        :key="type"
        group-name="interation_types"
        :value="type"
        :selected="selected_type === type"
      />
    </section>
    <section class="button-section">
      <button class="form-button" type="reset" @click="handleReset">
        <span><FeatherIcon icon="rotate-ccw" /></span>
        Reset
      </button>
      <button class="form-button" @click="async () => await handleSubmit()">
        <span><FeatherIcon icon="check-square" /></span>
        Submit
      </button>
    </section>
  </main>
</template>

<style scoped>
.radio-section {
  margin-top: 25dvh;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.button-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.form-button {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
</style>
