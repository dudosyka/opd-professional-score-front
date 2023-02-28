<template>

  <modal-container show-header="true" header-title="Добавьте эксперта">
    <div class="content">
      <div class="mainBlock">
      <img class="img" src="../assets/add_expert.jpg">
      <div class="inputs">
        <span class="defaultText">Имя</span>
        <input type="text" required="required" class="default">
        <span class="defaultText">Email</span>
        <input type="text" required="required" class="default">
        <span class="defaultText">Пароль</span>
        <input type="password" required="required" class="default">
      </div>
      </div>
      <div class="buttons">
        <small-button>Назад</small-button>
        <small-button>Добавить</small-button>
      </div>
    </div>


  </modal-container>
<!--    <div class="block">-->
<!--      <div class="bar"><h1>Добавьте эксперта</h1></div>-->
<!--      <img class="image" src="../assets/add_expert.jpg">-->
<!--      <button class="back">Назад</button>-->
<!--      <div class="center">-->
<!--        <form>-->
<!--          <div class="inputbox">-->
<!--            <input type="text" required="required">-->
<!--            <span>Имя</span>-->
<!--          </div>-->
<!--          <div class="inputbox">-->
<!--            <input type="text" required="required">-->
<!--            <span>Email</span>-->
<!--          </div>-->
<!--          <div class="inputbox">-->
<!--            <input type="password" required="required">-->
<!--            <span>Password</span>-->
<!--          </div>-->
<!--          <button>Добавить</button>-->
<!--        </form>-->
<!--      </div>-->
<!--    </div>-->

</template>

<script>
import SmallButton from "@/components/SmallButton.vue";
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "AddExpert",
  components: {ModalContainer, SmallButton}
}
</script>

<style scoped>
.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.img{
  width: 30rem;
  height: 30rem;
}
.inputs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}
.default{
  width: 30rem;
  height: 2rem;
  border-radius: 100px;
  font-family: Rubik;
  font-size: 1.2rem;
  background-color: #f1e9e9;
  padding: 0.5rem;

}
.defaultText{
  font-family: Rubik;
  font-size: 1.2rem;
  margin: 0.3rem;
}
.mainBlock{
  display: flex;
  flex-direction: row;
  gap: 10rem;
}
</style>