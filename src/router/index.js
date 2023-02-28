import { createRouter, createWebHistory } from 'vue-router'

import LoginView from "@/views/LoginView.vue";
import ProfessionView from "@/views/ProfessionListView.vue";
import MainView from "@/views/MainView.vue";
import AddExpertView from "@/views/AddExpertView.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    meta: { needAuth: true }
  },
  {
    path: '/auth',
    name: 'Login',
    component: LoginView,
    meta: { needAuth: false }
  },
  {
    path: '/profession',
    name: 'profession',
    component: ProfessionView,
    meta: { needAuth: true }
  },
  {
    path: '/expert',
    name: 'expert',
    component: AddExpertView,
    meta: {needAuth: true}
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
