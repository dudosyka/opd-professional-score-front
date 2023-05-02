import { createStore } from 'vuex'
import {ProfessionModel} from "@/api/models/profession.model";
import {UserModel} from "@/api/models/user.model";
import {UserTestModel} from "@/api/models/user-test.model";

const gameResultsClear = {
  type: null,
  numbers: [],
  single: true,
  singleGraf: true,
}

export default createStore({
  state: {
    selectedProfession: null,
    selectedPvk: [],
    selectedExpert: null,
    selectedUser: null,
    selectedTest: null,
    selectedPassedTest: null,
    popUp: {
      show: false,
      success: true,
      text: 'string'
    },
    gameResults: {...gameResultsClear},
    user: null,
    onPass: null,
    availableCount: 0
  },
  getters: {
    getUserSt(state){
      return state.user
    },
    getSelectedProfession(state) {
      return state.selectedProfession;
    },
    getSelectedPvk(state) {
      return state.selectedPvk;
    },
    getSelectedExpert(state) {
      return state.selectedExpert;
    },
    getSelectedUser(state) {
      return state.selectedUser;
    },
    getSelectedTest(state) {
      return state.selectedTest;
    },
    getSelectedPassedTest(state) {
      return state.selectedPassedTest;
    },
    popUp(state) {
      return state.popUp;
    },
    gameResults(state) {
      return state.gameResults;
    },
    getTestOnPass(state) {
      return state.onPass;
    },
    getAvailableTestsCount(state) {
      return state.availableCount;
    }
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    setSelectedProfession(state, profession) {
      state.selectedProfession = profession;
    },
    setSelectedPvk(state, selectedPvk) {
      state.selectedPvk = selectedPvk;
    },
    setSelectedExpert(state, selectedExpert) {
      state.selectedExpert = selectedExpert;
    },
    setSelectedUser(state, userModel) {
      state.selectedUser = userModel;
    },
    setSelectedTest(state, testModel) {
      state.selectedTest = testModel;
    },
    setSelectedPassedTest(state, testModel) {
      state.selectedPassedTest = testModel;
    },
    showPopUp(state, { success, text }) {
      state.popUp = {
        show: true,
        success,
        text
      }
    },
    closePopUp(state) {
      state.popUp.show = false;
    },
    setGameResults(state, results) {
      state.gameResults = { single: true, singleGraf: true, ...results };
    },
    clearGameResults(state) {
      state.gameResults = {
        ...gameResultsClear
      }
    },
    setOnPass(state, settings) {
      state.onPass = { ...settings };
    },
    setAvailableTestsCount(state, count) {
      state.availableCount = count;
    }
  },
  actions: {
    async selectProfession({commit}, professionId) {
      const professionModel = new ProfessionModel();
      commit('setSelectedProfession', await professionModel.getOne(professionId));
    },
    async showPopUp({commit}, popUpData) {
      commit('showPopUp', popUpData);
      setTimeout(() => {
        commit('closePopUp');
      }, 1500);
    },
    async getUser({commit}){
      const curUser = await (new UserModel()).getCurrent()
      commit('setUser', curUser.role)
    },
    async setGameResults({commit, state}, data) {
      commit('setGameResults', data);
      
      let points = data.numbers;
      if (data.combine) {
        points = [];
        data.numbers.forEach(el => {
          el.lines.forEach(el => {
            points.push(...el.elements)
          })
        })
      }
      points = points.map(el => el ? Math.round(el) : 0)
      const model = new UserTestModel();
      model.saveResult(state.onPass.available_test_id, {
        points,
        avg: Math.round(points.reduce((prev, cur) => prev + cur) / points.length)
      });
    }
  },
  modules: {
  }
})
