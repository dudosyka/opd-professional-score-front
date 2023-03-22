<template>
  <ModalContainer
    :show-header="true"
    :header-title="'Результаты теста'"
  >
    {{ data }}
  </ModalContainer>
</template>

<script>
import {UserTestModel} from "@/api/models/user-test.model";
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "OneTestResultView",
  components: {ModalContainer},
  data() {
    return {
      userTestId: null,
      data: null
    }
  },
  async created() {
    this.userTestId = parseInt(this.$route.params.userTestId);
    if (!this.userTestId)
      this.$router.push('/')

    const userTestModel = new UserTestModel();
    const instance = await userTestModel.getOne(this.userTestId);
    this.data = instance;
  }
}
</script>

<style scoped>

</style>