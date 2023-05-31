<template>
    <PsyProcessInterface
            :time-to-end="120"
            :num="mistakesCount.toString()"
            num-label="ошибок"
    >
      <div class="table" v-if="matrix.length">
          <div class="table-row" v-for="indexY in matrix.length">
            <div class="table-col" :class="`cellType${getCellType(indexY, indexX)}`" v-for="indexX in matrix[0].length" @click="clicked(indexY - 1, indexX - 1)">
                <TableBox>{{ matrix[indexY - 1][indexX - 1].value }}</TableBox>
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
  constructor(type, value) {
    this.type = type
    this.value = value
  }
}

export default {
  name: "AttentionGame",
  components: {TableBox, PsyProcessInterface},
  data: () => ({
    redArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    blackArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    matrix: [],
    clickCount: 0,
    lastClickTime: 0,
    mistakesOnClick: 0,
    mistakesCount: 0,
    timer: 0,
    results: []
  }),
  created() {
    this.timerInterval = setInterval(() => {
      this.timer+=10;
    }, 10)
    for (let i = 1; i < 8; i++) {
      this.matrix.push([])
      for (let j = 1; j < 8; j++) {
        let randArr = this.getRandomArr()
        this.matrix[i - 1].push(new Cell(randArr, this.generateRandomPoint(randArr)))
      }
    }
  },
  methods: {
    generateRandomPoint(randArr) {
      let start = 1
      let end
      if (randArr == 1) {
        end = this.redArr.length
      } else {
        end = this.blackArr.length
      }
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      let index = Math.round(rand) - 1;
      let value = randArr == 1 ? this.redArr[index] : this.blackArr[index]
      if (randArr == 1) {
        this.redArr.splice(index, 1)
      }
      if (randArr == 2) {
        this.blackArr.splice(index, 1)
      }
      console.log(this.redArr, this.blackArr)
      return value
    },
    getRandomArr(start = 1, end = 2) {
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      let res = Math.round(rand);
      if (res == 1 && this.redArr.length == 0) {
        return 2
      }
      if (res == 2 && this.blackArr.length == 0) {
        return 1
      }
      return res
    },
    getCellType(y, x) {
      return this.matrix[y - 1][x - 1].type
    },
    clicked(y, x) {
      this.clickCount++
      let item = this.matrix[y][x]
      let type = this.clickCount % 2 + 1
      let res = false
      if (item.type == type) {
        if (type == 1)
          res = item.value == 24 - (this.clickCount / 2 - 1)
        else
          res = item.value == (this.clickCount + 1) / 2
      }
      if (!res) {
        this.$store.dispatch("showPopUp", {
          success: false,
          text: "Ошибка! Не верный порядок!"
        })
        this.mistakesCount++
        this.mistakesOnClick++
        this.clickCount--
      }
      else {
        this.results.push({
          mistakes: this.mistakesOnClick,
          time: this.timer - this.lastClickTime
        })
        this.mistakesOnClick = 0
        this.lastClickTime = this.timer
      }
      if (this.clickCount == 49) {
        alert("Game ended!")
        this.gameEnd()
      }
    },
    gameEnd() {
      this.$store.dispatch('setGameResults', {
        singleGraf: false,
        combine: true,
        type: 8,
        numbers: [ //multi graf result
          {
            label: `
            Общее время теста: ${Math.round(this.timer / 1000)} секунд<br>
            В ходе теста вы допустили следующее кол-во ошибок: ${this.mistakesCount}<br>
            В среднем на нахождение одного числа вы тратите: ${Math.round(this.results.map(el => el.time).reduce((a, b) => a+b ) / this.results.length)} мс<br>
            Мы измерили время вашего теста и сравним его с результатами тестов. `,
            lines: [{
              label: `Время на клик (мс)`,
              elements: [...this.results.map(el => el.time)],
              addition: {
                avTimeOnMove: Math.round(this.results.map(el => el.time).reduce((a, b) => a+b ) / this.results.length),
                fails: this.mistakesCount
              }
            }],
          },
        ],
      });
      
      this.$router.push('/game/results');
    }
  },
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
      width: 85px;
      height: 85px;
      font-size: 1.4rem;
      border: black solid 1px;
      background-color: #D3D3D3;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition-duration: .3s;
  }
  .cellType1 {
      background-color: darkred;
  }
  .cellType1:hover {
      background-color: #dc0000;
      box-shadow: inset 0 0 10px white;
  }
  .cellType2 {
      background-color: black;
  }
  .cellType2:hover {
      background-color: #313131;
      box-shadow: inset 0 0 10px white;
      
  }
</style>