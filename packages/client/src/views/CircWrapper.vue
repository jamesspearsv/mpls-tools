<template>
  <main>
    <nav>
      <ul>
        <li><RouterLink :to="{ name: 'checkout' }">Checkout</RouterLink></li>
        <li><RouterLink :to="{ name: 'sync' }">Sync</RouterLink></li>
      </ul>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped></style>
