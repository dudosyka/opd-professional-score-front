<template>
    <ModalContainer
      :show-header="true"
      header-title="Ваш текущий результат"
      :show-btn-next="true"
      :btn-next="next"
    >
        <div class="graf">
            <canvas id="line-chart"> </canvas>
            <p class="small_text">
                Мы измерили скорость вашей реакции и сравним ее с результатами тестов
            </p>
            <p class="small_text" v-if="type == 3 || type == 4">
                Если вы видите на графике нулевые значения - это означает, что в этом весте вы нажали не ту клавишу
            </p>
        </div>
    </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "GameResult",
  components: {ModalContainer},
  data: () => ({
    numbers: [1,2,3,4,5,6],
    type: 1
  }),
  methods: {
    next() {
      window.location = '/'
    }
  },
  created() {
    const { numbers, type } = this.$store.getters.gameResults;
    this.numbers = numbers;
    this.type = type;
  },
  mounted() {
    const labels = this.numbers.map((v, i) => i + 1);
    const data = this.numbers.map(el => ({
      y: el === false ? 0 : el
    }));
    console.log(labels, data);
    new ChartJs(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          label: "Время реакции в милисекундах",
          borderColor: "#90006a",
          fill: false,
          backgroundColor: "#ffffff",
        }]
        
      },
    });
  }
}
</script>

<style scoped>
  .graf {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      max-width: 800px;
  }
  .big_text, .small_text {
      margin-top: 1.5rem;
      width: 100%;
  }
  #line-chart {
      max-width: 800px;
  }
</style>