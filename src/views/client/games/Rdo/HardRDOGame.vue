<template>
    <RdoInterface
            v-if="loaded"
            :results="results"
            :time-to-end="timeOnTest"
            :keys="keyLabels"
            :show-time="rdos[0].settings.showTime"
            :show-res="rdos[0].settings.showResByMinute"
            @time="endGame"
    >
        <SimpleRDO
                v-for="rdo in rdos"
                :id="rdo.id"
                :control-key-code="rdo.key.code"
                :speed-prop="rdo.speed"
                :canvas-id="`can${rdo.id}`"
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
  name: "HardRDOGame",
  components: {RdoInterface, SimpleRDO},
  data: () => ({
    results: [],
    timeOnTest: 5,
    rdos: [
      {
        id: 1,
        key: {
          code: 'KeyS',
          title: 'S'
        },
        speed: 0.4,
        results: []
      },
      {
        id: 2,
        key: {
          code: 'KeyD',
          title: 'D'
        },
        speed: 0.6,
        results: []
      },
      {
        id: 3,
        key: {
          code: 'KeyF',
          title: 'F'
        },
        speed: 0.8,
        results: []
      }
    ],
    loaded: false
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    this.timeOnTest = onPass.settings.time;
    this.rdos = this.rdos.map(el => {
      return {
        ...el,
        settings: {
          ...onPass.settings
        }
      }
    })
    this.loaded = true
  },
  methods: {
    newResult(res) {
      this.results.push(res.res);
      this.rdos.find(el => el.id == res.id).results.push(res.res)
      console.log(res);
    },
    endGame() {
      this.$store.dispatch('setGameResults', {
        singleGraf: false,
        combine: true,
        type: 6,
        numbers: [ //multi graf result
          {
            label: "Мы измерили скорость вашей реакции и сравним ее с результатами тестов",
            lines: this.rdos.map(el => (
              {
                label: `Модуль отклонения на круге ${el.id} (мс)`,
                elements: el.results.length ? [...el.results.sort((a, b) => a.time - b.time).map(el => el.timeD)] : []
              }
            )),
            // lines: [
            //   {
            //     label: `Модуль отклонения (мс)`,
            //     elements: [...this.results.sort((a, b) => a.time - b.time).map(el => el.timeD)]
            //   }
            // ]
          }
        ],
      });
      
      this.$router.push('/game/results');
    }
  },
  computed: {
    keyLabels() {
      return this.rdos.map(el => {
        return el.key.title
      })
    }
  }
}
</script>

<style scoped>
</style>