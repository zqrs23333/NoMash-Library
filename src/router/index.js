import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    // 例如：检查用户是否已登录
    const isAuthenticated = false; // 这里假设用户未登录
    if (to.name !== 'Home' && !isAuthenticated) {
      // 如果用户未登录并试图访问非首页，重定向到首页
      next({ name: 'Home' });
    } else {
      next(); // 允许导航
    }
  });
export default router