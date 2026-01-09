<template>
  <nav>
    <ul>
      <li><RouterLink :to="{ name: 'libstats' }">Record</RouterLink></li>
      <li><RouterLink :to="{ name: 'summary' }">Summary</RouterLink></li>
    </ul>
  </nav>
  <RouterView />
</template>
