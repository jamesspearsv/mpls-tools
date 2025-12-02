<script setup lang="ts">
import RadioCard from '@/components/RadioCard.vue'
import { INTERACTION_TYPES } from '@packages/common'

// todo: add state tracking and submission
</script>

<template>
  <main>
    <RadioCard
      v-for="type in INTERACTION_TYPES"
      :key="type"
      group-name="interation_types"
      :value="type"
    />
    <button>Submit</button>
  </main>
</template>

<style scoped>
main {
  margin-top: 25dvh;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
</style>
