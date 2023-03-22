<template>
  <modal-container
    header-title="Список экспертов"
    show-header="true"
    :show-btn-back="true"
    :btn-back="back"
  >
  <template
    v-if="experts.length">
    <PaginationTable
      :labels="['Имя', 'Email']"
      :keys="['name', 'login']"
      :elements="experts"
      :need-pagination="true"
      :items-on-page="5"
      :selectable="false"
      :numeration="true"
      :inline-btns="role == 2 ? btns : []"
      :btns="[ { click: add, title: 'Добавить эксперта' } ]"
    >
    </PaginationTable>
  </template>
</modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {UserModel} from "@/api/models/user.model";
import PaginationTable from "@/components/PaginationTable.vue";
export default {
  name: "ExpertListView",
  components: {PaginationTable, ModalContainer,SmallButton},
  data() {
    return {
      experts: [],
      userModel: null,
      role: null,
      btns: [
        {
          click: (key) => this.remove(key),
          title: "Удалить"
        },
        {
          click: (key) => this.edit(key),
          title: "Изменить"
        }
      ]
    }
  },
  created() {
    this.userModel = new UserModel();
    this.syncExpertList();
    this.$store.dispatch('getUser').then(()=>this.role = this.$store.getters.getUserSt)
  },
  methods: {
    async syncExpertList() {
      this.experts = [];
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
    },
    add() {
      this.$router.push('/expert/add');
    },
    back() {
      this.$router.push('/');
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