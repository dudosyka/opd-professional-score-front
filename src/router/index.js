import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from "@/components/LoginForm.vue";
import ProfessionView from "@/views/ProfessionView.vue";
import MainPage from "@/components/MainPage.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
    meta: { needAuth: true }
  },
  {
    path: '/auth',
    name: 'Login',
    component: LoginForm,
    meta: { needAuth: false }
  },
  {
    path: '/profession',
    name: 'profession',
    component: ProfessionView,
    meta: { needAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.meta.needAuth && !localStorage.getItem('token')) {
    return {
      path: '/auth'
    }
  }

  if (!to.meta.needAuth && localStorage.getItem('token')) {
    return {
      path: '/'
    }
  }
})


export default router
