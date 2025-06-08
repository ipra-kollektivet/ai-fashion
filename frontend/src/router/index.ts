import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Guest from '../views/Guest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/guest',
      name: 'Guest',
      component: Guest,
      meta: { requiresGuest: false },
    },
    // Redirect unknown routes to guest page
    {
      path: '/:pathMatch(.*)*',
      redirect: '/guest',
    },
  ],
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/guest');
    return;
  }

  // If route is for guests only and user is authenticated
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/');
    return;
  }

  // Otherwise, proceed
  next();
});

export default router;
