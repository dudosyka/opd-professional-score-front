<template>
  <modal-container header-title="Порядок характеристик" show-header="true">
    <div class="maincont">
      <p class="smallText">Выберите ПВК</p>
      <table>
        <tb>
          <td>
            <tr>
              <th class="th-left">ПВК</th>
              <th class="th-right">Выбрано</th>
            </tr>
            <tr v-for="(p, k) in pvk" @click="check(k)" :class="{'active': p.selected}"><th class="th-left">{{ p.name }}</th><th class="th-right"><CheckBox :value="p.selected" @change="check(k)" /></th></tr>
      </td>
      </tb>
      </table>
      <div class="buttons">
        <small-button @click="$router.go(-1)">Назад</small-button>
        <small-button @click="next">Далее</small-button>
      </div>
    </div>
  </modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import CheckBox from "@/components/CheckBox.vue";
import {PvkModel} from "@/api/models/pvk.model";
export default {
  name: "AllPvkView",
  components: {CheckBox,SmallButton,ModalContainer},
  data() {
    return {
      selected: [],
      pvkList: []
    }
  },
  async created() {
    this.selected = this.$store.getters.getSelectedPvk.map(el => el.id);
    this.pvkList = await (new PvkModel()).getAll();
  },
  methods: {
    next() {
      console.log(this.selected);
      if (this.selected.length < 5) {
        this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Выберите от 5 до 10 ПВК для продолжения!" })
        return;
      }
      this.$store.commit('setSelectedPvk', this.pvk.filter(el => el.selected));
      this.$router.push('/assessment/ranking');
    },
    check(key) {
      const id = this.pvk[key].id;
      if (this.selected.length === 10 && !this.selected.includes(id)) {
        this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Вы можете выбрать не более 10 ПВК!" })
        return;
      }
      if (this.selected.includes(id))
        this.selected.splice(this.selected.indexOf(id), 1);
      else
        this.selected.push(id);
    }
  },
  computed: {
    pvk() {
      return this.pvkList.map(el => {
        return {
          ...el,
          selected: this.selected.includes(el.id)
        }
      })
    }
  }
}
</script>

<style scoped>
.smallText{
  margin: 3rem;
  font-family: Rubik;
  font-size: 1.5rem;
  justify-items: center;
  justify-self: center;
  justify-content: center;
}
table{
  margin-top: 3rem;
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
}
.th-last{
  width: 30rem;
  height: 1.9rem;

}
.th-last-left{
  width: 30rem;
  height: 1.9rem;
  border-right: 2px gray solid;
}
.th-left{
  width: 30rem;
  height: 1.9rem;
  border-bottom: 2px gray solid;
  border-right: 2px gray solid;
}
.th-right{
  border-bottom: 2px gray solid;
  width: 8rem;
  height: 1.9rem;
}
.th-right-last{
  width: 7.5rem;
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