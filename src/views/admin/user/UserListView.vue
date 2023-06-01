<template>
  <modal-container
    header-title="Список респондентов"
    show-header="true"
  >
  <template
    v-if="users.length">
    <PaginationTable
      :labels="['Имя', 'Email']"
      :keys="['name', 'login']"
      :elements="users"
      :need-pagination="true"
      :items-on-page="5"
      :selectable="true"
      :multiselect="false"
      :select-func="select"
      :unselect-func="unselect"
      :numeration="true"
      :btns="btns"
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
      users: [],
      userModel: null,
      role: null,
      selectedModel: null,
      btns: [
        {
          click: this.showAvailable,
          title: "Список доступных тестов"
        },
        {
          click: this.showPassed,
          title: "Список пройденных тестов"
        },
        {
          click: this.rank,
          title: "Провести рейтинговую оценку"
        },
      ]
    }
  },
  created() {
    this.userModel = new UserModel();
    this.syncUserList();
  },
  methods: {
    async syncUserList() {
      this.users = [];
      this.users = await this.userModel.getAllResp();
    },
    select(selected) {
      console.log(selected)
      this.selectedModel = selected[0];
      this.$store.commit('setSelectedUser', selected[0]);
    },
    unselect() {
      this.selectedModel = null;
      this.$store.commit('setSelectedUser', null);
    },
    showAvailable() {
      if (this.selectedModel == null) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Выберите пользователя!", success: false })
        return;
      }
      this.$router.push(`/user/${this.selectedModel}/available`)
    },
    rank() {
      if (this.selectedModel == null) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Выберите пользователя!", success: false })
        return;
      }
      this.$router.push(`/user/${this.selectedModel.id}/rate`)
    },
    showPassed() {
      this.$router.push(`/client/tests/passed`)
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