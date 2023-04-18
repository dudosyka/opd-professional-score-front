<template>
  <modal-container
      header-title="Доступные тесты"
      :show-header="true"
  >
    <template
        v-if="available != null">
      <PaginationTable
          :labels="['Название']"
          :keys="['name']"
          :elements="available"
          :moveable="false"
          :inline-btns="btns"
          :selectable="false"
      >

      </PaginationTable>
    </template>
  </modal-container>
</template>

<script>
import PaginationTable from "@/components/PaginationTable.vue";
import ModalContainer from "@/components/Modal.vue";
import {UserTestAvailableModel} from "@/api/models/user-test-available.model";

export default {
  name: "AvailableTestView",
  components: {ModalContainer, PaginationTable},
  data() {
    return {
      user: null,
      available: null,
      btns: [
        {
          click: (key) => this.pass(key),
          title: "Пройти тест"
        }
      ]
    }
  },
  async created() {
    this.user = this.$store.getters.getSelectedUser;
    this.userModel = new UserTestAvailableModel();
    const tests = await this.userModel.getAvailableByCurrent();
    const loaded = tests.map(el => {
      console.log(el);
      return {
        id: el.test.id,
        serial: el.relative_id,
        name: el.test.name,
        settings: JSON.parse(JSON.parse(el.settings))
      }
    });
    this.available = loaded;

  },
  methods: {
    pass(key) {
      if (key != 0) {
        this.$store.dispatch('showPopUp', { text: "Начните с первого в списке!", success: false })
        return;
      }
      this.$store.commit('setOnPass', this.available[key])
      this.$router.push('/game/' + this.available[key].id)
      //Start one of the games
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    selectedUser() {
      return this.$store.getters.getSelectedUser;
    }
  }
}
</script>

<style scoped>

</style>