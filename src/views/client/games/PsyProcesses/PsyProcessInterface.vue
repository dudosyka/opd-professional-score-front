<template>
    <div class="background">
        <slot></slot>
        <div class="instruction-static">
            <div class="col progress-col">
                <div class="progress" v-if="showTime">
                    Прогресс {{ minutes }}:{{ seconds }}
                </div>
                <div class="progress" v-if="showRes">
                    <p>Число {{ numLabel }}: {{ num }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "PsyProcessInterface",
  props: {
    showTime: {
      type: Boolean,
      default: true,
    },
    showRes: {
      type: Boolean,
      default: true,
    },
    num: {
      type: String,
      default: "0",
    },
    numLabel: {
      type: String,
      default: "",
    }
  },
  data: () => ({
    timer: 0,
  }),
  created() {
    this.timerInterval = setInterval(() => {
      this.timer++;
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
  .progress {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgba(162, 162, 162, 0.4);
      padding: 1.75rem;
      max-width: 200px;
      margin-bottom: 2rem;
      color: white;
      font-size: 1rem;
  }
  .progress p {
      padding-top: 1rem;
  }
  .progress-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
</style>