<template>
  <ModalContainer
    :show-header="true"
    header-title="Управление списком критериев"
  >
      <div class="d-flex flex-row justify-content-around">
          <div>
              <h4>Доступные критерии / Выбранные критерии</h4>
          </div>
          <div>
              <button class="btn btn-primary" @click="save">
                  Сохранить
              </button>
          </div>
      </div>
      <div class="criteria">
          <criteria-list-component v-if="availableCriteria.length" :criteria-list="availableCriteria" :show-manage-btn="true" :manage-btn-text="'Выбрать'" @manage="onAdd">

          </criteria-list-component>
          <div class="d-flex justify-content-center flex-column" v-else>
              <h4 class="m-3">Нет доступных критериев</h4>
          </div>
          
          <criteria-list-component :show-weight="true" v-if="criteria.length" :criteria-list="criteria" :show-manage-btn="true" :manage-btn-text="'Убрать'" @manage="onRemove">

          </criteria-list-component>
          <div class="d-flex justify-content-center flex-column" v-else>
              <h4 class="m-3">Критерии не добавлены</h4>
          </div>
      </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import CriteriaListComponent from "@/views/admin/criteria/CriteriaListComponent.vue";
import {CriteriaModel} from "@/api/models/criteria.model";
import CriteriaItem from "@/views/admin/criteria/CriteriaItem.vue";
import {PvkModel} from "@/api/models/pvk.model";

export default {
  name: "UpdatePvkCriteria",
  components: {CriteriaItem, CriteriaListComponent, ModalContainer},
  data: () => ({
    id: null,
    criteria: [],
    addedIndexes: [],
    criteriaList: [],
    wasEdited: false
  }),
  async created() {
    const data = this.$store.getters.pvkOnEdit
    if (!data) {
      this.$router.push("/pvk")
    }
    console.log(data)
    this.id = data.id;
    this.criteriaList = await (new CriteriaModel()).getAll()
    console.log(this.criteriaList)
    this.criteria = (await (new PvkModel()).getOne(this.id)).criteria
    console.log(this.criteria)
    this.criteria.forEach(el => {
      this.addedIndexes.push(parseInt(el.id))
    })
    console.log(this.addedIndexes)
  },
  methods: {
    add(item, weight) {
      this.addedIndexes.push(item.id)
      item.weight = weight
      this.criteria.push(item)
    },
    onAdd(item) {
      this.wasEdited = true
      this.$store.commit('showModal', weight => this.add(item, weight))
    },
    onRemove(item) {
      this.wasEdited = true
      const index = this.criteria.findIndex(el => el.id == item.id)
      this.criteria.splice(index, 1)
      this.addedIndexes.splice(index, 1)
    },
    save() {
      if (this.wasEdited) {
        this.$store.commit('setPvkOnEdit', {
          id: this.id,
          criteria: this.criteria.map(el => ({
            criteria_id: parseInt(el.id),
            weight: parseInt(el.weight)
          }))
        })
        
        this.$store.dispatch("updatePvk")
      }
      
      this.$router.push("/pvk")
    }
  },
  computed: {
    availableCriteria() {
      return this.criteriaList.filter(el => !this.addedIndexes.includes(el.id))
    }
  }
}
</script>

<style scoped>
  .criteria {
      display: flex;
  }
</style>