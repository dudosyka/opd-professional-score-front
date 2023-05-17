<template>
    <div class="criteria-list">
        <div class="overflow-scroll col">
            <div v-for="criteria in criteriaList" class="criteria">
                <CriteriaItem :show-controls="showControls" @manage="$emit('manage', $event)" @edit="$emit('edit', $event)" @remove="$emit('remove', $event)" :criteria="criteria" :show-manage-btn="showManageBtn" :manage-btn-text="manageBtnText"></CriteriaItem>
            </div>
        </div>
        <div class="col btn-container menu-btn" v-if="showControls">
            <button class="btn btn-primary rounded-circle fs-6 cursor-pointer" @click="createCriteria">+</button>
        </div>
    </div>
</template>

<script>
import CriteriaItem from "@/views/admin/criteria/CriteriaItem.vue";
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "CriteriaListComponent",
  components: {ModalContainer, CriteriaItem},
  props: {
    criteriaList: [],
    showControls: true,
    showManageBtn: false,
    manageBtnText: ""
  },
}
</script>

<style scoped>
  .criteria-list {
      display: flex;
      flex-direction: row;
  }
  
  .criteria {
      padding: 1.2rem;
      border-radius: 1rem;
      box-shadow: 0 0 10px #D3D3D3;
      margin: 1.5rem
  }
  
  .btn-container {
      max-width: fit-content;
  }
  
  .cursor-pointer {
      cursor: pointer !important;
  }
  
  .menu-btn {
      margin-left: 1rem;
      align-items: center;
  }
  
  .overflow-scroll {
      overflow-x: hidden !important;
      max-height: 70vh;
      padding: 2rem;
  }
</style>