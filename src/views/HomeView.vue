<template>
  <template v-if="!isLogin">
    <h1>Сервис оценки профессионально важных качеств для профессий</h1>
  </template>
  <template v-else>
    <main-view v-if="role == 2"></main-view>
    <main-view-client v-if="role == 1"></main-view-client>
  </template>
</template>

<script>

import MainViewClient from "@/views/client/MainView.vue";
import MainView from "@/views/admin/MainView.vue";

export default {
  name: 'HomeView',
  components: {MainView, MainViewClient},
  data: () => ({
    checkLocation: true,
    role: null
  }),
  computed: {
    isLogin() {
      return !!this.$store.getters.getUserSt;
    }
  },
  async created() {
    this.$watch(
        () => this.$route.params,
        async (toParams) => {
          this.role = await this.$store.dispatch('getUser').then( () => this.$store.getters.getUserSt )
          if (toParams.after === '/auth')
            this.checkLocation = false
        }
    )
  }
}
</script>
