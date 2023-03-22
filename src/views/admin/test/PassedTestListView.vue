<template>
  <ModalContainer
      :show-header="true"
      header-title="Типы тестов пройденные пользователем"
      :show-btn-back="true"
      :btn-back="back"
      :show-btn-next="true"
      :btn-next="next"
  >
    <PaginationTable
      v-if="tests != null"
      table_title="Выберите один из списка чтобы посмотреть динамику прохождения"
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
import {UserTestModel} from "@/api/models/user-test.model";

export default {
  name: "PassedTestListView",
  components: {ModalContainer, PaginationTable},
  props: {
    getByCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tests: null,
      selected: null
    }
  },
  async created() {
    const testModel = new TestModel();
    const tests = (await testModel.getAll());
    const userTestModel = new UserTestModel();

    let userTest = [];
    if (this.getByCurrent)
      userTest = await userTestModel.resultByCurrentUser();
    else
      userTest = (await userTestModel.resultByUser(this.selectedUser.id));

    const testTypeIds = new Set()
    userTest.map(el => {
      testTypeIds.add(el.test.id)
    });
    this.tests = tests.filter(el => testTypeIds.includes(el.id))
    console.log(this.tests);
  },
  methods: {
    select(selected) {
      this.selected = selected[0];
      this.$store.commit('setSelectedPassedTest', selected[0])
    },
    unselect() {
      this.selected = null
      this.$store.commit('setSelectedPassedTest', null)
    },
    next() {
      if (!this.selected) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Вы должны выбрать один из видов тестов!", success: false })
        return;
      }
      this.$router.push(`/user/${this.user.id}/passed/${this.selected.id}`)
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    selectedUser() {
      return this.$store.getters.getSelectedUser;
    }
  }
}
</script>

<style scoped>

</style>