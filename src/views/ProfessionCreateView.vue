<template>
  <ModalContainer :show-header="true" header-title="Создание профессии">
    <div class="content">
      <aside class="left-side">
        <p>Название профессии</p>
        <input class="name" type="text" required="required">
        <img class="image" alt="Add prof img" src="@/assets/add_prof.jpg">
        <div class="btns-container">
          <SmallButton>Сохранить</SmallButton>
          <SmallButton>Назад</SmallButton>
        </div>
      </aside>
      <aside class="right-side">
        <p>Описание</p>
        <textarea cols="35" rows="50" name="comment"></textarea>
      </aside>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";

export default {
  name: "ProfessionCreateView",
  components: {SmallButton, ModalContainer}
}
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 55vh;
    gap: 10rem;
    justify-content: space-evenly;
  }
  aside {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
  p {
    font-size: 1.5rem;
  }
  textarea, input {
    padding: 1rem;
    font-size: 1.5rem;
    border: 2px solid #000;
    outline: none;
    background: #D3D3D3;
    border-radius: 1rem;
  }
  .btns-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
</style>