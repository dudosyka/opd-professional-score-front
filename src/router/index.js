import { createRouter, createWebHistory } from 'vue-router'

// import LoginForm from "@/views/LoginView.vue";
import MainPage from "@/views/MainView.vue";
import AddExpertView from "@/views/AddExpertView.vue";
const routes = [
  {
    path: '/',
    name: 'login',
    component: AddExpertView
  },
  {
    path: '/home',
    name: 'home',
    component: MainPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
