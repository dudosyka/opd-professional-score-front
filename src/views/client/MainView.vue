<template>
  <ModalContainer>
    <div class="col">
      <div class="row justify-content-center">
        <img class="img" src="../../assets/main.png">
      </div>
    </div>
    <div class="col align-self-center justify-content-center">
      <div class="row justify-content-center">
        <button class="btn btn-primary p-2 mb-4 rounded-3 cool" @click="$router.push('/client/tests')">Доступные тесты</button>
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-primary p-2 mb-4 rounded-3 cool" @click="$router.push('/client/tests/result')">Результаты тестов</button>
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-primary p-2 rounded-3 cool" @click="exit">Выйти из аккаунта</button>
      </div>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";


export default {
  name: "MainViewClient",
  components: {ModalContainer},
  data(){
    return{
      role: null
    }
  },
  async created() {
    this.$store.dispatch('getUser').then(()=>this.role = this.$store.getters.getUserSt)
  },
  computed:{
  },
  methods:{
    exit(){
      localStorage.removeItem('token')
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>
.cool{
  cursor: pointer;
  font-family: Rubik;
  font-size: 1.2rem;
}
</style>