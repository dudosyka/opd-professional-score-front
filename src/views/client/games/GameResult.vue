<template>
    <ModalContainer
      :show-header="true"
      header-title="Ваш текущий результат"
      :show-btn-next="true"
      :btn-next="next"
    >
        <TestResult
          v-if="loaded"
          :data="numbers"
          :labels="labels"
        >
            <p class="small_text">
                Мы измерили скорость вашей реакции и сравним ее с результатами тестов
            </p>
            <p class="small_text" v-if="type == 3 || type == 4">
                Если вы видите на графике нулевые значения - это означает, что в этом весте вы нажали не ту клавишу
            </p>
        </TestResult>
    </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import TestResult from "@/views/TestResult.vue";

export default {
  name: "GameResult",
  components: {TestResult, ModalContainer},
  data: () => ({
    numbers: [1,2,3,4,5,6],
    labels: [],
    type: 1,
    loaded: false,
  }),
  methods: {
    next() {
      window.location = '/'
    }
  },
  mounted() {
    const { numbers, type } = this.$store.getters.gameResults;
    this.numbers = numbers;
    this.type = type;
    this.labels = this.numbers.map((v, i) => i + 1);
    this.numbers = this.numbers.map(el => ({
      y: el === false ? 0 : el
    }));
    this.loaded = true;
  }
}
</script>