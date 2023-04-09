<template>
  <ModalContainer
      :show-header="true"
      header-title="Регистрация"
      :show-btn-back="true"
      :btn-back="back"
      class="register"
  >
    <div class="form">
      <div class="form-group">
        <label class="col-form-label-lg">ФИО</label>
        <input :class="{'is-invalid': validation.name === false, 'is-valid': validation.name === true}" placeholder="ФИО" class="form-control" v-model="credentials.name" type="text" required="required">
      </div>
      <div class="form-group">
        <label class="col-form-label-lg">Email</label>
        <input :class="{'is-invalid': validation.login === false, 'is-valid': validation.login === true}" placeholder="Email" class="form-control" v-model="credentials.login" type="text" required="required">
      </div>
      <div class="form-group">
        <label class="col-form-label-lg mt-1">Дата рождения</label>
        <input :class="{'is-invalid': validation.birthday === false, 'is-valid': validation.login === true}" placeholder="Дата рождения" class="form-control pb-0" v-model="credentials.birthday" type="date" required="required">
      </div>
      <div class="form-group">
        <label class="col-form-label-lg">Пол</label>
        <select :class="{'is-invalid': validation.sex === false, 'is-valid': validation.login === true}" class="form-control" v-model="credentials.sex">
          <option :value="0">Пол</option>
          <option :value="1">М</option>
          <option :value="2">Ж</option>
        </select>
      </div>
      <div class="form-group">
        <label class="col-form-label-lg mt-4">Пароль</label>
        <input :class="{'is-invalid': validation.password === false, 'is-valid': validation.login === true}" placeholder="Пароль" class="form-control" v-model="credentials.password" type="password" required="required">
      </div>
      <div class="d-flex row justify-content-center mt-4">
        <input class="form-control btn btn-outline-primary w-50" @click="auth" type="button" value="Регистрация">
      </div>
      <div class="d-flex row justify-content-center mt-3">
        <p class="text-center">Уже есть аккаунт? <a href="/auth" class="link-primary">Войти</a></p>
      </div>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from '@/components/Modal.vue'
import {AuthorizationModel} from "@/api/models/authorization.model";
import {create} from "axios";
export default {
  name: "SignUpView",
  components: {
    ModalContainer
  },
  data() {
    return {
      credentials: {
        name: "",
        login: "",
        password: "",
        birthday: null,
        sex: 0
      },
      validation: {}
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    auth() {
      this.validation = {};

      this.validation.name = this.credentials.name.length > 0
      this.validation.login = this.credentials.login.length > 0
      this.validation.password = this.credentials.login.length > 0
      this.validation.sex = this.credentials.sex != 0;
      this.validation.birthday = this.credentials.birthday != null;

      const birthdayInt = (new Date(this.credentials.birthday)).getTime()
      this.credentials.birthday = birthdayInt;

      if (Object.keys(this.validation).filter(el => this.validation[el]).length < Object.keys(this.validation).length) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Проверьте правильность заполнения полей!", success: false })
      }

      const authModel = new AuthorizationModel();
      authModel.signUp(this.credentials).then(() => {
        this.$store.dispatch('showPopUp', { text: "Аккаунт успешно создан! Пожалуйста войдите", success: true })
        this.$router.push('/auth');
      }).catch(err => {
        console.log(err);
        this.$store.dispatch('showPopUp', { text: "Ошибка! Проверьте правильность заполнения полей!", success: false })
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
* {
  margin: 0;
  padding: 0;
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
  transition-duration: .3s;
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
  transition-duration: .3s;
  cursor: pointer;
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
  width: 20.5rem;
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
.register {
    width: 10vw;
}
.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-control {
    text-align: center;
}
.col-form-label-lg {
    font-size: 1rem!important;
}
</style>