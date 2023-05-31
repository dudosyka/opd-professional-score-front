<template>
    <PsyProcessInterface
            :time-to-end="120"
            :num="mistakes"
            num-label="ошибок"
    >
        <template v-if="step > 1 && step < 2">
            <SlauComponent v-if="step === 1.1" @end="endTest"></SlauComponent>
            <SlauComponent v-if="step > 1.1 && step < 1.3" @end="endTest"></SlauComponent>
            <SlauComponent v-if="step > 1.3" @end="endTest($event, 0.8)"></SlauComponent>
        </template>
        <template v-if="step > 2 && step < 3">
            <RangeComponent v-if="step > 2.1 && step < 2.2" :type="1" @end="endTest"></RangeComponent>
            <RangeComponent v-if="step > 2.2" :type="2" @end="endTest($event, 0.9)"></RangeComponent>
        </template>
        <template v-if="step > 3">
            <NokComponent v-if="step > 3.1 && step < 3.2" @end="endTest($event)"></NokComponent>
            <NokComponent v-if="step > 3.2 && step < 3.3" @end="endTest($event)"></NokComponent>
            <NokComponent v-if="step > 3.3" @end="endTest($event, 0, true)"></NokComponent>
        </template>
        
    </PsyProcessInterface>
</template>

<script>
import PsyProcessInterface from "@/views/client/games/PsyProcesses/PsyProcessInterface.vue";
import SlauComponent from "@/views/client/games/PsyProcesses/brain/SlauComponent.vue";
import RangeComponent from "@/views/client/games/PsyProcesses/brain/RangeComponent.vue";
import NokComponent from "@/views/client/games/PsyProcesses/brain/NokComponent.vue";

export default {
  name: "BrainGame",
  components: {NokComponent, RangeComponent, SlauComponent, PsyProcessInterface},
  data: () => ({
    mistakes: 0,
    step: 1.1,
    results: [],
    timer: 0
  }),
  created() {
    this.timerInterval = setInterval(() => {
      this.timer+=10;
    }, 10)
  },
  methods: {
    endTest(data, step = 0.1, endGame = false) {
      this.results.push(data)
      this.mistakes = this.results.filter(el => !el.success).length
      console.log(this.results)
      if (endGame) {
        this.gameEnded()
        return
      }
      this.step+=step
      console.log(this.step)
    },
    gameEnded() {
      this.$store.dispatch('setGameResults', {
        singleGraf: false,
        combine: true,
        type: 8,
        numbers: [ //multi graf result
          {
            label: `
            Общее время теста: ${Math.round(this.timer / 1000)} секунд<br>
            В ходе теста вы совершили следующее число ошибок: ${this.mistakes}<br>
            В среднем на прохождение задания вы тратили вы тратили: ${Math.round(this.results.map(el => el.time).reduce((a, b) => a+b ) / this.results.length / 1000)} секунд<br>
            Мы измерили время вашего теста и сравним его с результатами тестов. `,
            lines: [{
              label: `Время на нахождение задания (с)`,
              elements: [...this.results.map(el => Math.round(el.time / 1000))],
              addition: {
                timeOnTest: Math.round(this.timer / 1000),
                fails: this.mistakes
              }
            }],
          },
        ],
      });
      
      this.$router.push('/game/results');
    }
  }
}
</script>

<style scoped>

</style>