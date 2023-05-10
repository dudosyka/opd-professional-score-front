<template>
    <watching-interface
            :time-to-end="gameSettings.timeOnTest"
            :show-res="gameSettings.showResByMinute"
            :show-time="gameSettings.showTime"
            :results="lastResults"
            :show-mid-length="false"
            @time="endGame()"
    >
        <div class="line" id="box">
            <div id="target" class="target"></div>
            <div id="ball" class="ball"></div>
        </div>
    </watching-interface>
</template>

<script>
// Накрываем мишенью
import WatchingInterface from "@/views/client/games/Mouse/WatchingInterface.vue";

export default {
  name: "WatchingAnalogGame",
  components: {WatchingInterface},
  data: () => ({
    gameSettings: {
      timeOnTest: 120,
      showResByMinute: true,
      showTime: true,
    },
    blocked: true,
    timeToEnd: 30,
    statDumpPeriod: 60,
    seconds: 0,
    delay: {
      start: 800,
      end: 1200
    },
    ballStep: {
      start: 200,
      end: 320
    },
    ball: null,
    ballElement: null,
    crd: null,
    mouseX: 0,
    move: {
      posX: 0,
      startTime: 0,
      startPoint: 0,
      catched: false,
      timeOnMove: null,
    },
    results: [],
    minuteResults: [],
    intervals: [],
    gameEnded: false,
    initMouse: false,
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    this.gameSettings = {
      ...onPass.settings,
      timeOnTest: onPass.settings.time
    }
    this.delay = {
      start: onPass.settings.circleTimeRange.min,
      end: onPass.settings.circleTimeRange.max
    }
  },
  mounted() {
    this.ball = document.getElementById('ball').getBoundingClientRect();
    this.ballElement = document.getElementById('ball');
    this.crd = document.getElementById('box').getBoundingClientRect();
    this.ballElement.style.left = `${this.crd.left + this.crd.width / 2 - this.ball.width / 2}px`;
    
    document.getElementById('target').style.transform = `translate3d(${this.crd.width / 2 - document.getElementById('target').getBoundingClientRect().width / 2}px, 0px, 0px`;
    let posY = 0;
    
    let lastCount = Date.now();
    
    window.onmousemove = (event) => {
      if (this.gameEnded)
        return;
      this.ball = document.getElementById('ball').getBoundingClientRect();
      if (this.initMouse === false) {
        this.initMouse = event.pageX;
        this.makeMove()
      }
      this.mouseX = event.pageX;
      const mouseY = window.innerHeight / 2;
      
      if (this.blocked)
        return;
      
      const deltaPosX = this.mouseX - this.move.startPoint;
      
      this.move.startPoint = this.mouseX;
      this.move.posX = this.ball.left + deltaPosX;
      posY = mouseY - this.crd.top - this.crd.height / 2;
      
      if (!(this.move.posX > this.crd.left && this.move.posX < this.crd.left + this.crd.width - this.ball.width)) {
        this.move.posX -= deltaPosX;
        return;
      }
      
      this.ballElement.style.left = `${this.move.posX}px`;
    };
    
    this.intervals.push(setInterval(() => {
      if (Math.abs(this.move.posX + this.ball.width / 2 - (this.crd.left + this.crd.width / 2)) <= this.ball.width * 0.40) {
        this.ballElement.classList.add(['target-active']);
        if (!this.move.catched) {
          this.move.catched = true;
          this.results.push({
            timeOnMove: Date.now() - this.move.startTime,
          });
          this.blocked = true;
          this.makeMove();
        }
        if (Date.now() - lastCount > 1000) {
          this.seconds++;
          
          lastCount = Date.now();
        }
      } else {
        this.ballElement.classList.remove(['target-active']);
        lastCount = Date.now();
      }
    }, 20));
    this.intervals.push(setInterval(this.dumpStat, this.statDumpPeriod*1000));
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
    setMoveDataNull() {
      this.move = {
        ...this.move,
        posX: this.move.posX,
        catched: false,
        startPoint: this.mouseX,
        timeOnMove: 0,
        startTime: Date.now(),
      };
    },
    makeMove() {
      if (this.gameEnded)
        return;
      this.ballElement.classList.remove('ball-static')
      this.ballElement.style.left = `${this.crd.left + this.crd.width / 2 - this.ball.width / 2}px`;
      this.move.posX = this.crd.left + this.crd.width / 2 - this.ball.width / 2;
      setTimeout(() => {
        const step = this.getRandomStep();
        let left = this.getRandomDirection() == 2 ? -1 : 1;
        if (left < 0)
          if (window.innerWidth - this.mouseX <= step + this.ball.width)
            left = 1;
        
        if (left > 0)
          if (this.mouseX <= step + this.ball.width)
            left = -1;
        
        this.ballElement.style.left = (this.crd.left + (this.crd.width / 2) + (step*left)) + 'px';
        if (this.move.catched == false) {
          this.results.push({
            timeOnMove: 0,
            moveTotalDeviation: 0,
          })
        }
        this.setMoveDataNull();
        
        this.blocked = false;
        this.move.posX = this.crd.left + (this.crd.width / 2) + (step*left);
        setTimeout(() => {
          this.ballElement.classList.add('ball-static')
          this.ball = this.ballElement.getBoundingClientRect()
          console.log('End in', this.ball.left)
        }, 100);
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
            label: `Мы измерили скорость вашей реакции и сравним ее с результатами тестов. `,
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    background-color: rgba(107, 106, 106, 0.42);
    box-shadow: 0 0 10px rgba(125, 124, 124, 0.2);
    backdrop-filter: blur(10px) saturate(150%);
    transition-duration: 0.2s;
}
.ball-static {
    transition-duration: unset !important;
}
.target-active {
    background-color: rgba(193, 81, 81, 0.4);
    box-shadow: 0 0 10px rgba(193, 81, 81, 0.4);
}
</style>