<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'jump-css'
</script>

<template>
  <RouterView />
</template>

<style scoped>
nav {
  height: var(--sp-4);
  padding-inline: var(--sp-3);
}

nav a {
  color: var(--pico-secondary);
}

nav a.router-link-active {
  color: var(--pico-color);
}
</style>
