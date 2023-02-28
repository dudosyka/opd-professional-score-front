<template>
  <div class="modal">
    <header class="header" v-if="showHeader">
      <h1>{{ headerTitle }}</h1>
    </header>
    <div class="modal-content">
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
    }
  }
}
</script>

<style scoped>
  .modal {
    width: 75vw;
    height: 75vh;
    background: #FFFFFF;
    border-radius: 20px;
    align-self: center;
    display: flex;
    flex-direction: column;

  }
  .header {
    background: #3F55B1;
    border-radius: 20px 20px 0px 0px;
    color: white;
    text-align: center;
    padding: 2rem;
  }
  .modal-content {
    display: flex;
    align-self: center;
    justify-content: center;
    width: 100%;
    overflow-y: auto;
  }
</style>