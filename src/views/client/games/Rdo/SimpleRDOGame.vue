<template>
  <RdoInterface
          :results="results"
          :time-to-end="timeOnTest"
          :keys="['Space']"
          :show-time="rdo.settings.showTime"
          :show-res="rdo.settings.showResByMinute"
          @time="endGame"
  >
      <SimpleRDO
              :control-key-code="'Space'"
              :speed-prop="0.75"
              :canvas-id="`can1`"
              :time-to-end="timeOnTest"
              :increase-time="rdo.settings.speed.increaseTime"
              :increase-size="rdo.settings.speed.increaseSize"
              :increase-frequency="rdo.settings.speed.increaseFrequency"
              :start-delay="rdo.settings.startDelay"
              @result="newResult"
      ></SimpleRDO>
  </RdoInterface>
</template>

<script>
import SimpleRDO from "@/views/client/games/Rdo/RdoComponent.vue";
import RdoInterface from "@/views/client/games/Rdo/RdoInterface.vue";

export default {
  name: "SimpleRDOGame",
  components: {RdoInterface, SimpleRDO},
  data: () => ({
    results: [],
    timeOnTest: 5,
    rdo: {
      settings: {
        speed: {}
      }
    }
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    this.timeOnTest = onPass.settings.time;
    this.rdo.settings = {...onPass.settings}
  },
  methods: {
    newResult(result) {
      this.results.push(result.res);
      console.log(result);
    },
    endGame() {
      this.$store.dispatch('setGameResults', {
        singleGraf: false,
        combine: true,
        type: 6,
        numbers: [ //multi graf result
          {
            label: "Мы измерили скорость вашей реакции и сравним ее с результатами тестов",
            lines: [
              {
                label: "Модуль отклонения (мс)",
                elements: [...this.results.sort((a, b) => a.time - b.time).map(el => Math.round(el.timeD))]
              }
            ]
          }
        ],
      });
      
      this.$router.push('/game/results');
    }
  }
}
</script>

<style scoped>

</style>