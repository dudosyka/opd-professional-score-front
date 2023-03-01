import { createRouter, createWebHistory } from 'vue-router'

import ProfessionView from "@/views/ProfessionListView.vue";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import AddExpertView from "@/views/ManageExpertView.vue";
import ExpertListView from "@/views/ExpertListView.vue";
import ChoiseView from "@/views/ChoiseView.vue";
import ProfessionCreateView from "@/views/ManageProfessionView.vue";
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
    path: '/expert/add',
    name: 'expert create',
    component: AddExpertView,
    meta: {needAuth: true}
  },
  {
    path: '/expert',
    name: 'expert list',
    component: ExpertListView,
    meta: {needAuth: true}
  },
  {
    path: '/assessment/ranking',
    name: 'Assessment ranking',
    component: ChoiseView,
    meta: {needAuth: true}
  },
  {
    path: '/assessment/choose',
    name: 'Choose pvk',
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
