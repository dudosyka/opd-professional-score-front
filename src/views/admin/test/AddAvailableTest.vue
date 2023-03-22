<template>
  <ModalContainer
    :show-header="true"
    :header-title="'Добавление нового теста для пользователя'"
  >
    <!--
      Тут типо форма которая будет в зависимости от типа в selectedTest выводится
      для заполнения параметров по типу продолжительности и т д
    -->
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import PaginationTable from "@/components/PaginationTable.vue";

export default {
  name: "AddAvailableTest",
  components: {PaginationTable, ModalContainer}
}
</script>

<style scoped>

</style>