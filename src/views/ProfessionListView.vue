<template>
  <ModalContainer :show-header="true" header-title="Выбор профессии">
    <div class="content">
      <aside class="left-side">
        <SmallButton>Посмотреть общие результаты</SmallButton>
        <SmallButton>Назад</SmallButton>
      </aside>
      <main>
        <table><tb><td><tr><th class="th-first"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th"></th></tr>
          <tr><th class="th-last"></th></tr></td></tb></table>
      </main>
      <aside class="right-side">
        <SmallButton>Посмотреть свои ответы</SmallButton>
        <SmallButton>Изменить</SmallButton>
      </aside>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";

export default {
  name: "ProfessionView",
  components: {SmallButton, ModalContainer}
}
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 5rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: space-between;
    height: 50vh;
  }

  table{
    background: #EFEFEF;
    border: 2px gray solid;
    border-radius: 25px;
  }
  .th-last{
    width: 400px;
    height: 30px;

  }
  .th{
    width: 400px;
    height: 30px;
    border-bottom: 2px gray solid;

  }



</style>