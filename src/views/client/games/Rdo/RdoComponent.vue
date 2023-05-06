<template>
    <canvas :id="canvasId" :width="canvasConf.size" :height="canvasConf.size"></canvas>
</template>

<script>
const sFactor = 2;
const refreshTimeout = 20
const k = Math.PI * 45

const canvasConf = {
    size: 320
};

export default {
  name: "SimpleRDO",
  props: {
    increaseTime: {
      type: Number,
      default: 1,
    }, //seconds
    increaseSize: {
      type: Number,
      default: 2,
    }, //x2
    increaseFrequency: {
      type: Number,
      default: 10
    }, //seconds
    startDelay: {
      type: Number,
      default: 1000,
    },
    controlKeyCode: {
      type: String,
      default: "Space",
    },
    speedProp: {
      type: Number,
      default: 1
    },
    timeToEnd: {
      type: Number,
      default: 120
    },
    canvasId: {
      type: String,
      default: "canvas"
    },
    id: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    speed: 0.25,
    f: Math.PI * 120, // Phi.
    stop: false,
    circleCount: 1,
    clickOnThatCircle: true,
    ignoreDelta: Math.PI / 4,
    
    refreshTimeout,
    k, // bias factor.
    sFactor,
    r: 150, // radius/
    
    canvasConf,
    
    ctx: {},
    canvas: null,
    ball: {
      size: 10,
      position: {
        x: parseInt(canvasConf.size / 2),
        y: parseInt(canvasConf.size / 2)
      },
      color: "#e6e6e6",
      direction: "",
      step: 1
    },
    
    timerInterval: null,
    
    gameData: {
      results: []
    },
    isGameEnd: false,
  }),
  computed: {
    s() {
      return sFactor * Math.PI / (k*this.speed); // space.
    },
    angleSpeed() {
      return sFactor / (k * refreshTimeout * this.speed)
    },
  },
  created() {
    this.gameData.startTime = Date.now();
    
    this.speed = this.speedProp;
    
    window.addEventListener('keydown', (e) => {
      if (e.code == this.controlKeyCode) {
        const absF = Math.abs(this.f);
        const beta = absF - (this.circleCount * 2 * Math.PI) + Math.PI;
        
        if (this.clickOnThatCircle || Math.abs(beta) > this.ignoreDelta)
          return;
        this.clickOnThatCircle = true;
        console.log("Отклонение:", beta, "рад");
        console.log("Абсолютное отклонение:", Math.abs(beta), "рад")
        console.log("Отклонение по времени:", Math.abs(beta / this.angleSpeed), "мс")
        const result = {
          time: Date.now(),
          d: beta,
          absD: Math.abs(beta),
          timeD: Math.abs(beta / this.angleSpeed)
        }
        this.gameData.results.push(result)
        this.$emit('result', {id: this.id, res: result})
      }
    });
    
    setTimeout(() => {
      this.incSpeed()
    }, this.increaseFrequency)
    
  },
  mounted() {
    this.canvas      = document.getElementById( this.canvasId );
    this.ctx         = this.canvas.getContext( "2d" );
    
    console.log("Угловая скорость: ", this.angleSpeed, " рад/мс")

    setTimeout(() => {
      this.draw()
      this.clickOnThatCircle = false
    }, this.startDelay)
  },
  methods: {
    circleMovement( radius ) {
      this.f -= this.s;
      
      if (Math.abs(this.f) - 2 * Math.PI * this.circleCount > 0) {
        if (!this.clickOnThatCircle) {
          const nullRes = {
            time: Date.now(),
            d: null,
            absD: null,
            timeD: null
          }
          
          this.gameData.results.push(nullRes)
          this.$emit('result', {id: this.id, res: nullRes})
        }
        this.clickOnThatCircle = false;
        this.f = 0;
      }
      
      this.ball.position.x = parseInt( parseInt( this.canvas.width / 2 ) + radius * Math.sin( this.f ) );
      this.ball.position.y = parseInt( parseInt( this.canvas.height / 2 ) + radius * Math.cos( this.f ) );
    },
    draw() {
      if (Date.now() >= this.gameData.startTime + this.timeToEnd * 1000) {
        this.gameEnd();
        return;
      }
      setTimeout( () => { this.draw(); }, this.refreshTimeout );
      
      this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
      
      //Draw background
      this.ctx.beginPath();
      this.ctx.arc( this.r + this.ball.size, this.r + this.ball.size, this.r + this.ball.size, 0, 2 * Math.PI)
      this.ctx.fillStyle = "#841a1a"
      this.ctx.fill();
      
      //Draw check-line
      this.ctx.beginPath();
      this.ctx.rect(this.r, 0, 5, 70)
      this.ctx.fillStyle = "#DDDDDD"
      this.ctx.fill();
      
      //Draw ball
      this.ctx.beginPath();
      this.ctx.arc( this.ball.position.x, this.ball.position.y, this.ball.size, 0, 2 * Math.PI );
      this.ctx.fillStyle = this.ball.color;
      this.ctx.fill();
      
      
      this.circleMovement( this.r );
      
    },
    gameEnd() {
      this.isGameEnd = true;
    },
    incSpeed() {
      this.speed /= this.increaseSize
      setTimeout(() => {
        this.speed *= this.increaseSize
        setTimeout(() => {
          this.incSpeed()
        }, this.increaseFrequency * 1000)
      }, this.increaseTime * 1000)
    }
  }
}
</script>

<style scoped>
  canvas {
      display: flex;
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
      max-width: 500px;
      flex-direction: row;
  }
  .progress p {
      padding-top: 1rem;
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