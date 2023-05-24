<template>
  <div class="background">
    <div class="numbers">
        <span>{{ firstNum }}</span>
        <span>{{ secondNum }}</span>
    </div>
  </div>
  <div class="instruction-static">
      <div class="col progress-col">
          <div class="progress">
              Прогресс {{ gameStatic.iterationPassed }} / {{ gameStatic.iterationCount }}
          </div>
          <div class="progress">
              Правильно {{ results.filter(el => el !== false && el !== null).length }} / {{ gameStatic.iterationCount }}
          </div>
      </div>
      <div class="key-block">
            <div class="label">
                Чётное
            </div>
            <div class="key">
                S
            </div>
        </div>
      <div class="key-block">
            <div class="label">
                Не чётное
            </div>
            <div class="key">
                D
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "HardNumberGame",
  data: () => ({
    gameSettingsInput: {
      repeat: 10,
      // time: 1000*60*1 // 1 minute in ms
      time: 1000*60*0.5,
      simplicity: {
        minNum: 1,
        maxNum: 20
      },
      circleTimeRange: {
        //min and max time between iterations in ms
        min: 7000,
        max: 8500
      },
      startDelay: 2000,
      switchTime: 200,
    },
    gameStatic: {
      ended: false,
      changeTime: 0,
      clicked: true,
      iterationCount: 10,
      iterationPassed: 0,
      answer: 0,
      keyToDivisionReminder: {
        'KeyS': 0,
        'KeyD': 1
      }
      
    },
    utterance: null,
    results: [],
    firstNum: null,
    secondNum: null,
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    console.log(onPass);
    if (!onPass || !onPass.settings) {
      window.location = '/'
    }
    this.gameSettingsInput = { ...onPass.settings }
    window.addEventListener('keydown', (e) => {
      if (e.code == 'KeyS' || e.code == 'KeyD') {
        this.keyDown(e.code);
      }
    });
    this.startGame();
  },
  methods: {
    generateRandom() {
      const { min, max } = this.gameSettingsInput.circleTimeRange;
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    generateRandomNumber() {
      const { minNum, maxNum } = this.gameSettingsInput.simplicity;
      let rand = minNum - 0.5 + Math.random() * (maxNum - minNum + 1);
      return Math.round(rand);
    },
    startGame() {
      this.$store.commit('clearGameResults');
      if (this.gameSettingsInput.time) {
        this.gameStatic.iterationCount = Math.round(this.gameSettingsInput.time / (this.gameSettingsInput.switchTime + this.gameSettingsInput.circleTimeRange.max));
      } else {
        this.gameStatic.iterationCount = this.gameSettingsInput.repeat;
      }
      console.log(this.gameStatic.iterationCount);
      setTimeout(() => {
        
        this.iteration()
      }, this.gameSettingsInput.startDelay);
    },
    keyDown(code) {
      if (this.gameStatic.clicked)
        return;
      this.gameStatic.clicked = true;
      const clickTime = Date.now() - this.gameStatic.changeTime;
      
      if (this.gameStatic.answer == this.gameStatic.keyToDivisionReminder[code])
        this.results.push(clickTime);
      else
        this.results.push(0);
      
      console.log(this.gameStatic.iterationPassed, this.results);
      
      if (this.gameStatic.iterationCount <= this.gameStatic.iterationPassed)
        this.endGame();
    },
    iteration() {
      //If user didnt click in this iteration
      if (this.gameStatic.clicked === false && this.gameStatic.iterationPassed > 0) {
        this.results.push(0);
      }
      if (this.gameStatic.ended)
        return;
      if (this.gameStatic.iterationCount <= this.gameStatic.iterationPassed) {
        this.endGame();
        return;
      }
      
      setTimeout(() => {
        this.iteration();
      }, this.generateRandom())
      
      
      this.gameStatic.changeTime = Date.now();
      this.gameStatic.iterationPassed++;
      this.gameStatic.clicked = false;
      
      this.iterationAction();
    },
    iterationAction() {
      this.firstNum = this.generateRandomNumber();
      this.secondNum = this.generateRandomNumber();
      console.log(this.firstNum, '+', this.secondNum, '=', this.firstNum + this.secondNum)
      this.gameStatic.answer = (this.firstNum + this.secondNum) % 2;
      setTimeout(() => {
        this.firstNum = this.secondNum = null;
      }, this.gameSettingsInput.switchTime)
    },
    clearIteration() {
      console.log('called');
      this.gameStatic.iterationPassed++;
      this.gameStatic.changeTime = Date.now();
      this.gameStatic.clicked = false;
    },
    endGame() {
      this.gameStatic.ended = true;
      console.log('GAME ENDED', this.results, [...this.results]);
      this.$store.dispatch('setGameResults', {
        type: 4,
        numbers: [...this.results],
      });
      
      this.$router.push('/game/results');
    }
  }
}
</script>

<style scoped>
  .background {
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: 99999;
      background-color: #0e2431;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
  }
  .numbers {
      display: flex;
      flex-direction: row;
      width: 250px;
      justify-content: space-around;
  }
  .numbers span {
      border: 1px solid white;
      border-radius: .7rem;
      padding: 1rem;
      color: white;
      font-size: 3rem;
  }

  .instruction-static {
      display: flex;
      flex-direction: row;
      width: 70vw;
      justify-content: space-around;
      position: absolute;
      z-index: 9999999;
      left: 1rem;
      bottom: 1rem;
  }
  .key-block, .progress {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgba(162, 162, 162, 0.4);
      padding: 1.75rem;
  }
  .progress {
      max-width: 200px;
  }

  .key-block > .label, .progress {
      color: #EFEFEF;
      font-size: 1rem;
      margin-right: 1rem;
  }
  .key-block > .key {
      color: #EFEFEF;
      font-size: 3rem;
      padding: .5rem;
      border-radius: .5rem;
      background-color: #0e2431;
  }
  .progress-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
</style>