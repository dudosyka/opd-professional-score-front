<template>
  <div class="row row-container d-flex w-100 animate__animated animate__fadeIn">
    <header class="row justify-content-evenly" v-if="showHeader">
      <div class="col-1 back">
        <button v-if="showBtnBack" class="btn btn-outline-dark" @click="btnBack"><i class="fa-solid fa-arrow-left-long"></i></button>
      </div>
      <div class="d-flex col-auto align-self-center justify-content-around">
        <h1 class="header-title">{{ headerTitle }}</h1>
      </div>
      <div class="col-1">
        <button v-if="showBtnNext" class="btn btn-outline-dark" @click="btnNext"> Далее </button>
      </div>
    </header>
      <hr>
    <div class="row justify-content-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalContainer",
  props: {
    showHeader: {
      type: Boolean,
      default: false,
    },
    headerTitle: {
      type: String,
      default: "Заголовок"
    },
    showBtnBack: {
      type: Boolean,
      default: false,
    },
    btnBack: {
      type: Function,
      default: () => {}
    },
    showBtnNext: {
      type: Boolean,
      default: false,
    },
    btnNext: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style>
.row-container {
    display: flex!important;
    justify-content: center;
}
.header-title {
    font-weight: 500;
}
.back {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
}
</style>