import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token:null,
      perfilDialog:false
  },
  getters: {
  },
  mutations: {
    setToken(state,payload){
      state.token=payload
    },
    setDialog(state){
      state.token=!state.token
      console.log("a"+state.token);
    }
  },
  actions: {
    leerToken({commit}){
      if(localStorage.getItem('token')){
        commit('setToken',localStorage.getItem('token'))
      }else{
        commit('setToken',null)
      }
    },

    cerrarPestaña({ commit }) {
      commit('setToken', null)
      localStorage.removeItem('token')
      router.push({ name: "login"})
    }
    
  },

  modules: {
  }
})
