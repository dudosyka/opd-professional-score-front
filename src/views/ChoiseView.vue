<template>
<modal-container header-title="Порядок характеристик" show-header="true">
  <div class="maincont">
  <p class="smallText">Установите характеристики в порядке важности</p>
  <table><tb><td><tr>
    <th class="th-left">Характеристика</th>
    <th class="th-right">Порядок</th>
  </tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-left"></th><th class="th-right"><ArrowUpDown></ArrowUpDown></th></tr>
    <tr><th class="th-last-left"></th><th class="th-right-last"><ArrowUpDown></ArrowUpDown></th></tr></td></tb>
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
  components: {SmallButton, ArrowUpDown, ModalContainer}
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
  border-left: 2px gray solid;
  width: 8rem;
  height: 1.9rem;
}
.th-right-last{
  border-left: 2px gray solid;
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