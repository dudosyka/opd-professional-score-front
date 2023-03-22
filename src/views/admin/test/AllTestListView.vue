<template>
  <ModalContainer
      :show-header="true"
      header-title="Добавить новый тест для пользователя"
      :show-btn-back="true"
      :btn-back="back"
      :show-btn-next="true"
      :btn-next="next"
  >
    <PaginationTable
      v-if="tests != null"
      :keys="['name', 'description']"
      :labels="['Название', 'Описание']"
      :elements="tests"
      :selectable="true"
      :multiselect="false"
      :select-func="select"
      :unselect-func="unselect"
    >

    </PaginationTable>
  </ModalContainer>
</template>

<script>
import PaginationTable from "@/components/PaginationTable.vue";
import ModalContainer from "@/components/Modal.vue";
import {TestModel} from "@/api/models/test.model";

export default {
  name: "AllTestListView",
  components: {ModalContainer, PaginationTable},
  data() {
    return {
      tests: null,
      selected: null
    }
  },
  async created() {
    const testModel = new TestModel();
    this.tests = (await testModel.getAll());
    console.log(this.tests);
  },
  methods: {
    select(selected) {
      this.selected = true;
      this.$store.commit('setSelectedTest', selected[0])
    },
    unselect() {
      this.selected = null
      this.$store.commit('setSelectedTest', null)
    },
    next() {
      if (this.selected !== true) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Вы должны выбрать один из видов тестов!", success: false })
        return;
      }
      this.$router.push(`/user/${this.user.id}/available/add/sec`)
    },
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>