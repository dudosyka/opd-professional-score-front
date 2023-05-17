<template>
  <div class="criteria-item">
      <header class="row justify-content-around">
          <div class="col">
              <h5>#{{ index + 1 }} Тест: {{ test }}</h5>
          </div>
      </header>
      <main class="row">
          <p>Параметр: {{param}}</p>
          <p>{{description}}</p>
      </main>
      <main class="row">
        <p>
            <span>
              <b>Вес:</b> {{ weight }}
            </span>
            <span>
              <b>Срез:</b> {{ slice }}
            </span>
            <span>
              <b>Направление оценки:</b> {{ directionInterpreter(direction) }}
            </span>
        </p>
      </main>
  </div>
</template>

<script>
export default {
  name: "CriteriaParamItem",
  props: {
    id: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    relation_id: {
      type: Number,
      default: 0
    },
    test: {
      type: String,
      default: ""
    },
    param: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    weight: {
      type: Number,
      dafault: 0
    },
    slice: {
      type: Number,
      dafault: 0
    },
    direction: {
      type: Number,
      dafault: 0
    }
  },
  methods: {
    directionInterpreter(direction) {
      if (direction == 0) {
        return "Значение ниже - лучше"
      } else {
        return "Значение выше - лучше"
      }
    }
  }
}
</script>

<style scoped>
  .criteria-item {
      display: flex;
      flex-direction: column;
  }
  header {
      margin-bottom: 1rem;
  }
  .row {
      flex-direction: row;
  }
  .btn-container {
      max-width: fit-content;
  }
  p > span {
      margin-right: 1rem;
  }
</style>