<script lang="ts" setup>
const start = defineModel<string>('start')
const end = defineModel<string>('end')

function handleReset() {
  start.value = ''
  end.value = ''
}
</script>

<template>
  <form @reset.prevent>
    <div>
      <label for="start">Starting Date</label>
      <input type="date" name="start" v-model="start" />
    </div>
    <div>
      <label for="end">Ending Date</label>
      <input type="date" v-model="end" />
    </div>
    <button type="reset" @click.prevent="handleReset" :disabled="!start && !end">Reset</button>
  </form>
</template>
<style scoped>
button[disabled] {
  cursor: not-allowed;
}

label {
  margin-bottom: 0.5rem;
}
</style>
