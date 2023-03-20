<template>
  <ModalContainer :show-header="true" header-title="Результаты опроса экспертов">
    <div class="content">
      <div class="tables">
        <aside class="left-side">
          <h2>Несогласованные критерии</h2>
          <table class="table-experts"><tb><td><tr>
            <th class="th-left-experts">Эксперт</th>
            <th class="th-experts">Выбранные качества</th></tr>
            <tr v-for="(assessment, key) in fullList"><th class="th-left-experts">{{ assessment.expert }}</th><th class="th-experts">{{ assessment.value }}</th></tr>
          </td>
          </tb>
          </table>
        </aside>
        <aside class="right-side">
          <h2>Согласованные критерии</h2>
          <table class="table_prof"><tb><td><tr><th class="th-prof">Выбранные качества</th></tr>
            <tr v-for="(item, k) in average"><th class="th-prof">{{ item.name }}</th></tr>
          </td></tb></table>
        </aside>
      </div>
      <SmallButton @click="$router.go(-1)" class="btn">Назад</SmallButton>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {AssessmentModel} from "@/api/models/assessment.model";
import {UserModel} from "@/api/models/user.model";

export default {
  name: "AssessmentList",
  components: {SmallButton, ModalContainer},
  data() {
    return {
      assessments: [],
      fullList: [],
      average: [],
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
    getByGrade() {
      console.log(this.assessments);
      const maxLength = this.getMaxGrade();
      console.log(maxLength);
      const assessmentsByGrade = {};
      for (let i = 0; i < maxLength; i++) {
        assessmentsByGrade[i] = this.assessments.map(el => {
          return el.pvk[i];
        })
      }
      this.average = [];
      const added = [];
      Object.keys(assessmentsByGrade).map(key => {
        const el = assessmentsByGrade[key]
        const pvkToCount = {}
        el.map(pvk => {
          if (pvkToCount[pvk.pvk_id]) {
            pvkToCount[pvk.pvk_id].count++;
          } else {
            console.log(pvk)
            pvkToCount[pvk.pvk_id] = {
              count: 1,
              name: pvk.name
            };
          }
        })

        let max = {count: 0, id: null, name: null};
        Object.keys(pvkToCount).map(el => {
          if (pvkToCount[el].count > max.count && !added.includes(el)) {
            max.count = pvkToCount[el].count;
            max.id = el;
            max.name = pvkToCount[el].name;
          }
        })

        added.push(max.id);

        this.average.push({
          name: max.name,
          percents: Math.round(max.count / Object.keys(pvkToCount).length * 100)
        })
      })
    }
  },
  async created() {
    const assessmentModel = new AssessmentModel();
    const profession = this.$store.getters.getSelectedProfession;
    console.log(profession.id);
    this.assessments = await assessmentModel.getByProfession(profession.id)
    this.assessments.map(async el => {
      const userModel = new UserModel();
      const user = await userModel.getOne(el.assessment.user_id);
      console.log(user)
      this.fullList.push({
        expert: user.name,
        value: ""
      });
      el.pvk.forEach(el => {
        this.fullList.push({
          expert: "",
          value: el.name
        })
      })
    })
    this.getByGrade();
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


</style>