<template>
    <ModalContainer
      :show-header="true"
      header-title="Ваш текущий результат"
      :show-btn-next="true"
      :btn-next="next"
    >
        <template v-if="singleGraf">
            <TestResult
                    v-if="loaded"
                    :datasets="grafData[0].numbers"
                    :labels="grafData[0].labels"
            >
                <p class="small_text">
                    {{ grafData[0].label }}
                </p>
                <p class="small_text" v-if="type == 3 || type == 4">
                    Если вы видите на графике нулевые значения - это означает, что в этом месте вы нажали не ту клавишу
                </p>
            </TestResult>
        </template>
        <template v-else>
            <TestResult
                    :id="`line-chart${key}`"
                    v-for="(data,key) in grafData"
                    v-if="loaded"
                    :datasets="data.numbers"
                    :labels="data.labels"
            >
                <p class="small_text">
                    {{ data.label }}
                </p>
            </TestResult>
        </template>
    </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import TestResult from "@/views/TestResult.vue";

export default {
  name: "GameResult",
  components: {TestResult, ModalContainer},
  data: () => ({
    grafData: [{
      label: "",
      numbers: [],
      labels: []
    }],
    type: 1,
    loaded: false,
    singleGraf: true,
    single: true,
  }),
  methods: {
    next() {
      window.location = '/'
    }
  },
  mounted() {
    const { numbers, type, singleGraf, single } = this.$store.getters.gameResults;
    this.singleGraf = singleGraf;
    this.single = single;
    
    if (singleGraf) {
      this.type = type;
      this.grafData[0] = {
        numbers: [{
          data: this.numbers.map(el => ({
            y: el === false ? 0 : el
          })),
          label: "Время реакции в милисекундах",
          borderColor: "#90006a",
          fill: false,
          backgroundColor: "#ffffff",
        }],
        label: "Мы измерили скорость вашей реакции и сравним ее с результатами тестов",
        labels: numbers.map((v, i) => i + 1)
      }
    } else {
      this.grafData = [];
      //numbers - все показатели
      //number - показатель один из
      console.log(numbers);
      for (let index in numbers) {
        const graf = numbers[index];
        this.grafData.push({
          label: graf.label,
          labels: graf.lines[0].elements.map((v, i) => i + 1),
          numbers: graf.lines.map(el => {
            return {
              data: el.elements.map(item => item === null ? 0 : item),
              label: el.label,
              borderColor: "#90006a",
              fill: false,
              backgroundColor: "#ffffff",
            }
          })
        })
        this.type = type;
      }
    }
    
    this.loaded = true;
  }
}
</script>