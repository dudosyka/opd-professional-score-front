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
      <small-button>Назад</small-button>
      <small-button>Сохранить</small-button>
    </div>
  </div>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import ArrowUpDown from "@/components/ArrowUpDown.vue";
import SmallButton from "@/components/SmallButton.vue";

export default {
  name: "ChoiseView",
  components: {SmallButton, ArrowUpDown, ModalContainer},
  data() {
    return {
      pvkList: [

      ]
    }
  },
  created() {
    // this.pvkList = this.$store.getters.getSelectedPvk;
    this.pvkList = [
      {name: "first1", id: 1},
      {name: "first2", id: 2},
      {name: "first3", id: 3},
      {name: "first4", id: 4},
      {name: "first5", id: 5},
      {name: "first6", id: 6},
    ];

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