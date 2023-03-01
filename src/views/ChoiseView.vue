<template>
<modal-container header-title="Порядок характеристик" show-header="true">
  <div class="maincont">
  <p class="smallText">Установите характеристики в порядке важности</p>
  <table><tb><td><tr>
    <th class="th-left th-header">Характеристика</th>
    <th class="th-right th-header">Порядок</th>
  </tr>
    <tr v-for="(p, k) in pvk"><th class="th-left">{{ p.name }}</th><th class="th-right"><ArrowUpDown @up="moveUp(k)" @down="moveDown(k)" /></th></tr>
  </td>
  </tb>
  </table>
    <div class="buttons">
      <small-button @click="$router.go(-1)">Назад</small-button>
      <small-button @click="save">Сохранить</small-button>
    </div>
  </div>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import ArrowUpDown from "@/components/ArrowUpDown.vue";
import SmallButton from "@/components/SmallButton.vue";
import {AssessmentModel} from "@/api/models/assessment.model";

export default {
  name: "ChoiseView",
  components: {SmallButton, ArrowUpDown, ModalContainer},
  data() {
    return {
      pvkList: []
    }
  },
  created() {
    this.pvkList = this.$store.getters.getSelectedPvk;

    let serial = 0;
    this.pvkList = this.pvkList.map(el => {
      serial++;
      return {
        ...el,
        serial
      }
    });
  },
  methods: {
    find(serial) {
      for (let i = 0; i < this.pvkList.length; i++) {
        if (this.pvkList[i].serial == serial)
          return i;
      }
      return false;
    },
    moveUp(key) {
      const target = this.pvkList[key];
      if (target.serial == 1)
        return;
      const newSerial = target.serial - 1;
      const oldItem = this.find(newSerial);
      this.pvkList[oldItem].serial++;
      this.pvkList[key].serial--;
    },
    moveDown(key) {
      const target = this.pvkList[key];
      if (target.serial == this.pvkList.length)
        return;
      const newSerial = target.serial + 1;
      const oldItem = this.find(newSerial);
      this.pvkList[oldItem].serial--;
      this.pvkList[key].serial++;
    },
    save() {
      const profession_id = this.$store.getters.getSelectedProfession.id;
      const pvk = this.pvk.map(el => {
        return {
          pvk_id: el.id,
          grade: el.serial
        }
      });
      const assessmentModel = new AssessmentModel();
      assessmentModel.create({
        profession_id: parseInt(profession_id),
        pvk
      }).then(() => {
        this.$store.dispatch('showPopUp', { success: true, text: "Данные вашей оценки сохранены!" })
      }).catch(err => {
        console.log(err.method);
        console.log(err.data); //{"profession_id":3,"pvk":[{"pvk_id":1,"grade":1},{"pvk_id":2,"grade":2},{"pvk_id":3,"grade":3},{"pvk_id":4,"grade":4},{"pvk_id":5,"grade":5}]}
        console.log(...err);
      });
    }
  },
  computed: {
    pvk() {
      return this.pvkList.sort((a, b) => {
        return a.serial > b.serial;
      })
    }
  }
}
</script>

<style scoped>
.smallText{
  margin: 1rem;
  font-family: Rubik;
  font-size: 1.5rem;
  justify-items: center;
  justify-self: center;
  justify-content: center;
}
table{
  margin-top: 2rem;
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
}
.th-header {
  font-size: 1.4rem !important;
}
.th-left{
  width: 30rem;
  height: 1.9rem;
  font-size: 1.2rem;
  border-bottom: 2px gray solid;
  border-right: 2px gray solid;
}
.th-right{
  border-bottom: 2px gray solid;
  width: 8rem;
  height: 1.9rem;
}
.maincont{
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}
.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40rem;
}
</style>