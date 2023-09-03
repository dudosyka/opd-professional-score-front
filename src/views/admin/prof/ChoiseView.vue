<template>
<modal-container
    show-header="true"
    header-title="Порядок характеристик"
    :show-btn-back="true"
    :btn-back="() => $router.go(-1)"
    :show-btn-next="true"
    :btn-next="save"
>
  <PaginationTable
    table_title="Установите характеристики в порядке важности"
    :need-pagination="false"
    :labels="['Название']"
    :moveable="true"
    :elements="pvk"
    :keys="['name']"
    :selectable="false"
    :filter="filterItems"
  >

  </PaginationTable>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import ArrowUpDown from "@/components/ArrowUpDown.vue";
import SmallButton from "@/components/SmallButton.vue";
import {AssessmentModel} from "@/api/models/assessment.model";
import PaginationTable from "@/components/PaginationTable.vue";

export default {
  name: "ChoiseView",
  components: {PaginationTable, SmallButton, ArrowUpDown, ModalContainer},
  data() {
    return {
      pvkList: [],
      btns: [
        {
          title: "Сохарнить",
          click: this.save
        }
      ]
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
    filterItems(el) {
      return el.id == 1
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
        this.$store.commit('setSelectedProfession', null)
        this.$store.commit('setSelectedPvk', [])
        this.$router.push('/profession')
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
      }).map(el => {
        return {
          ...el,
          selected: false,
        }
      })
    }
  }
}
</script>

<style scoped>
.smallText{
  margin: 1rem !important;
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