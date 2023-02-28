<template>
  <small-button>ghjgggghjghjgghj</small-button>
  <div class="container">
    <img class="img" src="../assets/logo.jpg">
    <div class="block">
      <div class="bar"><h1>Добавьте эксперта</h1></div>
      <img class="image" src="../assets/add_expert.jpg">
      <button class="back">Назад</button>
      <div class="center">
        <form>
          <div class="inputbox">
            <input type="text" required="required">
            <span>Имя</span>
          </div>
          <div class="inputbox">
            <input type="text" required="required">
            <span>Email</span>
          </div>
          <div class="inputbox">
            <input type="password" required="required">
            <span>Password</span>
          </div>
          <button>Добавить</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import SmallButton from "@/components/SmallButton.vue";

export default {
  name: "AddExpert",
  components: {SmallButton}
}
</script>

<style scoped>

.container{
  width: 100vw;
  height: 100vh;
  background: #DFEDFA;
}
.block{
  position: absolute;


  width: 930px;
  height: 530px;
  left: 420px;
  top: 15%;

  background: #FFFFFF;
  border-radius: 20px;
}
.img {
  position: absolute;
  width: 245px;
  height: 268px;
  border-radius: 15px;
  margin: 15px;
}
.image{
  position: absolute;
  width: 321px;
  height: 369px;
  top: 108px;
  left: 60px;
  border-radius: 100px;
}
.bar {
  position: absolute;
  width: 100%;
  height: 10vh;
  background: #3F55B1;
  border-radius: 20px 20px 0px 0px;
}

h1{
  text-align: center;
  color: white;
  font-size: 2.7rem;
  font-weight: 300;
  font-family: Rubik;
  display: flex;
}

.center h1 {
  color: #000;
  letter-spacing: 5px;
  margin-bottom: 60px;
  font-weight: bold;
  padding-left: 10px;
}
.center .inputbox {
  position: relative;
  width: 300px;
  height: 50px;
  margin-bottom: 50px;
}
.center .inputbox input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  outline: none;
  background: #D3D3D3;
  padding: 10px;
  border-radius: 100px;
  font-size: 1.2em;
}
.center .inputbox:last-child {
  margin-bottom: 0;
}
.center .inputbox span {
  position: absolute;
  top: 14px;
  left: 20px;
  font-size: 1em;
  transition: 0.6s;
  font-family: sans-serif;
}
.center .inputbox input:focus ~ span,
.center .inputbox input:valid ~ span {
  transform: translateX(-13px) translateY(-35px);
  font-size: 1em;
}
.center .inputbox [type="button"] {
  width: 50%;
  color: #fff;
  border: #fff;
}
.center .inputbox:hover [type="button"] {
  background: linear-gradient(45deg, #3F55B1, blue);
}



</style>