import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashBoard from '@/views/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
  { path: "/dashboard", component: DashBoard },
  ],
})

export default router
