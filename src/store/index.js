import { createStore } from 'vuex'
import {ProfessionModel} from "@/api/models/profession.model";

export default createStore({
  state: {
    selectedProfession: null,
    selectedPvk: [],
    selectedExpert: null,
  },
  getters: {
    getSelectedProfession(state) {
      return state.selectedProfession;
    },
    getSelectedPvk(state) {
      return state.selectedPvk;
    },
    getSelectedExpert(state) {
      return state.selectedExpert;
    }
  },
  mutations: {
    setSelectedProfession(state, profession) {
      state.selectedProfession = profession;
    },
    setSelectedPvk(state, selectedPvk) {
      state.selectedPvk = selectedPvk;
    },
    setSelectedExpert(state, selectedExpert) {
      state.selectedExpert = selectedExpert;
    }
  },
  actions: {
    async selectProfession({commit}, professionId) {
      const professionModel = new ProfessionModel();
      commit('setSelectedProfession', await professionModel.getOne(professionId));
    },
  },
  modules: {
  }
})
