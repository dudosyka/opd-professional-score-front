<template>
  <ModalContainer :show-header="true" header-title="Профессии">

    <template
      v-if="professions !== null"
    >
      <PaginationTable
          table_title="Список профессий"
          :labels="['Название']"
          :keys="['name']"
          :elements="professions"
          :btns="btns"
          :select-func="selectFunc"
          :unselect-func="unselectFunc"
          :items-on-page="3"
          :selectable="true"
      >
      </PaginationTable>
    </template>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import {ProfessionModel} from "@/api/models/profession.model";
import PaginationTable from "@/components/PaginationTable.vue";

export default {
  name: "ProfessionView",
  components: {PaginationTable, SmallButton, ModalContainer},
  data() {
    return {
      professionModel: null,
      professions: null,
      selectedProfession: null,
      selectedProfessionKey: null,
      curPage: 1,
      itemsOnPage: 2,
      btns: [
      ]
    };
  },
  async created() {
    this.btns.push({
      click: this.results,
      title: "Посмотреть результаты"
    })
    const role = localStorage.getItem("role");
    if (role >= 1) {
      this.btns.push({
        click: this.rank,
        title: "Провести оценку"
      });
    }
    if (role >= 2) {
      this.btns.push({
        click: this.edit,
        title: "Изменить"
      });
      this.btns.push({
        click: this.remove,
        title: "Удалить"
      });
      this.btns.push({
        click: this.add,
        title: "Добавить профессию"
      });
    }
    this.professionModel = new ProfessionModel();
    await this.syncProfessionsList();
  },
  methods: {
    async syncProfessionsList() {
      this.professions = null;
      this.professions = await this.professionModel.getAll();
    },
    selectFunc(professions) {
      this.selectedProfessionKey = 1;
      this.selectedProfession = professions[0];
      console.log(this.selectedProfession);
      this.$store.commit('setSelectedProfession', professions[0]);
    },
    unselectFunc() {
      this.selectedProfessionKey = null;
      this.selectedProfession = null;
      this.$store.commit('setSelectedProfession', null);
    },
    edit() {
      if (this.selectedProfessionKey !== null)
        this.$router.push('/profession/add')
      else
        this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для изменения!' });
    },
    add() {
      this.$store.commit('setSelectedProfession', null);
      this.$router.push('/profession/add')
    },
    rank() {
      if (this.selectedProfessionKey !== null) {
        this.$store.commit('setSelectedPvk', [])
        this.$router.push('/assessment/choose');
      }
      else {
        this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для оценки!' });
      }
    },
    results() {
      if (this.selectedProfessionKey !== null)
        this.$router.push('/assessment/results')
      else
        this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для просмотра результатов!' });
    },
    remove() {
      console.log(this.selectedProfession, this.selectedProfessionKey)
      if (this.selectedProfessionKey == null)
        return this.$store.dispatch('showPopUp', { success: false, text: 'Выберите профессию для удаления!' });

      this.professionModel.delete(this.selectedProfession.id).then(() => {
        this.$store.dispatch('showPopUp', { success: true, text: "Профессия успешно удалена!" });
        this.syncProfessionsList();
      }).catch(() => {
        this.$store.dispatch('showPopUp', { success: false, text: "Профессия успешно удалена!" });
      })
    },
  },
}
</script>

<style scoped>
  .profession-row {
    cursor: pointer;
  }

</style>