<template>
  <ModalContainer :show-btn-back="true" :btn-back="() => $router.go(-1)" :show-header="true" header-title="Результаты опроса экспертов">
    <div class="content">
      <div class="container table-container">
        <template
          v-if="loaded"
        >
          <PaginationTable
              class="col left-col"
              :need-pagination="false"
              :keys="['expert', 'value']"
              :elements="fullList"
              :labels="['Эксперт', 'Выбранные качества']"
              table_title="Несогласованные критерии"
              :selectable="false"
              :numeration="false"
          >
          </PaginationTable>
          <PaginationTable
              class="col right-col"
              :need-pagination="false"
              :keys="['name', 'percents']"
              :elements="average"
              :labels="['Выбранные качества', 'Процент']"
              table_title="Согласованные критерии"
              :selectable="false"
          >
          </PaginationTable>
        </template>
      </div>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {AssessmentModel} from "@/api/models/assessment.model";
import {UserModel} from "@/api/models/user.model";
import PaginationTable from "@/components/PaginationTable.vue";

export default {
  name: "AssessmentList",
  components: {PaginationTable, SmallButton, ModalContainer},
  data() {
    return {
      loaded: false,
      assessments: [],
    };
  },
  methods: {
    getMaxGrade() {
      let max = 0;
      this.assessments.map(el => {
        max = el.pvk.length;
      })
      return max;
    },
  },
  async created() {
    const assessmentModel = new AssessmentModel();
    const profession = this.$store.getters.getSelectedProfession;
    this.assessments = await Promise.all((await assessmentModel.getByProfession(profession.id)).map(async el => {
      const userModel = new UserModel();
      const user = await userModel.getOne(el.assessment.user_id);
      return {
        ...el,
        user
      }
    }));
    this.loaded = true;
  },
  computed: {
    average() {
      const maxLength = this.getMaxGrade();
      const assessmentsByGrade = {};
      for (let i = 0; i < maxLength; i++) {
        assessmentsByGrade[i] = this.assessments.map(el => {
          return el.pvk[i];
        })
      }
      const added = [];
      return Object.keys(assessmentsByGrade).map(key => {
        const el = assessmentsByGrade[key]
        const pvkToCount = {}
        el.map(pvk => {
          if (!pvk)
            return;
          if (pvkToCount[pvk.pvk_id]) {
            pvkToCount[pvk.pvk_id].count++;
          } else {
            pvkToCount[pvk.pvk_id] = {
              count: 1,
              name: pvk.name
            };
          }
        })

        let max = {count: 0, id: null, name: null};
        Object.keys(pvkToCount).forEach(el => {
          if (pvkToCount[el].count > max.count && !added.includes(el)) {
            max.count = pvkToCount[el].count;
            max.id = el;
            max.name = pvkToCount[el].name;
          }
        })

        added.push(max.id);

        return {
          name: max.name,
          percents: Math.round((max.count / Object.keys(pvkToCount).length) / max.count * 100)
        }
      })
    },
    fullList() {
      const list = [];
      this.assessments.map(async el => {
        list.push({
          expert: el.user.name,
          value: ""
        });
        el.pvk.forEach(el => {
          list.push({
            expert: "",
            value: el.name
          })
        })
      })
      return list;
    }
  }
}
</script>

<style scoped>
.btn {
  margin-left: 5rem;
  width: 10rem;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60vh;
}

.tables {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 50vh;
  margin-top: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}
aside {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

table{
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
  align-self: center;
}

.table-experts{
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
}
.th-last-experts{
  width: 150px;
  height: 30px;

}
.th-last-left-experts{
  width: 150px;
  height: 30px;
  border-right: 2px gray solid;
}
.th-left-experts{
  width: 150px;
  height: 30px;
  border-bottom: 2px gray solid;
  border-right: 2px gray solid;

}
.th-experts{
  width: 300px;
  height: 30px;
  border-bottom: 2px gray solid;
}

.table_prof{
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
}
.th-last-prof{
  width: 250px;
  height: 25px;

}
.th-prof{
  text-align: center;
  width: 250px;
  height: 25px;
  border-bottom: 2px gray solid;

}
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
}
.col-data {
    padding: 0!important;
}
</style>