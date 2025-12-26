import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'libstats' } },
    {
      path: '/ref',
      component: () => import('@/layouts/LibStatsLayout.vue'),
      children: [
        { path: '', name: 'libstats', component: () => import('@/views/InteractionForm.vue') },
        { path: 'summary', name: 'summary', component: () => import('@/views/RefSummaryView.vue') },
      ],
    },
    {
      path: '/checkout',
      redirect: { name: 'checkout' },
      component: () => import('@/layouts/OfflineCircLayout.vue'),
      children: [
        { path: '', name: 'offline-circ', component: () => import('@/views/CheckoutView.vue') },
        { path: 'sync', name: 'sync', component: () => import('@/views/SyncView.vue') },
      ],
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})
