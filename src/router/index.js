import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/Register.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import HomeView from '../views/HomeView.vue'
import ManageView from '../views/ManageView.vue'

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
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
  },
  {
    path: '/manager',   // 新的路由路径
    name: 'Manager',
    component: ManageView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  // 定义可以未登录访问的路由名称列表
  const publicPages = ['Login', 'Register','Home','Manager']

  if (!isAuthenticated && !publicPages.includes(to.name)) {
    // 如果用户未登录且尝试访问非公开页面，重定向到登录页面
    next('/')
  } else {
    // 否则允许访问
    next()
  }
})
export default router