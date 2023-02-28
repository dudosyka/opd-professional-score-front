<template>
<modal-container header-title="Список экспертов" show-header="true">
<div class="content">
  <table><tb><td><tr>
    <th class="th-left">Эксперт</th>
    <th class="th">Email</th>
    <th class="th-right">подтверждение</th>
  </tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-left"></th><th class="th"></th><th class="th-right"><small-button>Изменить</small-button></th></tr>
    <tr><th class="th-last-left"></th><th class="th-last"></th><th class="th-right-last"></th></tr></td></tb>
  </table>
  <div class="buttons">
    <small-button>Назад</small-button>
    <small-button>Добавить</small-button>
  </div>
</div>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
export default {
  name: "ExpertListView",
  components: {ModalContainer,SmallButton}
}
</script>

<style scoped>
.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
table{
  margin: 5rem;
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
}
.th-last{
  width: 30rem;
  height: 1.9rem;

}
.th-last-left{
  width: 15rem;
  height: 1.9rem;
  border-right: 2px gray solid;
}
.th-left{
  width: 15rem;
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
.th{
  font-family: Rubik;
  font-size: 1rem;
  justify-content: center;
  justify-self: center;
  justify-items: center;
  width: 30rem;
  height: 1.9rem;
  border-bottom: 2px gray solid;
}

</style>