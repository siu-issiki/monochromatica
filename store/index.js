import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      adminToken: ''
    }),
    getters: {
      getAdminToken (state) {
        return state.adminToken
      }
    },
    mutations: {
      setAdminToken (state, token) {
        state.adminToken = token
      },
      adminLogout (state) {
        state.adminToken = ''
      }
    },
    actions: {
      nuxtClientInit ({ commit }, context) {
        const adminToken = JSON.parse(window.localStorage.vuex).adminToken
        commit('setAdminToken', adminToken)
      }
    }
  })
}

export default createStore
