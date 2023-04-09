<template>
  <div class="container-fluid main-container row">
    <div class="col-2 nav-col" v-if="!$route.meta.hideMenu">
      <Menu v-if="isLogin">
        <template v-slot:first>
          <template
              v-if="role == 2 || role == 1"
          >
              <router-link to="/" class="btn menu-btn btn-primary"><i class="fa-solid fa-house"></i> Главная</router-link>
              <hr>
              <router-link to="/profession" class="btn  menu-btn btn-primary"><i class="fa-solid fa-helmet-safety"></i> Профессии</router-link>
              <hr>
              <router-link to="/pvk" class="btn  menu-btn btn-primary"><i class="fa-solid fa-list"></i> ПВК</router-link>
              <hr>
              <router-link to="/expert" v-if="role == 2" class="btn  menu-btn btn-primary "><i class="fa-solid fa-user-tie"></i> Эксперты</router-link>
              <hr>
              <router-link to="/user" class="btn  menu-btn btn-primary "><i class="fa-solid fa-users"></i> Респонденты</router-link>
          </template>
          <template v-else>
              <router-link to="/" class="btn  menu-btn btn-primary "><i class="fa-solid fa-house"></i> Главная</router-link>
              <hr>
              <router-link to="/profession" class="btn  menu-btn btn-primary "><i class="fa-solid fa-helmet-safety"></i> Профессии</router-link>
              <hr>
              <router-link to="/pvk" class="btn  menu-btn btn-primary "><i class="fa-solid fa-list"></i> Список ПВК</router-link>
              <hr>
              <router-link to="/client/tests" class="btn  menu-btn btn-primary "><i class="fa-solid fa-clipboard-question"></i> Тесты</router-link>
              <hr>
              <router-link to="/client/tests/passed" class="btn  menu-btn btn-primary "><i class="fa-solid fa-clipboard-check"></i> Результаты</router-link>
          </template>
          <router-link to="/logout" class="btn menu-btn btn-primary "><i class="fa-solid fa-right-from-bracket"></i> Выйти</router-link>
        </template>
      </Menu>
      <Menu v-else>
        <template v-slot:first>

            <router-link to="/" class="btn menu-btn btn-primary "><i class="fa-solid fa-house"></i> Главная</router-link>
            <hr>
            <router-link to="/profession" class="btn menu-btn btn-primary "><i class="fa-solid fa-helmet-safety"></i> Профессии</router-link>
            <hr>
            <router-link to="/pvk" class="btn menu-btn btn-primary "><i class="fa-solid fa-list"></i> Список ПВК</router-link>
            <hr>
            <router-link to="/auth" class="btn menu-btn btn-primary "><i class="fa-solid fa-right-to-bracket"></i> Авторизация</router-link>
            <hr>
            <router-link to="/sign-up" class="btn menu-btn btn-primary "><i class="fa-solid fa-address-card"></i> Регистрация</router-link>
        </template>
      </Menu>
    </div>
    <div :class="{'auth-col': !isLogin}" class="col content-col justify-content-center d-flex align-items-center">
      <PopUp></PopUp>
      <router-view />
    </div>
  </div>
</template>


<script>
import PopUp from "@/components/PopUp.vue";
import Menu from "@/components/Menu.vue";
export default {
  name: "App",
  components: {
    Menu,
    PopUp
  },
  data(){
    return{
      checkLocation: true,
      role: null,
      isLogin: false,
    }
  },
  methods: {
    exit() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')

      this.$router.push('/auth')
    }
  },
  async created() {
    this.isLogin = !!localStorage.getItem('token');
    this.role = parseInt(localStorage.getItem('role'))
    // this.$watch(
    //     () => this.$route.params,
    //     async (toParams) => {
    //       this.role = await this.$store.dispatch('getUser').then( () => this.$store.getters.getUserSt )
    //       if (toParams.after === '/auth')
    //         this.checkLocation = false
    //     }
    // )
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
  margin: 0;
  padding: 0;
    font-family: 'Inter', sans-serif;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#app {
    display: flex;
    align-items: center;
    justify-content: center;
}
:root {
  --primColor: #3F55B1;
  --secoColor: #FFFFFF;
  --cornerRad: 15px;
}
body {
    background-image: url("@/assets/bg.jpg");
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
}
.content-col {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.93);
    border-radius: 0rem 1rem 1rem 0rem;
    border: 1px solid rgba(209, 213, 219, 0.3);
    height: 100%;
    min-height: 90vh;
}
.nav-col {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.46);
    border-radius: 1rem 0rem 0rem 1rem;
    border: 1px solid rgba(209, 213, 219, 0.3);
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0!important;
    margin: 0!important;
    flex-direction: column;
    align-items: stretch;
}
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: row;
    padding: 1rem;
    width: 100%;
    min-width: 100vw!important;
}
.menu-btn {
    background-color: transparent!important;
    color: #313131!important;
    font-weight: 400!important;
    border: none!important;
    text-align: left!important;
    padding: 0!important;
    margin: 0!important;
    padding-left: 1rem!important;
}
hr {
    color: rgba(0, 0, 0, 0.21) !important;
}
.auth-col {
    border-radius: 1rem 1rem 1rem 1rem!important;
    width: 100%;
    max-width: 40vw!important;
    height: 100%!important;
    min-height: 30vh;
    padding-top: 3rem;
    padding-bottom: 3rem;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.93);
    border: 1px solid rgba(209, 213, 219, 0.3);
}
h1,h2,h3,h4,h5,h6 {
    margin: 0!important;
}
</style>