import { createRouter, createWebHistory } from 'vue-router'

import ProfessionView from "@/views/ProfessionListView.vue";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import AddExpertView from "@/views/AddExpertView.vue";
import ExpertListView from "@/views/ExpertListView.vue";
import ChoiseView from "@/views/ChoiseView.vue";
import ProfessionCreateView from "@/views/ProfessionCreateView.vue";
import AssessmentList from "@/views/AssessmentResult.vue";
import AssessmentResult from "@/views/AssessmentResult.vue";
import AllPvkView from "@/views/AllPvkView.vue";

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
    path: '/profession/add',
    name: 'profession create',
    component: ProfessionCreateView,
    meta: { needAuth: true }
  },
  {
    path: '/assessment/results',
    name: 'Assessment result',
    component: AssessmentResult,
    meta: { needAuth: true }
  },
  {
    path: '/expert',
    name: 'expert',
    component: AddExpertView,
    meta: {needAuth: true}
  },
  {
    path: '/expertlist',
    name: 'expertlist',
    component: ExpertListView,
    meta: {needAuth: true}
  },
  {
    path: '/choise',
    name: 'choise',
    component: ChoiseView,
    meta: {needAuth: true}
  },
  {
    path: '/allpvk',
    name: 'allpvk',
    component: AllPvkView,
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
