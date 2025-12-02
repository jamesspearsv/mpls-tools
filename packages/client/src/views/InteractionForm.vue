<script setup lang="ts">
import { INTERACTION_TYPES } from '@packages/common'
</script>

<template>
  <main>
    <div v-for="type in INTERACTION_TYPES" :key="type" class="type">
      <label>
        <input type="radio" :value="type" name="interaction_type" />
        <span>{{ type }}</span>
      </label>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
}

div.type {
  width: 50%;
  height: 50px;
}

input[type='radio'] {
  appearance: none;
  transition: all 200ms ease-in-out;
}

input[type='radio']:checked {
  background-color: red;
}
</style>
