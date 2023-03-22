<template>
  <modal-container
      header-title="Доступные тесты"
      :show-header="true"
      :show-btn-back="true"
      :btn-back="back"
  >
    <template
      v-if="available != null">
      <PaginationTable
        :labels="['Название']"
        :keys="['testName']"
        :elements="available"
        :moveable="true"
        :btns="btns"
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
  name: "UserAvailableTests",
  props: {
    getByCurrent: {
      type: Boolean,
      default: false,
    }
  },
  components: {ModalContainer, PaginationTable},
  data() {
    return {
      user: null,
      available: null,
      btns: [
        {
          click: this.addToAvailable,
          title: "Добавить тест"
        }
      ]
    }
  },
  async created() {
    this.user = this.$store.getters.getSelectedUser;
    this.userModel = new UserTestAvailableModel();
    let tests = [];
    if (this.getByCurrent)
      tests = await this.userModel.getAvailableByCurrent();
    else
      tests = await this.userModel.getAvailableByUser(this.selectedUser.id);
    const loaded = tests.map(el => {
      return {
        id: el.id,
        serial: el.relative_id,
        name: el.name
      }
    });
    this.available = loaded;

  },
  methods: {
    addToAvailable() {
      this.$router.push(`/user/${this.user.id}/available/add/first`);
    },
    back() {
      this.$router.push('/user');
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