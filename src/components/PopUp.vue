<template>
  <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="row popup-row" v-if="popUp.show">
      <div class="container popup-box">
        <p>
          <i v-if="popUp.success" class="fa-solid fa-circle-check tick"></i> <i v-if="!popUp.success" class="fa-solid fa-circle-xmark cross"></i>
          {{ popUp.text }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "PopUp",
  computed: {
    popUp() {
      return this.$store.getters.popUp;
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.cross {
  color: red;
}
.tick {
  color: limegreen;
}
.popup-row {
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  margin-bottom: 2rem;
  width: 100%;
}
.popup-box {
  border-radius: 1rem;
  background: #ffffff;
  box-shadow:  20px 20px 60px #d9d9d9,
  -20px -20px 60px #ffffff;
  margin-top: 1.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 0;
  margin-right: 0;
}
</style>