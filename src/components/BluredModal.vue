<template>
    <Transition>
        <div class="background" v-if="modal.show">
            <div class="modal-window">
                <div class="content">
                    <div class="input-group">
                        <label class="input-group-text">Вес критерия</label>
                        <input v-model.number="weight" class="form-control form-control-lg" type="text" required="required">
                    </div>
                </div>
                <div class="controls">
                    <button class="btn btn-outline-danger" @click="revert">Отмена</button>
                    <button class="btn btn-outline-primary" @click="next">Далее</button>
                </div>
            </div>
<!--            <div class="modal" v-html="modal.content">-->
<!--            </div>-->
        </div>
    </Transition>
</template>

<script>
export default {
  name: "BluredModal",
  data: () => ({
    weight: null
  }),
  methods: {
    revert() {
      this.$store.commit('closeModal')
    },
    next() {
      this.$store.commit('closeModal')
      this.modal.next(this.weight)
    }
  },
  computed: {
    modal() {
      this.weight = null
      return this.$store.getters.modal;
    }
  }
}
</script>

<style scoped>
  .background {
      position: absolute;
      backdrop-filter: blur(10px);
      z-index: 9999;
      background-color: rgba(38, 32, 47, 0.42);
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
  }
  .modal-window {
      width: 70vw;
      height: fit-content;
      background-color: #EFEFEF;
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
  }
  .content {
      width: 70%;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: row;
      align-self: center;
      justify-content: center;
  }
  .controls {
      display: flex;
      justify-content: space-evenly;
  }
</style>