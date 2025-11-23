<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'jump-css'
import ModuleSwitcher from './components/ModuleSwitcher.vue'
import router from './router'

const path = router.currentRoute.value
</script>

<template>
  <p>{{ path }}</p>
  <RouterView />
  <div class="switcher_container">
    <ModuleSwitcher />
  </div>
</template>

<style lang="css" scoped>
.switcher_container {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}
</style>
