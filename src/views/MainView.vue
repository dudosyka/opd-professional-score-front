<template>
  <div class="container">
  <div class="block">
    <img class="img" src="../assets/main.png">
    <div class="center">
      <button class="cool">Добавить профессию</button>
      <button class="cool">Посмотреть результат</button>
      <button class="cool">Редактировать список экспертов</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "MainPage"
}
</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  background: #DFEDFA;
  display: flex;
}
.block{
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  background: #FFFFFF;
  border-radius: 20px;
  justify-content: space-around;
}
.img{
  height: 35rem;
  width: 35rem;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 50vh;
  width: 50vw;
}

.cool{
  cursor: pointer;
  background-color: #3F55B1;
  width: 30rem;
  height: 4rem;
  border-radius: 30px;
  margin: 0.5rem;
  color: white;
  font-family: Rubik;
  font-size: 1.2rem;
}
</style>