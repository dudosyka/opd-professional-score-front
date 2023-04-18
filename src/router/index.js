import { createRouter, createWebHistory } from 'vue-router'

import ProfessionView from "@/views/ProfessionListView.vue";
import LoginView from "@/views/LoginView.vue";
import AddExpertView from "@/views/admin/expert/ManageExpertView.vue";
import ExpertListView from "@/views/admin/expert/ExpertListView.vue";
import ChoiseView from "@/views/admin/prof/ChoiseView.vue";
import ProfessionCreateView from "@/views/admin/prof/ManageProfessionView.vue";
import AssessmentResult from "@/views/AssessmentResult.vue";
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
import HomeView from "@/views/HomeView.vue";
import SelectPvkView from "@/views/admin/prof/SelectPvkView.vue";
import AllPvkView from "@/views/AllPvkView.vue";
import SimpleColourGame from "@/views/client/games/SimpleColorGame.vue";
import GameResult from "@/views/client/games/GameResult.vue";
import SimpleSoundGame from "@/views/client/games/SimpleSoundGame.vue";
import HardSoundGame from "@/views/client/games/HardSoundGame.vue";
import HardColorGame from "@/views/client/games/HardColorGame.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: HomeView,
    meta: { needAuth: false }
  },
  {
    path: '/auth',
    name: 'Login',
    component: LoginView,
    meta: { needAuth: false, blockedForAuthorized: true, hideMenu: true }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView,
    meta: { needAuth: false, blockedForAuthorized: true, hideMenu: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: {
      created() {
        localStorage.removeItem("token");
        localStorage.removeItem('role');
        window.location = '/'
      }
    },
    meta: { needAuth: true }
  },
  {
    path: '/profession',
    name: 'profession',
    component: ProfessionView,
    meta: { needAuth: false }
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
    component: SelectPvkView,
    meta: {needAuth: true, adminPart: true }
  },
  {
    path: '/assessment/results',
    name: 'Assessment result',
    component: AssessmentResult,
    meta: { needAuth: false }
  },
  {
    path: '/pvk',
    name: 'PVK list',
    component: AllPvkView,
    meta: { needAuth: false },
  },

    //----------------- Client part -----------------//
  {
    path: '/',
    name: 'Client main',
    component: HomeView,
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
  },
  
  //games
  {
    path: '/game/1',
    name: "Game 1",
    component: SimpleColourGame,
    meta: { needAuth: true, adminPart: false, game: true }
  },
  {
    path: '/game/2',
    name: "Game 2",
    component: SimpleSoundGame,
    meta: { needAuth: true, adminPart: false, game: true }
  },
  {
    path: '/game/3',
    name: "Game 3",
    component: HardColorGame,
    meta: { needAuth: true, adminPart: false, game: true }
  },
  {
    path: '/game/4',
    name: "Game 4",
    component: HardSoundGame,
    meta: { needAuth: true, adminPart: false, game: true }
  },
  {
    path: '/game/results',
    name: "Unified game results window",
    component: GameResult,
    meta: { needAuth: true, adminPart: false, game: true, gameRes: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {;
  const curToken = localStorage.getItem('token');
  if (to.meta.needAuth && !curToken) {
    return {
      path: '/auth'
    }
  }

  if (to.meta.blockedForAuthorized && curToken) {
    return '/'
  }
})


export default router
