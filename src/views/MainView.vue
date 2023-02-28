<template>
  <ModalContainer>
    <div class="content">
      <img class="img" src="../assets/main.png">
      <div class="center">
        <button class="cool">Добавить профессию</button>
        <button class="cool">Посмотреть результат</button>
        <button class="cool">Редактировать список экспертов</button>
      </div>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "MainPage",
  components: {ModalContainer}
}
</script>

<style scoped>
.img{
  height: 25rem;
  width: 25rem;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8rem;
  gap: 12rem;
  width: 100%;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
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