import { createStore } from 'vuex'
import {ProfessionModel} from "@/api/models/profession.model";
import {UserModel} from "@/api/models/user.model";

export default createStore({
  state: {
    selectedProfession: null,
    selectedPvk: [],
    selectedExpert: null,
    popUp: {
      show: false,
      success: true,
      text: 'string'
    },
    user: null
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
    popUp(state) {
      return state.popUp;
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
    showPopUp(state, { success, text }) {
      state.popUp = {
        show: true,
        success,
        text
      }
    },
    closePopUp(state) {
      state.popUp.show = false;
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
    }
  },
  modules: {
  }
})
