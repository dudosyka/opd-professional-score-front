<template>
    <ModalContainer
      :show-header="true"
      header-title="Список добавленных критериев оценки"
    >
        <CriteriaListComponent :show-controls="true" :criteria-list="criteriaList" @edit="onEdit" @remove="onRemove"></CriteriaListComponent>
    </ModalContainer>
</template>

<script>
import {CriteriaModel} from "@/api/models/criteria.model";
import CriteriaParamItem from "@/views/admin/criteria/CriteriaParamItem.vue";
import CriteriaItem from "@/views/admin/criteria/CriteriaItem.vue";
import ModalContainer from "@/components/Modal.vue";
import CriteriaListComponent from "@/views/admin/criteria/CriteriaListComponent.vue";

export default {
  name: "CriteriaList",
  components: {CriteriaListComponent, ModalContainer, CriteriaItem, CriteriaParamItem},
  data: () => ({
    criteriaList: []
  }),
  async created() {
    this.criteriaList = await (new CriteriaModel()).getAll()
    console.log(this.criteriaList)
  },
  methods: {
    onRemove(criteria) {
      const criteriaModel = new CriteriaModel()
      criteriaModel.delete(criteria.id)
      this.criteriaList.splice(this.criteriaList.findIndex(el => el.id == criteria.id), 1)
      this.$store.dispatch("showPopUp",{
        success: true,
        text: "Критерий успешно удален!"
      })
    },
    onEdit(criteria) {
      this.$store.commit("setCriteriaOnEdit", criteria)
      this.$router.push("/criteria/create")
    },
    createCriteria() {
      this.$router.push("/criteria/create")
    }
  }
}
</script>

<style scoped>
</style>