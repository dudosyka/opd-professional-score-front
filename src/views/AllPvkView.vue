<template>
  <modal-container
      :show-header="true"
      header-title="Список ПВК"
  >
    <template
      v-if="loaded"
    >
      <PaginationTable
          class="col"
          :need-pagination="true"
          :items-on-page="8"
          :keys="['name']"
          :elements="pvkList"
          :labels="['ПВК']"
          table_title="Мы оцениваем профессии по следующим ПВК"
          :selectable="false"
          :multiselect="false"
          :moveable="false"
          :show-inline-btns="isAdminOrExpert"
          :inline-btns="[ { click: openPvkCriteria, title: 'Выбранные критерии' } ]"
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
    this.pvkList = await (new PvkModel()).getAll();
    this.loaded = true;
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    openPvkCriteria(item) {
      this.$store.commit('setPvkOnEdit', this.pvkList[item])
      this.$router.push('/pvk/edit')
    }
  },
  computed: {
    isAdminOrExpert() {
      const role = localStorage.getItem("role")
      return role == 2 || role == 1
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