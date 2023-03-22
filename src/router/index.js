import { createRouter, createWebHistory } from 'vue-router'

import ProfessionView from "@/views/admin/prof/ProfessionListView.vue";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/admin/MainView.vue";
import { default as MainViewClient } from "@/views/client/MainView.vue"
import AddExpertView from "@/views/admin/expert/ManageExpertView.vue";
import ExpertListView from "@/views/admin/expert/ExpertListView.vue";
import ChoiseView from "@/views/admin/prof/ChoiseView.vue";
import ProfessionCreateView from "@/views/admin/prof/ManageProfessionView.vue";
import AssessmentResult from "@/views/admin/prof/AssessmentResult.vue";
import AllPvkView from "@/views/admin/prof/AllPvkView.vue";
import SignUpView from "@/views/SignUpView.vue";
import TestsView from "@/views/client/TestsView.vue";
import AvailableTestsView from "@/views/client/AvailableTestsView.vue";
import TestResultsView from "@/views/client/TestResultsView.vue";
import UserListView from "@/views/admin/user/UserListView.vue";
import UserAvailableTests from "@/views/admin/user/UserAvailableTests.vue";
import AddAvailableTest from "@/views/admin/test/AddAvailableTest.vue";
import AllTestListView from "@/views/admin/test/AllTestListView.vue";
import PassedTestListView from "@/views/admin/test/PassedTestListView.vue";
import TestDynamicView from "@/views/admin/test/TestDynamicView.vue";
import OneTestResultView from "@/views/admin/test/OneTestResultView.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/auth',
    name: 'Login',
    component: LoginView,
    meta: { needAuth: false }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView,
    meta: { needAuth: false }
  },
  {
    path: '/profession',
    name: 'profession',
    component: ProfessionView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/profession/add',
    name: 'profession create',
    component: ProfessionCreateView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/expert/add',
    name: 'expert create',
    component: AddExpertView,
    meta: {needAuth: true, adminPart: true }
  },
  {
    path: '/expert',
    name: 'expert list',
    component: ExpertListView,
    meta: {needAuth: true, adminPart: true }
  },
  {
    path: '/user',
    name: "Simple users list",
    component: UserListView,
    meta: {needAuth: true, adminPart: true}
  },
  {
    path: '/user/:userId/available',
    name: 'Simple user available test list',
    component: UserAvailableTests,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/user/:userId/available/add/first',
    name: 'Simple user available test add',
    component: AllTestListView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/user/:userId/available/add/sec',
    name: 'Simple user available test add sec',
    component: AddAvailableTest,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/user/:userId/passed',
    name: 'Simple user passed test list',
    component: PassedTestListView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/user/:userId/passed/:testId',
    name: 'Simple user passed test dynamic',
    component: TestDynamicView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/user/passed/:userTestId',
    name: 'Simple user passed test one instance',
    component: OneTestResultView,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: '/assessment/ranking',
    name: 'Assessment ranking',
    component: ChoiseView,
    meta: {needAuth: true, adminPart: true }
  },
  {
    path: '/assessment/choose',
    name: 'Choose pvk',
    component: AllPvkView,
    meta: {needAuth: true, adminPart: true }
  },
  {
    path: '/assessment/results',
    name: 'Assessment result',
    component: AssessmentResult,
    meta: { needAuth: true, adminPart: true }
  },

    //----------------- Client part -----------------//
  {
    path: '/client',
    name: 'Client main',
    component: MainViewClient,
    meta: { needAuth: true, adminPart: false }
  },
  {
    path: '/client/tests',
    name: 'Available test list',
    component: AvailableTestsView,
    meta: { needAuth: true, adminPart: false }
  },
  {
    path: '/client/tests/passed',
    name: 'Passed test list',
    component: TestsView,
    meta: { needAuth: true, adminPart: false }
  },
  {
    path: '/client/tests/passed/:testId',
    name: 'stats of one of the passed test type',
    component: TestResultsView,
    meta: { needAuth: true, adminPart: false }
  },
  {
    path: '/client/passed/:userTestId',
    name: 'stats of one test',
    component: OneTestResultView,
    meta: { needAuth: true, adminPart: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const curRole = parseInt(localStorage.getItem('role'));
  const curToken = localStorage.getItem('token');
  if (to.meta.needAuth && !curToken) {
    return {
      path: '/auth'
    }
  }

  if (!to.meta.needAuth && curToken) {
    return {
      path: (curRole == 2 || curRole == 1) ? '/' : '/client'
    }
  }

  if (to.meta.adminPart && curRole != 2 && curRole != 1) {
    return {
      path: '/client'
    }
  }

  if (!to.meta.adminPart && (curRole == 2 || curRole == 1)) {
    return {
      path: '/'
    }
  }

})


export default router
