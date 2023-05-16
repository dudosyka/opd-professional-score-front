<template>
  <div class="main">
      <div class="rows">
          <div v-for="l in slau" class="col">
              {{ l.string }} = {{ l.answ }}
          </div>
      </div>
      <div class="input">
          <h5>Введите значения неизвестных: </h5>
          <div class="row">
              <div class="col">
                  <input type="text" v-model.number="answ[0]">
              </div>
              <div class="col">
                  <input type="text" v-model.number="answ[1]">
              </div>
              <div class="col">
                  <input type="text" v-model.number="answ[2]">
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
  name: "SlauComponent",
  props: {
  },
  data: () => ({
    unknownNumbers: 3,
    letters: ["A", "B", "C"],
    numbers: [],
    slau: [],
    answ: [
      null, null, null
    ],
    startTime: 0
  }),
  created() {
    for (let i = 0; i < this.unknownNumbers; i++) {
      this.numbers.push(this.getRandomArr(1, 50))
    }
    
    this.slau.push({
      string: "A + B + C + C",
      answ: this.numbers[0] + this.numbers[1] + this.numbers[2] * 2
    })
    this.slau.push({
      string: "A + C",
      answ: this.numbers[0] + this.numbers[2]
    })
    this.slau.push({
      string: "A + B",
      answ: this.numbers[0] + this.numbers[1]
    })
    
    this.startTime = Date.now()
  },
  methods: {
    getRandomArr(start = 1, end = 2) {
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand)
    },
    saveAnsw() {
      let time = Date.now() - this.startTime
      for (let i = 0; i < this.unknownNumbers; i++) {
        if (this.numbers[i] != this.answ[i]) {
          this.$emit("end", { type: 1, time, success: false })
          return
        }
      }
      this.$emit("end", { type: 1, time, success: true })
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