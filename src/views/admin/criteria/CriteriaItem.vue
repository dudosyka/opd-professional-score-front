<template>
    <div class="row">
        <div class="col">
            <h2 class="mb-3">
                {{ criteria.name }}
            </h2>
            {{ weight }}
        </div>
        <div class="col btn-container">
            <button class="btn btn-primary" v-if="showControls" @click="$emit('edit', criteria)">Редактировать</button>
            <button class="btn btn-danger ml-1" v-if="showControls" @click="$emit('remove', criteria)">Удалить</button>
            <button class="btn btn-outline-primary ml-1" v-if="showManageBtn" @click="$emit('manage', criteria)">{{ manageBtnText }}</button>
        </div>
    </div>
    <template v-for="(param, key) in criteria.params">
        <template v-if="graterTenth(param.weight)">
            <hr>
            <CriteriaParamItem
                    :id="param.id"
                    :num="key"
                    :index="key"
                    :test="param.test_name"
                    :param="param.name"
                    :description="param.description"
                    :weight="param.weight"
                    :direction="param.direction"
                    :slice="param.slice"
                    @remove="onRemove"
            ></CriteriaParamItem>
        </template>
    </template></template>

<script>
import CriteriaParamItem from "@/views/admin/criteria/CriteriaParamItem.vue";

export default {
  name: "CriteriaItem",
  components: {CriteriaParamItem},
  props: {
    criteria: null,
    showControls: true,
    showManageBtn: false,
    manageBtnText: "",
    showWeight: false
  },
  methods: {
    graterTenth(weight) {
      console.log(weight)
      return (Math.abs(weight) > 0.1)
    }
  },
  computed: {
    weight() {
      if (this.showWeight) {
        return `Вес критерия: ${this.criteria.weight}`
      } else {
        return ""
      }
    },
  }
}
</script>

<style scoped>
  .btn-container {
      max-width: fit-content;
  }
  
  .ml-1 {
      margin-left: 1rem;
  }
</style>