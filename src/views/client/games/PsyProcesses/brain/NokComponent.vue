<template>
    <div class="main">
        <div class="rows">
            В коробке лежат монеты. <br>
            Известно что их можно разложить поровну на {{ text }} штук. <br>
            Какое минимальное число монет может лежать в коробке?
        </div>
        <div class="input">
            <h5>Введите ответ: </h5>
            <div class="row">
                <div class="col">
                    <input type="text" v-model.number="answ">
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
  name: "NokComponent",
  data: () => ({
    numbers: [],
    text: "",
    answ: null,
    time: 0,
  }),
  created() {
    for (let i = 0; i < 3; i++) {
      this.numbers.push(this.getRandomArr(5,20))
    }
    this.text = this.numbers.join(", ")
    this.time = Date.now()
  },
  methods: {
    getRandomArr(start = 1, end = 2) {
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand)
    },
    gcd(a, b) {
      if (b == 0)
        return a;
      return this.gcd(b, a % b);
    },
    findlcm(arr, n) {
      let ans = arr[0];
      for (let i = 1; i < n; i++)
        ans = (((arr[i] * ans)) /
          (this.gcd(arr[i], ans)));
      return ans;
    },
    saveAnsw() {
      const time = Date.now() - this.time;
      console.log(this.findlcm(this.numbers, this.numbers.length))
      this.$emit("end", { type: 1, time, success: this.findlcm(this.numbers, this.numbers.length) == this.answ })
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
      font-size: 3rem;
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