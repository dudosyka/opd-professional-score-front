<template>
  <template v-if="!isLogin">
      <div class="container container-vis animate__animated animate__fadeIn">
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_2bosh3aj.json"  background="transparent"  speed="1"  style="width: 500px; height: 300px;"  loop  autoplay></lottie-player>
          <h3 class="main-title">Сервис оценки профессионально важных качеств для профессий</h3>
      </div>
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
<style>
.main-title {
    text-align: center;
    font-weight: 500;
    color: #313131!important;
}
.container-vis {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
