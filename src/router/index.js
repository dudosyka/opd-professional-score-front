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
import SimpleColourGame from "@/views/client/games/Color/SimpleColorGame.vue";
import GameResult from "@/views/client/games/GameResult.vue";
import SimpleSoundGame from "@/views/client/games/Sound/SimpleSoundGame.vue";
import HardSoundGame from "@/views/client/games/Sound/HardSoundGame.vue";
import HardColorGame from "@/views/client/games/Color/HardColorGame.vue";
import HardNumberGame from "@/views/client/games/Number/HardNumberGame.vue";
import SimpleRDO from "@/views/client/games/Rdo/RdoComponent.vue";
import SimpleRDOGame from "@/views/client/games/Rdo/SimpleRDOGame.vue";
import HardRDOGame from "@/views/client/games/Rdo/HardRDOGame.vue";
import WatchingPursuitGame from "@/views/client/games/Mouse/WatchingPursuitGame.vue";
import WatchingAnalogGame from "@/views/client/games/Mouse/WatchingAnalogGame.vue";
import GamesResolver from "@/views/client/games/GamesResolver.vue";
import CriteriaList from "@/views/admin/criteria/CriteriaList.vue";
import CreateCriteria from "@/views/admin/criteria/CreateCriteria.vue";
import UpdatePvkCriteria from "@/views/admin/pvk/UpdatePvkCriteria.vue";
import RateUserView from "@/views/admin/user/RateUserView.vue";
import ResultAnalysisView from "@/views/client/ResultAnalysisView.vue";

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
    path: '/user/:userId/rate',
    name: 'User rate component',
    component: RateUserView,
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
  {
    path: '/pvk/edit',
    name: 'PVK update criteria',
    component: UpdatePvkCriteria,
    meta: { needAuth: true },
  },

    //----------------- Client part -----------------//
  {
    path: '/',
    name: 'Client main',
    component: HomeView,
    meta: { needAuth: true, adminPart: false }
  },
  {
    path: '/client/results/analysis',
    name: 'Client main',
    component: ResultAnalysisView,
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
    path: '/game/:id',
    name: "Unified games view",
    component: GamesResolver,
    meta: { needAuth: true, adminPart: false, game: true }
  },
  {
    path: '/game/results',
    name: "Unified game results window",
    component: GameResult,
    meta: { needAuth: true, adminPart: false, game: true, gameRes: true }
  },
  
  //Criteria
  {
    path: "/criteria/list",
    name: "Criteria list",
    component: CriteriaList,
    meta: { needAuth: true, adminPart: true }
  },
  {
    path: "/criteria/create",
    name: "Create criteria",
    component: CreateCriteria,
    meta: { needAuth: true, adminPart: true }
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
