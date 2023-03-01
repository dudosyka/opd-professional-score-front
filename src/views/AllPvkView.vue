<template>
  <modal-container header-title="Порядок характеристик" show-header="true">
    <div class="maincont">
      <p class="smallText">Выберите ПВК</p>
      <table><tb><td><tr>
        <th class="th-left">ПВК</th>
        <th class="th-right">Выбрано</th>
      </tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-left"></th><th class="th-right"><CheckBox></CheckBox></th></tr>
        <tr><th class="th-last-left"></th><th class="th-right-last"><CheckBox></CheckBox></th></tr></td></tb>
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
import SmallButton from "@/components/SmallButton.vue";
import CheckBox from "@/components/CheckBox.vue";
export default {
  name: "AllPvkView",
  components: {CheckBox,SmallButton,ModalContainer}
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