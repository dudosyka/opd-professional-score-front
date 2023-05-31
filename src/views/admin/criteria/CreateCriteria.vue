<template>
    <ModalContainer
      :show-btn-next="true"
      :btn-next="save"
      btn-text-title="Сохранить"
      :show-btn-back="true"
      :btn-back="backToList"
      :show-header="true"
      header-title="Создание критерия"
    >
        <div class="container">
            <template v-if="!addProcessing">
                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <label class="input-group-text">Название критерия</label>
                            <input v-model="name" class="form-control form-control-lg" type="text" required="required">
                        </div>
                    </div>
                    <div class="col btn-container">
                        <button class="btn btn-primary" @click="addParametr">Добавить параметр</button>
                    </div>
                </div>
                <div class="overflow-scroll">
                    <h3 class="mt-4">Список параметров</h3>
                    <template v-for="(param, key) in params" :key="key">
                        <hr class="mt-3">
                        <CriteriaParamItem :id="param.id" :test="param.test_name" :param="param.name" :weight="param.weight" :description="param.description" :index="key" :slice="param.slice" :direction="param.direction"></CriteriaParamItem>
                    </template>
                </div>
            </template>
            <ManageCriteriaParam :blocked="blocked" @save="paramAdded" v-else></ManageCriteriaParam>
        </div>
    </ModalContainer>
</template>

<script>
import PaginationTable from "@/components/PaginationTable.vue";
import {TestModel} from "@/api/models/test.model";
import ManageCriteriaParam from "@/views/admin/criteria/ManageCriteriaParam.vue";
import ModalContainer from "@/components/Modal.vue";
import {CriteriaModel} from "@/api/models/criteria.model";
import CriteriaParamItem from "@/views/admin/criteria/CriteriaParamItem.vue";

const testModel = new TestModel()

export default {
  name: "CreateCriteria",
  components: {CriteriaParamItem, ModalContainer, ManageCriteriaParam, PaginationTable},
  data: () => ({
    id: null,
    name: "",
    params: [],
    addProcessing: false,
    onEdit: false
  }),
  async created() {
    const storage = this.$store.getters.criteriaOnEdit;
    if (storage) {
      this.onEdit = true
      this.id = storage.id
      this.name = storage.name
      this.params = storage.params.map(el => ({
        ...el,
        id: null,
        param_id: parseInt(el.id)
      }))
      console.log(this.params)
      return
    }
    const buffer = localStorage.getItem("buffer")
    if (buffer) {
      const { name, params } = JSON.parse(buffer)
      this.name = name
      this.params = params
    }
  },
  methods: {
    addParametr() {
      this.addProcessing = true
    },
    paramAdded(data) {
      console.log(data.item)
      this.addProcessing = false
      this.params.push(data.item)
      localStorage.setItem("buffer", JSON.stringify({params: this.params, name: this.name}))
    },
    backToList() {
      localStorage.removeItem("buffer")
      this.$router.go(-1)
    },
    save() {
      if (this.onEdit) {
        this.$store.commit("setCriteriaOnEdit", { id: this.id, name: this.name, params: this.params })
        this.$store.dispatch("updateCriteria")
        this.$router.push("/criteria/list")
        return
      }
      localStorage.removeItem("buffer")
      const criteriaModel = new CriteriaModel()
      criteriaModel.create({
        name: this.name,
        params: this.params.map(el => {
          return {
            ...el,
            direction: parseInt(el.direction),
          }
        })
      })
      this.$store.dispatch("showPopUp", {
        success: true,
        text: "Критерий успешно создан!"
      })
      this.$router.push("/criteria/list")
    }
  },
  computed: {
    blocked() {
      const res = {}
      this.params.forEach(el => {
        console.log(el)
        if (res[el.test_id])
          res[el.test_id].push(el.param_id)
        else
          res[el.test_id] = [el.param_id]
      })
      console.log(res);
      return res;
    }
  }
}
</script>

<style scoped>
  .container {
      max-width: 50vw;
  }
  .btn-container {
      max-width: fit-content;
  }
  .overflow-scroll {
      overflow-x: hidden !important;
      max-height: 60vh;
  }
</style>