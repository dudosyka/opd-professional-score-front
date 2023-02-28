<template>
<modal-container header-title="Порядок характеристик" show-header="true">
  <p class="smallText">Установите характеристики в порядке важности</p>
  <ArrowUpDown></ArrowUpDown>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import ArrowUpDown from "@/components/ArrowUpDown.vue";

export default {
  name: "ChoiseView",
  components: {ArrowUpDown, ModalContainer}
}
</script>

<style scoped>
.smallText{
  margin: 1rem;
  font-family: Rubik;
  font-size: 1.2rem;
  justify-items: center;
  justify-self: center;
  justify-content: center;
}
</style>