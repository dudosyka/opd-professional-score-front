<!-- Component for results by concrete user for one of the test types -->
<template>
    <div class="graf" :style="stretch ? 'min-width: 90%' : ''">
        <canvas :id="id"> </canvas>
        <slot></slot>
    </div>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";

export default {
  name: "TestResult",
  props: {
    id: {
      type: String,
      default: "line-chart"
    },
    datasets: {
      type: Array,
      default: []
    },
    labels: {
      type: Array,
      default: []
    },
    stretch: {
      type: Boolean,
      default: false
    },
  },
  components: {ModalContainer},
  mounted() {
    const labels = this.labels;
    console.log(this.datasets)
    new ChartJs(document.getElementById(this.id), {
      type: 'line',
      data: {
        labels,
        datasets: this.datasets
      },
    });
  }
}
</script>

<style scoped>
  .graf {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      max-width: 800px;
  }
  .big_text, .small_text {
      margin-top: 1.5rem;
      width: 100%;
  }
  #line-chart {
      max-width: 800px;
  }
</style>