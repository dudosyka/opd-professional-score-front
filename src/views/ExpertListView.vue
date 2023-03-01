<template>
<modal-container header-title="Список экспертов" show-header="true">
<div class="content">
  <table>
    <tb>
      <td>
        <tr>
          <th class="th-left">Эксперт</th>
          <th class="th">Email</th>
          <th class="th-right"></th>
        </tr>
        <tr v-for="(expert, key) in experts">
          <th class="th-left">
            {{ expert.name }}
          </th>
          <th class="th">
            {{ expert.login }}
          </th>
          <th class="th-right">
            <div class="table-cell">
              <small-button @click="edit(key)">Изменить</small-button>
              <small-button @click="remove(key)">Удалить</small-button>
            </div>
          </th>
        </tr>
      </td>
    </tb>
  </table>
  <div class="buttons">
    <small-button>Назад</small-button>
    <small-button>Добавить эксперта</small-button>
  </div>
</div>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {UserModel} from "@/api/models/user.model";
export default {
  name: "ExpertListView",
  components: {ModalContainer,SmallButton},
  data() {
    return {
      experts: [],
      userModel: null,
    }
  },
  created() {
    this.userModel = new UserModel();
    this.syncExpertList();
  },
  methods: {
    async syncExpertList() {
      this.experts = await this.userModel.getAll();
    },
    edit(key) {
      this.$store.commit('setSelectedExpert', this.experts[key])
      this.$router.push('/expert/add');
    },
    remove(key) {
      this.userModel.delete(this.experts[key].id).then(() => {
        this.$store.dispatch('showPopUp', { success: true, text: 'Эксперт успешно удален!' });
        this.syncExpertList()
      }).catch(err => {
        console.error({...err});
        this.$store.dispatch('showPopUp', { success: false, text: "Ошибка!" });
      });
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
table{
  margin: 5rem;
  background: #EFEFEF;
  border: 2px gray solid;
  border-radius: 25px;
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
.table-cell {
  display: flex;
  flex-direction: row;
}
</style>