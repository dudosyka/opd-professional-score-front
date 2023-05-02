<template>
    <div class="background">
        <slot></slot>
        <div class="instruction-static">
            <div class="col progress-col">
                <div class="progress" v-if="showTime">
                    Прогресс {{ minutes }}:{{ seconds }} / {{ endMinutes }}:{{ endSeconds }}
                </div>
                <div class="progress" v-if="showRes">
                    <p>Отклонение (мс) за последнюю минуту {{ lastMinuteAvgTime }}</p>
                    <p>Отклонение (г.) за последнюю минуту {{ lastMinuteAvgAngle }}</p>
                </div>
            </div>
            <div class="key-block">
                <template v-for="key in keys">
                    <div class="label">
                        Press
                    </div>
                    <div class="key">
                        {{ key }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RdoInterface",
  props: {
    showTime: {
      type: Boolean,
      default: true,
    },
    showRes: {
      type: Boolean,
      default: true,
    },
    keys: {
      type: Array,
      default: []
    },
    timeToEnd: {
      type: Number,
      default: 120,
    },
    results: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    timer: 0,
  }),
  created() {
    this.timerInterval = setInterval(() => {
      this.timer++;
      if (this.timer >= this.timeToEnd) {
        clearInterval(this.timerInterval);
        this.$emit('time')
      }
    }, 1000)
    
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.timer / 60)
      return minutes >= 10 ? `${minutes}` : `0${minutes}`;
    },
    seconds() {
      const minutes = parseInt(this.minutes)
      const seconds = this.timer - minutes * 60;
      return seconds >= 10 ? `${seconds}` : `0${seconds}`;
    },
    endMinutes() {
      const endMinutes = Math.floor(this.timeToEnd / 60)
      return endMinutes >= 10 ? `${endMinutes}` : `0${endMinutes}`;
    },
    endSeconds() {
      const endMinutes = parseInt(this.endMinutes)
      const endSeconds = this.timeToEnd - endMinutes * 60;
      return endSeconds >= 10 ? `${endSeconds}` : `0${endSeconds}`;
    },
    lastMinute() {
      return this.results.reverse().filter(
        el => {
          return (Date.now() - el.time <= 1000 * 60 && el.d !== null)
        }
      )
    },
    lastMinuteAvgTime() {
      const last = this.lastMinute;
      
      console.log(last)
      
      if (last.length <= 0)
        return 0;
      
      return Math.round(last.map(el => el.timeD).reduce((a, b) => a + b) / last.length)
    },
    lastMinuteAvgAngle() {
      const last = this.lastMinute;
      
      if (last.length <= 0)
        return 0;
      
      return Math.round(last.map(el => el.absD).reduce((a, b) => a + b) * (180 / Math.PI) / last.length)
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
      justify-content: space-evenly;
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
      margin-right: .5rem;
      margin-left: 1.5rem;
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