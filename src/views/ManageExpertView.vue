<template>
  <modal-container :show-header="true" :header-title="expertOnEdit ? 'Редактирование эксперта' : 'Добавьте эксперта'">
    <div class="content">
      <div class="mainBlock">
        <img class="img" src="../assets/add_expert.jpg">
        <div class="inputs">
          <span class="defaultText">Имя</span>
          <input v-model="expert.name" type="text" required="required" class="default">
          <span class="defaultText">Email</span>
          <input v-model="expert.login" type="text" required="required" class="default">
          <small-button @click="editPassword = !editPassword" v-if="expertOnEdit">{{ !editPassword ? 'Изменить пароль' : 'Отмена' }}</small-button>
          <template v-if="editPassword || !expertOnEdit">
            <span class="defaultText">{{ expertOnEdit ? 'Новый пароль' : 'Пароль' }}</span>
            <input v-model="expert.password" type="password" required="required" class="default">
          </template>
        </div>
      </div>
      <div class="buttons">
        <small-button>Назад</small-button>
        <small-button @click="save">{{ expertOnEdit ? 'Сохранить' : 'Добавить' }}</small-button>
      </div>
    </div>
  </modal-container>
</template>

<script>
import SmallButton from "@/components/SmallButton.vue";
import ModalContainer from "@/components/Modal.vue";
import {UserModel} from "@/api/models/user.model";

export default {
  name: "AddExpert",
  components: {ModalContainer, SmallButton},
  data() {
    return {
      expertOnEdit: false,
      editPassword: false,
      expert: {
        name: "",
        login: "",
        password: "",
      }
    }
  },
  async created() {
    const expertOnEdit = this.$store.getters.getSelectedExpert;
    if (expertOnEdit) {
      this.expertOnEdit = true;
      this.expert = expertOnEdit;
      this.expert.password = "";
    }
  },
  methods: {
    save() {
      const user = new UserModel();
      if (this.expertOnEdit) {
        const { id, ...data } = this.expert;
        user.update(id, data).then(() => {
          this.$store.dispatch('showPopUp', { success: true, text: "Данные эксперта успешно изменены!" });
          this.$router.push('/expert');
        }).catch(err => {
          if (err.statusCode === 409)
            this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Неуникальный email!" })
          else
            this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Данные не сохранены!" })
        });
      } else {
        user.create(this.expert).then(() => {
          this.$store.dispatch('showPopUp', { success: true, text: "Эксперт успешно создан!" });
          this.$router.push('/expert');
        }).catch(err => {
          if (err.statusCode === 409)
            this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Неуникальный email!" })
          else
            this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Данные не сохранены!" })
        });;
      }
    }
  }
}
</script>

<style scoped>
.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.img{
  width: 30rem;
  height: 30rem;
}
.inputs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}
.default{
  width: 30rem;
  height: 2rem;
  border-radius: 100px;
  font-family: Rubik;
  font-size: 1.2rem;
  background-color: #f1e9e9;
  padding: 0.5rem;

}
.defaultText{
  font-family: Rubik;
  font-size: 1.2rem;
  margin: 0.3rem;
}
.mainBlock{
  display: flex;
  flex-direction: row;
  gap: 10rem;
}
</style>