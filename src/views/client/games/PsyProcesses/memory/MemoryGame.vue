<template>
  <PsyProcessInterface
    :time-to-end="120"
    :num="tryCount"
    num-label="попыток"
  >
      <div class="table" v-if="matrix.length">
          <div class="table-row" v-for="indexY in matrix.length">
              <div class="table-col cellType2" v-for="indexX in matrix[0].length" @click="clicked(indexY - 1, indexX - 1)">
                  <i v-if="matrix[indexY - 1][indexX - 1].showIcon" class="fa-regular fa-diamond"></i>
                  <Transition
                          name="custom-classes"
                          enter-active-class="animate__animated animate__flipInY"
                          leave-active-class="animate__animated animate__flipOutY"
                  >
                      <span v-if="matrix[indexY - 1][indexX - 1].showNumber">{{matrix[indexY - 1][indexX - 1].value}}</span>
                  </Transition>
              </div>
          </div>
      </div>
  </PsyProcessInterface>
</template>

<script>
import PsyProcessInterface from "@/views/client/games/PsyProcesses/PsyProcessInterface.vue";
import TableBox from "@/views/client/games/PsyProcesses/attention/TableBox.vue";


class Cell {
  type
  value
  showNumber
  showIcon
  blocked
  constructor(type, value) {
    this.type = type
    this.value = value
    this.showNumber = false
    this.showIcon = true
    this.blocked = false
  }
}

export default {
  name: "MemoryGame",
  components: {TableBox, PsyProcessInterface},
  data: () => ({
    gameInit: {
      matrixSize: 3,
      startGameDelay: 10000
    },
    matrix: [],
    timer: 0,
    clicks: [],
    randNumbers: [],
    tryCount: 0,
    lastCatchTime: 0,
    results: [],
    passPhrase: "",
    keyToPress: [
      {code: "KeyV", letter: "М"},
      {code: "KeyJ", letter: "О"},
      {code: "KeyQ", letter: "Й"},
      {code: "Space", letter: " "},
      {code: "KeyI", letter: "I"},
      {code: "KeyQ", letter: "Q"},
      {code: "Space", letter: " "},
      {code: "Digit6", letter: "6"},
      {code: "Digit9", letter: "9"},
    ],
    curKeyOnPress: 0
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    this.gameInit.matrixSize = (onPass.settings.matrixSize ? onPass.settings.matrixSize : 3) + 1
    this.gameInit.startGameDelay = onPass.settings.startGameDelay ? onPass.settings.startGameDelay : 10000
    this.init()
    for (let i = 0; i < this.gameInit.matrixSize - 1; i++) {
      for (let j = 0; j < this.gameInit.matrixSize - 1; j++) {
        this.matrix[i][j].showNumber = true
        this.matrix[i][j].showIcon = false
      }
    }
    setTimeout(() => {
      for (let i = 0; i < this.gameInit.matrixSize - 1; i++) {
        for (let j = 0; j < this.gameInit.matrixSize - 1; j++) {
          this.matrix[i][j].showNumber = false
          this.matrix[i][j].showIcon = true
        }
      }
      document.addEventListener("keydown", e => {
        if (!e)
          return
        
        if (e.code == this.keyToPress[this.curKeyOnPress].code) {
          this.passPhrase += this.keyToPress[this.curKeyOnPress].letter
          console.log(this.passPhrase)
          this.curKeyOnPress++
          if (this.curKeyOnPress == this.keyToPress.length) {
            console.log("Поздравляем режим 'Башка' разблокирован!")
            this.init(true)
          }
        } else {
          console.log("Ошибка ввода пароля!")
          this.passPhrase = ""
        }
      })
    }, this.gameInit.startGameDelay)
  },
  methods: {
    init(iq69) {
      this.timerInterval = setInterval(() => {
        this.timer+=10;
      }, 10)
      if (iq69) {
        this.clicks = []
        this.matrix = []
        this.tryCount = 0
        this.lastCatchTime = Date.now()
        this.results = []
        this.timer = 0
        
        for (let i = 1; i < 2; i++) {
          this.randNumbers.push(i)
          this.randNumbers.push(i)
        }
        
        for (let i = 1; i < 2; i++) {
          this.matrix.push([])
          for (let j = 1; j < 3; j++) {
            let index = this.getRandomArr(1, this.randNumbers.length)
            this.matrix[i - 1].push(new Cell(2, this.randNumbers[index - 1]))
            this.randNumbers.splice(index - 1, 1)
          }
        }
        return
      }
      
      const actual =this.gameInit.matrixSize - 1
      for (let i = 1; i < (actual * actual) / 2 + 1; i++) {
        this.randNumbers.push(i)
        this.randNumbers.push(i)
      }
      for (let i = 1; i < this.gameInit.matrixSize; i++) {
        this.matrix.push([])
        for (let j = 1; j < this.gameInit.matrixSize; j++) {
          let index = this.getRandomArr(1, this.randNumbers.length)
          this.matrix[i - 1].push(new Cell(2, this.randNumbers[index - 1]))
          this.randNumbers.splice(index - 1, 1)
        }
      }
      this.lastCatchTime = Date.now()
    },
    getRandomArr(start = 1, end = 2) {
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand)
    },
    checkGameEnded() {
      let ended = true
      this.matrix.forEach(
        el => el.forEach( item => {
          if (!item.blocked)
            ended = false
        } )
      )
      if (ended) {
        this.gameEnded()
      }
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
            В ходе теста вы использовали следующее число попыток: ${this.tryCount}<br>
            В среднем на нахождение каждой пары вы тратили: ${Math.round(this.results.map(el => el.time).reduce((a, b) => a+b ) / this.results.length)} мс<br>
            Мы измерили время вашего теста и сравним его с результатами тестов. `,
            lines: [{
              label: `Время на нахождение пары (мс)`,
              elements: [...this.results.map(el => el.time)],
              addition: {
                avTimeOnMove: Math.round(this.results.map(el => el.time).reduce((a, b) => a+b ) / this.results.length),
                attempts: this.tryCount
              }
            }],
          },
        ],
      });
      
      this.$router.push('/game/results');
    },
    clicked(y, x) {
      let item = this.matrix[y][x]
      if (this.clicks.length > 1 || this.clicks.includes(item) || item.blocked)
        return
      this.clicks.push(item)
      item.showNumber = true
      item.showIcon = false
      
      if (this.clicks.length == 2) {
        this.tryCount++
        if (this.clicks[0].value == this.clicks[1].value) {
          this.clicks.forEach(el => {
            el.blocked = true
          })
          this.results.push({
            time: Date.now() - this.lastCatchTime
          })
        }
        setTimeout(() => {
          this.clicks.forEach(el => {
            if (this.clicks[0].value != this.clicks[1].value)
              el.showNumber = false
          })
          setTimeout(() => {
            this.clicks.forEach(el => {
              if (this.clicks[0].value != this.clicks[1].value)
                el.showIcon = true
            })
            setTimeout(() => {
              if (this.clicks[0].value == this.clicks[1].value) {
                this.clicks.forEach(el => {
                  el.showNumber = true
                  el.showIcon = false
                  el.blocked = true
                })
              }
              this.lastCatchTime = Date.now()
              this.checkGameEnded()
              this.clicks = []
            }, 300)
          }, 700)
        }, 1000)
        
      }
    },
  }
}
</script>

<style scoped>
  .table {
      display: flex;
      flex-direction: row;
      justify-content: center;
  }
  .table-row {
      display: flex;
      flex-direction: column;
  }
  .table-col {
      width: 90px;
      height: 90px;
      font-size: 1.4rem;
      border: white solid 1px;
      background-color: #D3D3D3;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition-duration: .3s;
      margin: .4rem;
  }
  .cellType1 {
      background-color: darkred;
  }
  .cellType1:hover {
      background-color: #dc0000;
      box-shadow: inset 0 0 10px white;
  }
  .cellType2 {
      background-color: #304184;
  }
  .cellType2:hover {
      background-color: #095ddf;
      box-shadow: inset 0 0 10px white;
  
  }
</style>