<template>
    <watching-interface
      :time-to-end="timeToEnd"
      :results="lastResults"
      @time="endGame()"
    >
        <div class="line" id="box">
            <div id="pointer" class="target"></div>
            <div id="ball" class="ball"></div>
        </div>
    </watching-interface>
</template>

<script>
// Накрываем мишенью
import WatchingInterface from "@/views/client/games/Mouse/WatchingInterface.vue";

export default {
  name: "WatchingPursuitGame",
  components: {WatchingInterface},
  data: () => ({
    timeToEnd: 30,
    statDumpPeriod: 10,
    seconds: 0,
    delay: {
      start: 800,
      end: 1200
    },
    ballStep: {
      start: 100,
      end: 350
    },
    ball: null,
    ballElement: null,
    crd: null,
    mouseX: 0,
    move: {
      startTime: 0,
      startPoint: 0,
      catched: false,
      moveTotalDeviation: 0,
      curBallLeft: 0,
      timeOnMove: null,
      stopAfterMove: 0, //ms
      firstConnectAfterMove: 0,
      wasMovedAfterChange: false,
    },
    firstConnect: true,
    results: [],
    minuteResults: [],
    intervals: [],
    gameEnded: false,
  }),
  mounted() {
    const boxElem = document.getElementById('box');
    const pointerElem = document.getElementById('pointer');
    this.ball = document.getElementById('ball').getBoundingClientRect();
    this.ballElement = document.getElementById('ball');
    this.crd = boxElem.getBoundingClientRect();
    let posX = 0;
    let posY = 0;
    
    window.onmousemove = (event) => {
      this.mouseX = event.pageX;
      const mouseY = window.innerHeight / 2;
      
      posX = this.mouseX - this.crd.left;
      posY = mouseY - this.crd.top - this.crd.height / 2;
      
      const ballLeft = Math.abs(this.crd.left - this.ball.left + ((pointerElem.offsetWidth - this.ball.width) / 2) );
      
      //If we havent catched the ball yet:
      if (Math.abs(ballLeft + this.move.curBallLeft - posX) > this.ball.width * 0.75 && !this.move.catched) {
        if (this.move.startPoint > this.move.curBallLeft) { //Ball is lefter than target
          if ((this.mouseX - this.move.startPoint) < 0) {
            if (Math.abs(this.mouseX - this.move.startPoint) > this.move.moveTotalDeviation)
              this.move.moveTotalDeviation = Math.abs(this.mouseX - this.move.startPoint);
          }
        } else {
          if ((this.move.startPoint - this.mouseX) < 0) {
            if (Math.abs(this.move.startPoint - this.mouseX) > this.move.moveTotalDeviation)
              this.move.moveTotalDeviation = Math.abs(this.move.startPoint - this.mouseX);
          }
        }
      }
      
      if (Math.abs(ballLeft + this.move.curBallLeft - posX) <= this.ball.width * 0.75) {
        if (this.move.firstConnectAfterMove == 0) {
          this.move.firstConnectAfterMove = Date.now();
          return;
        }
        if (!this.move.catched && (Date.now() - this.move.firstConnectAfterMove) > 100) {
          this.move.catched = true;
          this.results.push({
            timeOnMove: Date.now() - this.move.startTime,
            moveTotalDeviation: Math.abs(this.move.moveTotalDeviation),
          });
          console.log(this.results)
        }
      } else {
        this.move.firstConnectAfterMove = 0;
        this.firstConnect = true;
        this.move.stopAfterMove = 0;
      }
      
      if (this.mouseX > this.crd.left && this.mouseX < this.crd.right - pointerElem.offsetWidth)
        pointerElem.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
    };
    
    this.intervals.push(setInterval(() => {
      const ballLeft = Math.abs(this.crd.left - this.ball.left + ((pointerElem.offsetWidth - this.ball.width) / 2) );
      if (Math.abs(ballLeft + this.move.curBallLeft - posX) <= this.ball.width * 0.75) {
        this.ballElement.classList.add(['target-active']);
        this.seconds+=20;
      } else {
        this.ballElement.classList.remove(['target-active']);
      }
    }, 20));
    this.intervals.push(setInterval(this.dumpStat, this.statDumpPeriod*1000));
    this.makeMove();
  },
  methods: {
    getRandomDelay() {
      const { start, end } = this.delay;
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand);
    },
    getRandomStep() {
      const { start, end } = this.ballStep;
      let rand = start - 0.5 + Math.random() * (end - start + 1);
      return Math.round(rand);
    },
    getRandomDirection() {
      let rand = 1 - 0.5 + Math.random() * (2 - 1 + 1);
      return Math.round(rand);
    },
    setMoveDataNull(curBallLeft) {
      this.move = {
        ...this.move,
        catched: false,
        startPoint: this.mouseX,
        moveTotalDeviation: 0,
        timeOnMove: 0,
        startTime: Date.now(),
        curBallLeft
      };
    },
    makeMove() {
      if (this.gameEnded)
        return;
      setTimeout(() => {
        const step = this.getRandomStep();
        const left = this.getRandomDirection() == 2 ? -1 : 1;
        this.ballElement.style.transform = 'translate3d(' + (step*left) + 'px, ' + 0 + 'px, 0px)';
        if (this.move.catched == false) {
          this.results.push({
            timeOnMove: 0,
            moveTotalDeviation: 0,
          })
        }
        this.setMoveDataNull(step * left);
        setTimeout(() => {
          this.ballElement.style.transform = 'translate3d(' + 0 + 'px, ' + 0 + 'px, 0px)';
          this.results.push({
            timeOnMove: 0,
            moveTotalDeviation: 0,
          })
          this.setMoveDataNull(0);
          this.makeMove();
        }, this.getRandomDelay())
      }, this.getRandomDelay());
    },
    dumpStat() {
      if (!this.results.length) {
        return this.minuteResults.push({
          timeOnMove: 0,
          moveTotalDeviation: 0,
        })
      }
      this.minuteResults.push({
        timeOnMove: Math.round(this.results.map(el => el.timeOnMove).filter(el => el < Date.now() / 2).reduce((a, b) => a + b) / this.results.length),
        moveTotalDeviation: Math.round(this.results.map(el => el.moveTotalDeviation).reduce((a, b) => a + b) / this.results.length),
      });
      this.results = [];
    },
    endGame() {
      this.gameEnded = true;
      this.intervals.forEach(el => clearInterval(el));
      this.dumpStat();
      this.$store.dispatch('setGameResults', {
        singleGraf: false,
        combine: true,
        type: 8,
        numbers: [ //multi graf result
          {
            label: `По результатам теста вам удалось удерживать мишень на круге на протяжении ${Math.round((this.seconds / 1000)/this.timeToEnd*100)}% времени. Также, мы измерили скорость вашей реакции и сравним ее с результатами тестов. `,
            lines: [{
              label: `Среднее время реакции (мс)`,
              elements: [...this.minuteResults.sort((a, b) => a.time - b.time).map(el => el.timeOnMove)]
            }],
          },
        ],
      });
      
      this.$router.push('/game/results');
    }
  },
  computed: {
    lastResults() {
      return this.minuteResults.length ? this.minuteResults[this.minuteResults.length - 1] : {}
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
  .line {
      height: 100px;
      background-color: white;
      width: 50vw;
      min-width: 700px;
      border-radius: 10px;
  }
  .target {
      position: absolute;
      margin-top: 5px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: transparent;
      border: 5px solid #f43f3f;
      box-shadow: 0 0 10px #f43f3f, 0 0 10px inset #f43f3f;
  }
  .ball {
      margin-top: 15px;
      left: 47%;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: absolute;
      background-color: rgba(107, 106, 106, 0.42);
      box-shadow: 0 0 10px rgba(125, 124, 124, 0.2);
      backdrop-filter: blur(10px) saturate(150%);
      transition-duration: 0.5s;
  }
  .target-active {
      background-color: rgba(193, 81, 81, 0.4);
      box-shadow: 0 0 10px rgba(193, 81, 81, 0.4);
  }
</style>