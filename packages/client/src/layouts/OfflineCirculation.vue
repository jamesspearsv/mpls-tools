<script setup lang="ts">
import type { InteractionTypes } from '@packages/common'
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink :to="{ name: 'checkout' }">Checkout</RouterLink></li>
      <li><RouterLink :to="{ name: 'sync' }">Sync</RouterLink></li>
    </ul>
  </nav>
  <RouterView />
</template>
