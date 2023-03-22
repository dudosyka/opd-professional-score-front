<template>
  <ModalContainer
      :show-header="true"
      :header-title="`Динамика прохождения ${selectedTest.name}`"
      :show-btn-back="true"
      :btn-back="back"
  >
    <!-- apex charts -->
  </ModalContainer>
</template>

<script>
import {UserTestModel} from "@/api/models/user-test.model";

export default {
  name: "TestDynamicView",
  props: {
    getByCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tests: null,
    }
  },
  async created() {
    const userTestModel = new UserTestModel();
    let userTest = [];

    if (this.getByCurrent)
      userTest = (await userTestModel.resultByCurrentUserAndTest(this.selectedTest.id));
    else
      userTest = (await userTestModel.resultByUserAndTest(this.selectedUser.id, this.selectedTest.id));
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    selectedTest() {
      return this.$store.getters.getSelectedPassedTest;
    },
    selectedUser() {
      return this.$store.getters.getSelectedUser;
    }
  }
}
</script>

<style scoped>

</style>