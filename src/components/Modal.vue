<template>
  <div class="row d-flex w-100">
    <header class="row justify-content-evenly" v-if="showHeader">
      <div class="col-1">
        <button v-if="showBtnBack" class="btn btn-outline-dark" @click="btnBack"> Назад </button>
      </div>
      <div class="d-flex col-auto align-self-center justify-content-around mb-5">
        <h1>{{ headerTitle }}</h1>
      </div>
      <div class="col-1">
        <button v-if="showBtnNext" class="btn btn-outline-dark" @click="btnNext"> Далее </button>
      </div>
    </header>
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