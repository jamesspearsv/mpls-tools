import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'libstats', component: () => import('@/layouts/LibStats.vue') },
    {
      path: '/checkout',
      component: () => import('@/layouts/OfflineCirculation.vue'),
      children: [
        { path: '', name: 'checkout', component: () => import('@/views/CheckoutView.vue') },
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
