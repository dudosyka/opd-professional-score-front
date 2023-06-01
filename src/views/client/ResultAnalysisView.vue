<template>
    <modal-container
      header-title="Анализ результатов"
      :show-header="true"
    >
        <template v-if="loaded">
            <div class="row">
                <PaginationTable
                        class="col"
                        :need-pagination="true"
                        :items-on-page="8"
                        :keys="['name', 'percent']"
                        :elements="pvkProgress"
                        :labels="['ПВК', 'Процент']"
                        table_title="Процент развития ПВК"
                        :selectable="false"
                        :multiselect="false"
                        :moveable="false"
                >
                </PaginationTable>
            </div>
            
            <PaginationTable
                    class="col"
                    :need-pagination="true"
                    :items-on-page="8"
                    :keys="['name', 'percent']"
                    :elements="profProgress"
                    :labels="['Профессия', 'Процент']"
                    table_title="Процент соотвествия ваших навыков для конкретных профессий"
                    :selectable="false"
                    :multiselect="false"
                    :moveable="false"
            >
            </PaginationTable>
        </template>
    </modal-container>
</template>

<script>
import PaginationTable from "@/components/PaginationTable.vue";
import ModalContainer from "@/components/Modal.vue";
import {UserModel} from "@/api/models/user.model";

export default {
  name: "ResultAnalysisView",
  components: {ModalContainer, PaginationTable},
  data: () => ({
    pvkProgress: [],
    profProgress: [],
    loaded: false
  }),
  async created() {
    const userModel = new UserModel()
    await userModel.rateSelf().then(el => {
      el.pvk.forEach(item => {
        this.pvkProgress.push({
          id: item.pvk.id,
          name: item.pvk.name,
          percent: Math.round(item.value * 100)
        })
      })
      el.prof.forEach(item => {
        this.profProgress.push({
          id: item.prof.id,
          name: item.prof.name,
          percent: Math.round(item.value)
        })
      })
      this.profProgress = this.profProgress.sort((a, b) => {a.percent - b.percent})
    })
    this.loaded = true
  }
}
</script>

<style scoped>

</style>