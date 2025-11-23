<script setup lang="ts">

</script>

<template>
  <details>
    <summary>Module</summary>
    <ul>
      <li>
        <router-link :to="{ name: 'libstats' }">LibStats</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'checkout' }">Offline Circulation</router-link>
      </li>
    </ul>
  </details>
</template>
