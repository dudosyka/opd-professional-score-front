<template>
    <ModalContainer :show-btn-back="true" :btn-back="() => $router.go(-1)" :show-header="true" header-title="Результаты тестов">
        <div class="content">
            <div class="container table-container">
                <div class="col col-left"
                     style="display: flex;"
                     v-if="showGraph"
                >
                    <TestResult
                            :datasets="data"
                            :labels="labels"
                            :stretch="true"
                    >
                    </TestResult>
                    <hr>
                    <template v-if="role != 0">
                        <div class="input-group">
                            <span class="input-group-text">Возраст: </span>
                            <span class="input-group-text" style="margin-right: 1rem;">{{ filters.age }}</span>
                            <span class="input-group-text">1</span>
                            <input class='form-control' type="range" :min="1" :max="100" v-model="filters.age" @change="useFilter">
                            <span class="input-group-text">100</span>
                        </div>
                        <div class="input-group mt-4">
                            <label class="input-group-text sex-selector" :class="{'selected-sex': filters.sex === 1}" @click="selectSex(1)">Мужской</label>
                            <label class='input-group-text sex-selector' :class="{'selected-sex': filters.sex === 2}" @click="selectSex(2)">Женский</label>
                        </div>
                        <div class="input-group mt-4">
                            <select v-model="filters.user_id" @change="useFilter">
                                <option v-for="user in usersFilter" :value="user.id">{{ user.name }} {{ user.age }}</option>
                            </select>
                        </div>
                        <button class="btn btn-primary mt-3" @click="clearFilter">Сбросить фильтры</button>
                    </template>
                </div>
                <div class="col right-col">
                    <PaginationTable
                            v-if="types.length"
                            :need-pagination="true"
                            :items-on-page="3"
                            :keys="['name']"
                            :elements="types"
                            :labels="['Название']"
                            table_title="Типы тестов"
                            :selectable="true"
                            :select-func="selectType"
                            :multiselect="false"
                    >
                    </PaginationTable>
                    <PaginationTable
                            v-if="typeResults.length"
                            :need-pagination="true"
                            :items-on-page="3"
                            :keys="['user_name', 'avg', 'date']"
                            :elements="typeResults"
                            :labels="['Пользователь', 'Среднее значение', 'Дата']"
                            table_title="Список результатов"
                            :selectable="true"
                            :select-func="selectUserResult"
                            :multiselect="false"
                    >
                    </PaginationTable>
                </div>
            </div>
        </div>
    </ModalContainer>
</template>

<script>
import PassedTestListView from "@/views/admin/test/PassedTestListView.vue";
import PaginationTable from "@/components/PaginationTable.vue";
import ModalContainer from "@/components/Modal.vue";
import TestResult from "@/views/TestResult.vue";
import {UserTestModel} from "@/api/models/user-test.model";

export default {
  name: "TestsView",
  components: {TestResult, ModalContainer, PaginationTable, PassedTestListView},
  data: () => ({
    types: [],
    typeResults: [],
    typeResultsInit: [],
    data: [],
    labels: [],
    showGraph: false,
    ageSlider: [],
    filters: {
      age: null,
      sex: null,
      user_id: null,
    },
    usersFilter: {},
    initialData: {},
  }),
  async created() {
    const userTestModel = new UserTestModel();
    this.types = await userTestModel.getTypes();
  },
  methods: {
    selectSex(sex) {
      this.filters.sex = sex;
      this.useFilter();
    },
    clearFilter() {
      this.filters = {
        age: null,
        sex: null,
        user_id: null,
      }
      this.useFilter();
    },
    useFilter() {
      console.log('useFilter', this.filters, this.typeResultsInit);
      this.typeResults = this.typeResultsInit.filter(el => {
        if (this.filters.age)
          if (Math.abs(parseInt(el.user_age) - this.filters.age) > 5)
            return false;
        
        if (this.filters.sex)
          if (el.user_sex != this.filters.sex) {
            console.log(el);
            return false;
          }
        
        if (this.filters.user_id)
          if (el.user_id != this.filters.user_id)
            return false;
        
        return true;
      });
      
      if (this.typeResultsInit.length != this.typeResults) {
        const cache = [...this.typeResults];
        this.typeResults = [];
        this.$nextTick(() => {
          this.typeResults = cache;
        })
      }
    },
    async selectType(test) {
      const userTestModel = new UserTestModel();
      this.typeResults = [];
      await this.$nextTick(async () => {
        this.typeResults = (await userTestModel.getResultByType(test[0].id)).map(el => ({
          ...el,
          date: el.date.split('T')[0]
        }));
        this.typeResultsInit = [...this.typeResults];
        this.drawGraph(this.typeResults.map(el => {
          this.usersFilter[el.user_id] = {
            id: el.user_id,
            name: el.user_name,
            age: el.user_age
          };
          return {y: el.avg}
        }), this.typeResults.map((el, key) => key + 1));
      })
    },
    async selectUserResult(result) {
      const userTestModel = new UserTestModel();
      const data = await userTestModel.getOneResult(result[0].id)
      this.drawGraph(data.points, data.points.map((el, key) => key + 1))
    },
    drawGraph(data, labels) {
      this.showGraph = false;
      this.$nextTick(() => {
        
        data = data.map(el => {
          if (typeof el == 'object')
            return el.y ? el : {y: 0}
          else
            return el ? el : 0
        });
        
        this.data = [
          {
            data,
            label: "Время реакции в милисекундах",
            borderColor: "#90006a",
            fill: false,
            backgroundColor: "#ffffff",
          }
        ]
        
        this.labels = labels;
        this.showGraph = true;
      })
    }
  },
  computed: {
    role() {
      return localStorage.getItem('role');
    }
  }
}
</script>

<style scoped>
.table-container {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
}
.right-col {
    position: sticky;
    top: 0;
    padding: 0!important;
    border-left: 1px solid rgba(0, 0, 0, 0.16);
    transition-duration: 0.3s;
}
.col-left {
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.col-data {
    padding: 0!important;
}
.sex-selector {
    cursor: pointer;
}
.selected-sex {
    background-color: #2d6ab2;
    color: white;
}
</style>