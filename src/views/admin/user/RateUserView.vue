<template>
    <modal-container
            header-title="Рейтинговая оценка"
            :show-header="true"
            :show-btn-next="true"
            :btn-next="next"
            :btn-back="prev"
            :btn-text-title="'Далее'"
            :show-btn-back="true"
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
                  table_title="Укажите процент развития ПВК пользователя"
                  :selectable="false"
                  :multiselect="false"
                  :moveable="false"
                  :show-input="true"
                  :input-data="[ { placeholder: 'Процент развития', onChange: pvkEdited } ]"
            >
            </PaginationTable>

            <PaginationTable
                    class="col"
                    :need-pagination="true"
                    :items-on-page="8"
                    :keys="['name']"
                    :elements="profList"
                    :labels="['ПВК']"
                    table_title="Выберите профессии пользователя"
                    :selectable="true"
                    :multiselect="true"
                    :select-func="profSelected"
                    :unselect-func="profUnselected"
                    :moveable="false"
            >
            </PaginationTable>
        </template>
    </modal-container>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import PaginationTable from "@/components/PaginationTable.vue";
import {PvkModel} from "@/api/models/pvk.model";
import {ProfessionModel} from "@/api/models/profession.model";
import {UserModel} from "@/api/models/user.model";

export default {
  name: "RateUserView",
  components: {PaginationTable, ModalContainer},
  data: () => ({
    pvkList: [],
    selectedPvk: [],
    profList: [],
    selectedProfessions: [],
    loaded: false
  }),
  async created() {
    this.pvkList = await (new PvkModel()).getAll();
    this.profList = await (new ProfessionModel()).getAll();
    console.log(this.profList)
    this.loaded = true;
  },
  methods: {
    pvkEdited(key, e) {
      const pvk = this.pvkList[key]
      // if ()
      const value = parseInt(e.srcElement.value)
      if (value && value <= 100 && value >= 0) {
        this.selectedPvk.push({
          percents: value / 100,
          data: pvk
        })
      } else {
        const index = this.selectedPvk.findIndex(el => { el.data.id == pvk.id })
        this.selectedPvk.splice(index, 1)
      }
    },
    profSelected(items) {
      this.selectedProfessions = items;
    },
    profUnselected(items) {
      this.selectedProfessions = items;
    },
    prev() {
      this.$router.go(-1)
    },
    next() {
      if (this.selectedPvk.length <= 0) {
        this.$store.dispatch('showPopUp', { text: "Ошибка! Введите валидные данные хотя бы для одного ПВК!", success: false })
        return;
      }
      const userModel = new UserModel();
      userModel.rate(parseInt(this.$route.params.userId), {
        answer: this.selectedPvk.map(el => ({
          pvkId: el.data.id,
          value: el.percents
        }))
      }).then(() => {
        this.$router.go(-1)
        this.$store.dispatch('showPopUp', { text: "Веса критериев успешно обновленны!", success: true })
      })
      console.log(this.selectedProfessions, this.selectedPvk)
    }
  }
}
</script>

<style scoped>

</style>