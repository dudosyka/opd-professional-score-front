<template>
  <PopUp></PopUp>
  <main class="main">
    <div class="sidebar">
      <nav class="menu">
        <router-link to="/">Главная</router-link>
        <router-link to="/profession/add">Добавить профессию</router-link>
        <router-link to="/profession">Выбор профессии</router-link>
        <router-link to="/expert">Список экспертов</router-link>
      </nav>
      <img class="logo" alt="logo" src="./assets/logo.jpg">
    </div>
    <router-view />
  </main>
</template>


<script>
import PopUp from "@/components/PopUp.vue";
export default {
  name: "App",
  components: {
    PopUp
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
*{
  margin: 0;
  padding: 0;
  font-family: Rubik,serif;
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
}
.logo {
  max-width: 200px;
  border-radius: 10px;
}
</style>