<template>
  <nav>
    <ul>
      <li><RouterLink :to="{ name: 'checkout' }">Checkout</RouterLink></li>
      <li><RouterLink :to="{ name: 'sync' }">Sync</RouterLink></li>
    </ul>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  border-bottom: solid 1px;
}
</style>
