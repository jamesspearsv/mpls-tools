<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'jump-css'
import ModuleSwitcher from './components/ModuleSwitcher.vue'
</script>

<template>
  <RouterView />
  <div class="switcher_container">
    <ModuleSwitcher :path="$route.path" />
  </div>
</template>

<style lang="css" scoped>
.switcher_container {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}
</style>
