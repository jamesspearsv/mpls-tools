<script setup lang="ts">
defineProps<{
  label: string
  data: number
}>()
</script>

<template>
  <canvas id="chart"></canvas>
</template>
