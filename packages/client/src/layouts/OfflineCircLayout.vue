<template>
  <nav>
    <ul>
      <li><RouterLink :to="{ name: 'offline-circ' }">Checkout</RouterLink></li>
      <li><RouterLink :to="{ name: 'sync' }">Sync</RouterLink></li>
    </ul>
  </nav>
  <RouterView />
</template>
