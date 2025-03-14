import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashBoard from '@/views/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: RegisterPage },
    { path: "/login", component: LoginPage },
    { path: "/dashboard", component: DashBoard },
    {path: "/roadmap/:id", component: () => import("@/views/RoadmapPage.vue")},
  ],
})

export default router
