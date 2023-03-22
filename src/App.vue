<template>
  <div class="container-fluid row vh-100">
    <div class="col-2" v-if="this.$route.meta.needAuth">
      <Menu>
        <template v-slot:first>
          <template
              v-if="role == 2 || role == 1"
          >
            <router-link to="/" class="btn btn-primary mt-5 mb-3">Главная</router-link>
            <router-link to="/profession" class="btn btn-primary mb-3">Профессии</router-link>
            <router-link to="/expert" v-if="role == 2" class="btn btn-primary mb-3">Эксперты</router-link>
            <router-link to="/user" class="btn btn-primary mb-3">Респонденты</router-link>
          </template>
          <template v-else>
            <router-link to="/client" class="btn btn-primary mt-5 mb-3">Главная</router-link>
            <router-link to="/client/tests" class="btn btn-primary mb-3">Тесты</router-link>
            <router-link to="/client/tests/passed" class="btn btn-primary mb-3">Результаты</router-link>
          </template>
          <button class="btn btn-primary" @click="exit">Выйти</button>
        </template>
      </Menu>
    </div>
    <div class="col vw-100 justify-content-center d-flex align-items-center">
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
      role: null
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
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
*{
  margin: 0;
  padding: 0;
  font-family: Rubik,serif;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
:root {
  --primColor: #3F55B1;
  --secoColor: #FFFFFF;
  --cornerRad: 15px;
}
body {
  background-color: #DFEDFA;
}

</style>