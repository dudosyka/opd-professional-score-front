import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import VSkeletonLoader from 'v-skeleton-loader';

createApp(App).use(store).use(router).use(VSkeletonLoader).mount('#app')
