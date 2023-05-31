<template>
    <div class="interface">
        <PaginationTable
                v-if="list.length > 0"
                class="col left-col"
                :keys="['name']"
                :elements="list"
                :labels="['Название']"
                table_title="Типы тестов"
                :selectable="true"
                :numeration="false"
                :items-on-page="5"
                :selectFunc="select"
        >
        </PaginationTable>
        <PaginationTable
                v-if="params.length > 0"
                class="col left-col"
                :keys="['name']"
                :elements="params"
                :labels="['Название']"
                table_title="Параметры теста"
                :selectable="true"
                :numeration="false"
                :items-on-page="5"
                :select-func="selectParam"
        >
        </PaginationTable>
        <div class="fields" v-if="selectedParam != null">
            <div class="input-group">
                <label class="input-group-text">Вес параметра</label>
                <input v-model.number="item.weight" class="form-control form-control-lg" type="text" required="required">
            </div>
            <div class="input-group">
                <label class="input-group-text">Срез</label>
                <input v-model.number="item.slice" class="form-control form-control-lg" type="text" required="required">
            </div>
            <div class="input-group">
                <label class="input-group-text">Направление оценки</label>
                <select class="form-control form-control-lg" v-model="item.direction" required>
                    <option :value="1">
                        Значение выше - лучше
                    </option>
                    <option :value="0">
                        Значение ниже - лучше
                    </option>
                </select>
            </div>
            <button class="btn btn-primary" @click="save()">Сохранить</button>
        </div>
    </div>
</template>

<script>
import PaginationTable from "@/components/PaginationTable.vue";
import {TestModel} from "@/api/models/test.model";

const testModel = new TestModel()

export default {
  name: "ManageCriteriaParam",
  components: {PaginationTable},
  props: {
    blocked: {}
  },
  data: () => ({
    list: [],
    params: [],
    item: {
      id: null,
      weight: null,
      slice: null,
      direction: null,
    },
    selectedParam: null
  }),
  async created() {
    console.log(this.blocked)
    const blockedTests = Object.keys(this.blocked)
    console.log(blockedTests)
    this.list = (await Promise.all((await testModel.getAll()).map(async el => {
      const test = (await testModel.getParams(el.id))
      const paramsIds = test.params.map(el => String(el.id))
      
      if ((blockedTests.includes(String(el.id)))) {
        test.params = test.params.filter(param => {
          if (el.id == 1) {
            console.log("LOOK HERE", blockedTests, String(el.id))
            console.log(param)
          }
          return !(this.blocked[String(el.id)].includes(String(param.id)))
        })
        return el
      }
      else return el
    })))
    
    console.log(this.list)
  },
  methods: {
    async select(item) {
      console.log(item)
      this.params = []
      this.selectedParam = null
      console.log(item)
      const testData = await testModel.getParams(item[0].id)
      this.params = testData.params.filter(el => {
        if (this.blocked[item[0].id]) {
          console.log(el.id, this.blocked[item[0].id])
          return !this.blocked[item[0].id].includes(el.id)
        }
        return true
      })
      this.item.test_name = testData.name
      this.item.test_id = testData.id
      console.log(this.params)
    },
    async selectParam(item) {
      Object.assign(this.item, {
        ...item[0],
        param_id: parseInt(item[0].id),
        id: null
      })
      this.item.weight = null
      this.item.slice = null
      this.item.direction = 0
      this.selectedParam = item[0]
    },
    save() {
      console.log(this.item)
      if (!this.item.weight) {
        this.$store.dispatch("showPopUp", {
          success: false,
          text: "Введите вес параметра!"
        })
        return
      }
      this.$emit("save", {
          item: this.item
      })
    }
  }
}
</script>

<style scoped>
.fields {
    display: flex;
    flex-direction: column;
}
  .input-group {
      margin-top: 1rem;
  }
  
  .btn {
      margin-top: 1rem !important;
  }
</style>