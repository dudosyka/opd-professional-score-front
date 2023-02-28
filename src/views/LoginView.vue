<template>
  <div class="container">
    <div class="block">
      <img class="img" src="../assets/logo.jpg">
      <div class="center">
        <h1>Вход</h1>
        <form>
          <div class="inputbox">
            <input type="text" required="required">
            <span>Email</span>
          </div>
          <div class="inputbox">
            <input type="password" required="required">
            <span>Password</span>
          </div>
          <div class="inputbox">
            <input type="button" value="Войти">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
* {
  margin: 0;
  padding: 0;
}
.container{
  width: 100vw;
  height: 100vh;
  background-color: #DFEDFA;
}
.img{
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 18rem;

}
.center {
  margin-top: 10rem;
  display: flex;
  height: 25rem;
  width: 25rem;
  flex-direction: column;
}
.center h1 {
  color: #000;
  letter-spacing: 5px;
  margin-bottom: 60px;
  font-weight: bold;
  font-family: Rubik;
  

}
.center .inputbox {
  position: relative;
  width: 19rem;
  height: 3rem;
  margin-bottom: 3rem;
}
.center .inputbox input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 2px solid #000;
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
  background: #3F55B1;
  color: #fff;
  border: #fff;
}
.center .inputbox:hover [type="button"] {
  background: linear-gradient(45deg, greenyellow, dodgerblue);
}



.block{
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  background: #FFFFFF;
  border-radius: 20px;
  gap: 20rem;
}
</style>