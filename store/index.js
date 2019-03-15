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
      }
    }
  })
}

export default createStore
