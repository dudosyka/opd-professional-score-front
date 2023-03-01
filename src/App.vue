<template>
  <PopUp></PopUp>
  <main class="main">
    <div class="sidebar">
      <Menu v-if="this.checkLocation">
        <template v-slot:first>
                    <router-link to="/" class="standart">Главная</router-link>
                    <router-link to="/profession">Список профессий</router-link>
                    <router-link to="/expert" v-if="role == 2">Список экспертов</router-link>
        </template>
      </Menu>
<!--      <details>-->
<!--        <summary></summary>-->
<!--        <nav class="menu">-->
<!--          <router-link to="/">Главная</router-link>-->
<!--          <router-link to="/profession">Список профессий</router-link>-->
<!--          <router-link to="/expert">Список экспертов</router-link>-->
<!--        </nav>-->
<!--      </details>-->
      <img class="logo" alt="logo" src="./assets/logo.jpg">
    </div>
    <router-view />
  </main>
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
      role:null
    }
  },
  methods: {
    selectProf() {
      this.$store.commit('setSelectedProfession', null);
    }
  },
  async created() {
    this.$store.dispatch('getUser').then(()=>this.role = this.$store.getters.getUserSt)
    this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          if (toParams.after === '/auth')
            this.checkLocation = false
        }
    )
  },
  computed:{
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
.standart{
  margin-top: 3rem;
}
body {
  background-color: #DFEDFA;
}
.main {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}
.menu {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
}
.menu a {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-align: center;
  transition: filter 200ms linear 0s;
}
.logo {
  /*margin-top: 40rem;*/
  max-width: 200px;
  border-radius: 10px;
}

summary {
  writing-mode: vertical-lr;
  text-align: center;
  padding: 1rem;
  padding-left: 1.2rem;
  width: 23px;
  height: 17px;
  background-color: var(--primColor);
  border: 2px solid var(--primColor);
  border-radius: var(--cornerRad);
  color: var(--secoColor);
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: transform 200ms ease-in-out 0s;
}
summary::before,
summary::after {
  position: static;
  top: 0;
  left: 0;
}
summary::before {
  content: "";
}
summary::after {
  content: "III";
  letter-spacing: -1px;
}
summary:hover {
  transform: scale(1.1);
}
summary::marker {
  font-size: 0;
}
summary::-webkit-details-marker {
  display: none;
}
details[open] .menu {
  animation-name: menuAnim;
}
details[open] summary::before {
  content: "X";
}
details[open] summary::after {
  content: "";
}
</style>