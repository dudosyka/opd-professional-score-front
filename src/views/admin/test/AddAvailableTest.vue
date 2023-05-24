<template>
  <ModalContainer
    :show-header="true"
    :header-title="'Добавление нового теста для пользователя'"
    :btn-next="next"
    :show-btn-next="true"
  >
      <h4 class="mb-5">Вы можете изменить настройки теста по умолчанию</h4>
      <template v-if="testTemplate.id < 10">
          <div class="container container-fluid" v-if="testTemplate.id < 6">
              <div class="input-group" v-if="timeType === 1">
                  <label class="input-group-text">Количество повторений</label>
                  <input v-model.number="repeat" class="form-control form-control-lg" type="text" required="required">
                  <button class="btn btn-primary" @click="timeType = 2">Использовать время</button>
              </div>
              <div class="input-group" v-if="timeType === 2">
                  <label class="input-group-text">Время теста в (сек.)</label>
                  <input v-model.number="time" class="form-control form-control-lg" type="text" required="required">
                  <button class="btn btn-primary" @click="timeType = 1">Использовать кол-во повторений</button>
              </div>
              <div class="input-group">
                  <label class="input-group-text">Задержка перед началом теста (мс.)</label>
                  <input v-model.number="startDelay" class="form-control form-control-lg" type="text" required="required">
              </div>
              <div class="input-group">
                  <label class="input-group-text">Максимальое время между повторениями (мс.)</label>
                  <input v-model.number="circleTimeRange.min" class="form-control form-control-lg" type="text" required="required">
              </div>
              <div class="input-group">
                  <label class="input-group-text">Минимальное время между повторениями (мс.)</label>
                  <input v-model.number="circleTimeRange.max" class="form-control form-control-lg" type="text" required="required">
              </div>
              <template v-if="testTemplate.id === 1 || testTemplate.id === 3">
                  <div class="input-group">
                      <label class="input-group-text">Время на которое будет показана вспышка (мс.)</label>
                      <input v-model.number="switchTime" class="form-control form-control-lg" type="text" required="required">
                  </div>
              </template>
              <template v-else>
                  <div class="input-group">
                      <label class="input-group-text">Минимальное число которое может быть сгененерировано в тесте</label>
                      <input v-model.number="simplicity.minNum" class="form-control form-control-lg" type="text" required="required">
                  </div>
                  <div class="input-group">
                      <label class="input-group-text">Максимальное число которое может быть сгененерировано в тесте</label>
                      <input v-model.number="simplicity.maxNum" class="form-control form-control-lg" type="text" required="required">
                  </div>
              </template>
          </div>
          <div class="container container-fluid" v-else>
              <div class="input-group">
                  <label class="input-group-text">Время выполнения теста (сек)</label>
                  <input v-model.number="time" class="form-control form-control-lg" type="text" required="required">
              </div>
              <div class="input-group">
                  <label class="input-group-text">Задержка перед началом теста (мс.)</label>
                  <input v-model.number="startDelay" class="form-control form-control-lg" type="text" required="required">
              </div>
              <div class="input-group">
                  <label class="input-group-text">Показывать время выполнения теста</label>
                  <input v-model="showTime" class="form-check-inline" type="checkbox" required="required">
              </div>
              <div class="input-group">
                  <label class="input-group-text">Показывать результат за последнюю минуту</label>
                  <input v-model="showResByMinute" class="form-check-inline" type="checkbox" required="required">
              </div>
              <template v-if="testTemplate.id < 8">
                  <button class="btn btn-primary" @click="changeSpeed = !changeSpeed">{{ changeSpeed ? 'Отмена' : 'Настроить скорость движения' }}</button>
                  <template v-if="changeSpeed">
                      <div class="input-group">
                          <label class="input-group-text">Промежуток времени на который будет увеличена скорость: (сек)</label>
                          <input v-model.number="speed.increaseTime" class="form-control form-control-lg" type="text" required="required">
                      </div>
                      <div class="input-group">
                          <label class="input-group-text">Во сколько раз увеличить скорость (кол-во раз)</label>
                          <input v-model.number="speed.increaseSize" class="form-control form-control-lg" type="text" required="required">
                      </div>
                      <div class="input-group">
                          <label class="input-group-text">Как часто увеличивать время (сек.)</label>
                          <input v-model.number="speed.increaseFrequency" class="form-control form-control-lg" type="text" required="required">
                      </div>
                  </template>
              </template>
              <template v-else> <!-- for 8 and 9 types-->
                  <div class="input-group">
                      <label class="input-group-text">Максимальое время между повторениями (мс.)</label>
                      <input v-model.number="circleTimeRange.min" class="form-control form-control-lg" type="text" required="required">
                  </div>
                  <div class="input-group">
                      <label class="input-group-text">Минимальное время между повторениями (мс.)</label>
                      <input v-model.number="circleTimeRange.max" class="form-control form-control-lg" type="text" required="required">
                  </div>
              </template>
          </div>
      </template>
      <template v-if="testTemplate.id == 10">
          <div class="input-group">
              <label class="input-group-text">Размер матрицы (только чётный)</label>
              <input v-model.number="matrixSize" class="form-control form-control-lg" type="text" required="required">
          </div>
          <div class="input-group">
              <label class="input-group-text">Задержка перед началом (для показа матрицы) мс.</label>
              <input v-model.number="startGameDelay" class="form-control form-control-lg" type="text" required="required">
          </div>
      </template>
  </ModalContainer>
</template>

<script>
import ModalContainer from "@/components/Modal.vue";
import PaginationTable from "@/components/PaginationTable.vue";
import {UserTestAvailableModel} from "@/api/models/user-test-available.model";

export default {
  name: "AddAvailableTest",
  components: {PaginationTable, ModalContainer},
  data: () => ({
    //1 - iterations count, 2 - by time
    timeType: 1,
    repeat: 10,
    // time: 60*1 // 1 minute in seconds
    time: 60*0.25,
    startDelay: 2000,
    startGameDelay: 10000,
    switchTime: 1000,
    circleTimeRange: {
      //min and max time between iterations in ms
      min: 800,
      max: 1000
    },
    simplicity: {
      minNum: 1,
      maxNum: 20
    },
    showTime: true,
    showResByMinute: true,
    changeSpeed: false,
    speed: {
      increaseTime: 1, //seconds
      increaseSize: 2, //x2
      increaseFrequency: 10, //seconds
    },
    matrixSize: 4
  }),
  created() {
    if (this.testTemplate.id < 6)
      this.circleTimeRange = {
        min: 4000,
        max: 5000
      }
    console.log(this.testTemplate);
  },
  computed: {
    testTemplate() {
      return this.$store.getters.getSelectedTest;
    }
  },
  methods: {
    next() {
      const dataToSave = this.processData();
      
      if (!dataToSave)
        return;
      
      const model = new UserTestAvailableModel();
      model.save({
        tests: [{
          user_id: this.$store.getters.getSelectedUser.id,
          test_id: this.testTemplate.id,
          relative_id: this.$store.getters.getAvailableTestsCount + 1,
          settings: JSON.stringify(dataToSave)
        }]
      });
      this.$store.dispatch('showPopUp', { success: true, text: "Тест успешно добавлен!" });
      this.$router.push(`/user/${this.$store.getters.getSelectedUser.id}/available/`)
    },
    processData() {
      if (this.testTemplate.id > 5) {
        this.timeType = 2
      }
      
      
      if (this.circleTimeRange.min > this.circleTimeRange.max) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка минимальное время между повторениями должно быть меньше максимального!"
        })
        return;
      }
      
      if (this.timeType === 1 && this.repeat <= 0) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка кол-во повторений должно быть больше нуля!"
        })
        return
      }
      
      if (this.timeType === 2 && this.time <= 0) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка время теста должно быть больше нуля!"
        })
        return
      }
      
      if (!this.circleTimeRange.min || !this.circleTimeRange.max || !this.switchTime || !this.startDelay || !this.simplicity.minNum || !this.simplicity.maxNum) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка проверьте правильность данных!"
        })
        return;
      }
      
      if (this.simplicity.maxNum < this.simplicity.minNum) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка минимальное число для генерации должно быть миньше максимального!"
        })
        return;
      }
      
      if (this.matrixSize % 2 != 0) {
        this.$store.dispatch('showPopUp', {
          success: false,
          text: "Ошибка! Размер матрицы может быть только четным числом!"
        })
        return;
      }
        
      let data = {
        startDelay: this.startDelay,
        switchTime: this.switchTime,
        simplicity: {
          ...this.simplicity
        },
        circleTimeRange: {
          ...this.circleTimeRange
        },
        speed: {
          ...this.speed
        },
        showResByMinute: this.showResByMinute,
        showTime: this.showTime,
        matrixSize: this.matrixSize,
        startGameDelay: this.startGameDelay
      }
      if (this.timeType === 1) {
        data.repeat = this.repeat;
      }
      else if (this.testTemplate.id < 6) {
        data.time = this.time * 1000;
      } else {
        data.time = this.time
      }
      
      return data;
    }
  }
}
</script>

<style scoped>
  .input-group {
    margin-bottom: 2rem;
  }
  
  .input-group input {
      max-width: 100px;
  }
  
  .form-check-inline {
      width: 1.2rem;
  }
</style>