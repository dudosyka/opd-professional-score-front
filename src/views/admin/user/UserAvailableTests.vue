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
        :keys="['name']"
        :elements="available"
        :moveable="true"
        :btns="btns"
        :need-pagination="true"
        :items-on-page="3"
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
        },
        {
          click: this.saveRelations,
          title: "Сохранить порядок"
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
    
    this.$store.commit('setAvailableTestsCount', tests.length ? tests.sort((a, b) => b.serial - a.serial)[0].relative_id : 0);
    
    const loaded = tests.map(el => {
      console.log(el);
      return {
        userTestId: el.id,
        id: el.test.id,
        serial: el.relative_id,
        name: el.test.name
      }
    });
    console.log(loaded, tests);
    this.available = loaded;

  },
  methods: {
    addToAvailable() {
      this.$router.push(`/user/${this.user.id}/available/add/first`);
    },
    back() {
      this.$router.push('/user');
    },
    saveRelations(e, data) {
      const model = new UserTestAvailableModel();
      model.updateRelatives(this.user.id, {
        testToRelative: data.map(el => {
            return {
              testId: el.userTestId,
              relativeId: el.serial
            }
        })
      }).then(() => {
        this.$store.dispatch('showPopUp', {
          success: true,
          text: "Порядок сохранен!"
        })
      })
    }
  },
  computed: {
    selectedUser() {
      return this.$store.getters.getSelectedUser;
    },
    // available() {
    //   return this.availableTests.sort((a,b) => a.serial - b.serial)
    // }
  }
}
</script>

<style scoped>

</style>