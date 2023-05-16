<template>
    <div class="main">
        <div class="rows">
            {{ range }}
        </div>
        <div class="input">
            <h5>Введите 2 следующих значения последовательности: </h5>
            <div class="row">
                <div class="col">
                    <input type="text" v-model.number="answ[0]">
                </div>
                <div class="col">
                    <input type="text" v-model.number="answ[1]">
                </div>
            </div>
            <div class="row">
                <button class="btn btn-primary" @click="saveAnsw">Ответить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RangeComponent",
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    values: [],
    numbers: [],
    range: "",
    realAnsw: [
    
    ],
    answ: [
      null, null
    ],
    rangeLength: 5,
    pConst: 12,
    startValue: 0,
    lastI: 0
  }),
  created() {
    this.startValue = this.getRandomArr(1, 40)
    this.pConst = this.getRandomArr(1,10)
    this.values.push(this.startValue)
    if (this.type == 1) {
      this.generateFirstTypeRange(this.rangeLength)
    }
    else {
      this.generateSecondTypeRange(this.rangeLength)
    }
    this.range = this.values.join(", ")
    this.startTime = Date.now()
  },
  methods: {
    getRandomArr(start = 1, end = 2) {
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand)
    },
    saveAnsw() {
      if (this.type == 1) {
        this.generateFirstTypeRange(this.lastI + 2, this.lastI)
      }
      else {
        this.generateSecondTypeRange(this.lastI + 2, this.lastI)
      }
      let time = Date.now() - this.startTime
      console.log(this.values, this.answ)
      this.$emit("end", { type: 1, time, success: (
          this.values[this.values.length - 1] == this.answ[1] &&
          this.values[this.values.length - 2] == this.answ[0]
        ) })
    },
    generateFirstTypeRange(length, i = 1) {
      for (i; i < length; i++) {
        const lastItem = this.values[this.values.length - 1]
        this.values.push(lastItem - (this.pConst + i))
      }
      this.lastI = i
    },
    generateSecondTypeRange(length, i = 1) {
      for (i; i < length; i++) {
        const lastItem = this.values[this.values.length - 1]
        this.values.push(lastItem * i + (this.pConst * i))
      }
      this.lastI = i
    }
  }
}
</script>

<style scoped>
  .main {
      background-color: #EFEFEF;
      border-radius: 1rem;
      padding: 3rem;
  }
  .rows {
      font-size: 4rem;
  }
  .row {
      margin-top: 1.5rem;
  }
  .input > h5 {
      margin-top: 2.5rem !important;
  }
  .row > .col {
      display: flex;
      flex-direction: row;
      justify-content: center;
  }
  input {
      text-align: center;
      max-width: 4rem;
  }
</style>