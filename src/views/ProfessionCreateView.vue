<template>
  <ModalContainer :show-header="true" :header-title="professionOnEdit ? 'Редактирование профессии' : 'Создание профессии'">
    <div class="content">
      <aside class="left-side">
        <p>Название профессии</p>
        <input v-model="profession.name" class="name" type="text" required="required">
        <img class="image" alt="Add prof img" src="@/assets/add_prof.jpg">
        <div class="btns-container">
          <SmallButton @click="save">Сохранить</SmallButton>
          <SmallButton @click="back">Назад</SmallButton>
        </div>
      </aside>
      <aside class="right-side">
        <p>Описание</p>
        <textarea v-model="profession.description" cols="35" rows="50" name="comment"></textarea>
      </aside>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {ProfessionModel} from "@/api/models/profession.model";

export default {
  name: "ProfessionCreateView",
  components: {SmallButton, ModalContainer},
  data() {
    return {
      professionOnEdit: false,
      profession: {
        name: "",
        description: ""
      }
    }
  },
  created() {
    const professionOnEdit = this.$store.getters.getSelectedProfession;
    if (professionOnEdit) {
      this.professionOnEdit = true;
      this.profession = professionOnEdit;
    }
  },
  methods: {
    save() {
      const professionModel = new ProfessionModel();
      if (this.professionOnEdit) {
        const {id, ...data} = this.profession;
        professionModel.update(id, data).then(() => {
          this.$store.dispatch('showPopUp', { success: true, text: "Данные профессии успешно изменены!" });
          this.$router.push('/profession');
        }).catch(() => {
            this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Данные не сохранены!" })
        });
      } else {
        professionModel.create(this.profession).then(() => {
          this.$store.dispatch('showPopUp', { success: true, text: "Профессия успешно создана!" });
          this.$router.push('/profession');
        }).catch(() => {
          this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Данные не сохранены!" })
        });
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 58vh;
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