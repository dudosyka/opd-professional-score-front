<template>
  <modal-container
      :show-header="true"
      header-title="Порядок характеристик"
      :show-btn-back="true"
      :btn-back="back"
      :show-btn-next="true"
      :btn-next="next"
  >
    <template
      v-if="loaded"
    >
      <PaginationTable
          class="col"
          :need-pagination="true"
          :items-on-page="10"
          :keys="['name', 'selected']"
          :elements="pvkList"
          :labels="['ПВК', 'Выбрано']"
          table_title="Выберите ПВК"
          :selectable="true"
          :multiselect="true"
          :select-func="check"
          :unselect-func="check"
          :formatters="{'selected': (val) => (val ? '+' : '-')}"
          :moveable="false"
      >
      </PaginationTable>
    </template>
  </modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import SmallButton from "@/components/SmallButton.vue";
import CheckBox from "@/components/CheckBox.vue";
import {PvkModel} from "@/api/models/pvk.model";
import PaginationTable from "@/components/PaginationTable.vue";
export default {
  name: "AllPvkView",
  components: {PaginationTable, CheckBox,SmallButton,ModalContainer},
  data() {
    return {
      selected: [],
      pvkList: [],
      loaded: false,
    }
  },
  async created() {
    this.selected = this.$store.getters.getSelectedPvk;
    const selectedIds = this.selected.map(el => el.id)
    this.pvkList = (await (new PvkModel()).getAll()).map(el => {
      if (selectedIds.includes(el.id))
        return {
          ...el,
          selected: true
        }
      else
        return el
    });
    console.log(this.pvkList);
    this.loaded = true;
  },
  methods: {
    back() {
      this.$store.commit('setSelectedPvk', []);
      this.$router.go(-1)
    },
    next() {
      if (this.selected.length < 5 || this.selected.length > 10) {
        this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Выберите от 5 до 10 ПВК для продолжения!" })
        return;
      }
      this.$store.commit('setSelectedPvk', this.selected);
      this.$router.push('/assessment/ranking');
    },
    check(selected) {
      this.selected = selected;
      if (selected.length > 10) {
        this.$store.dispatch('showPopUp', { success: false, text: "Ошибка! Вы можете выбрать не более 10 ПВК!" })
        return;
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
  gap: 40rem;
}
</style>