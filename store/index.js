var cookieparser = require('cookieparser')

export const state = () => ({
  adminToken: ''
})

export const getters = {
  getAdminToken (state) {
    return state.adminToken
  }
}

export const mutations = {
  setAdminToken (state, token) {
    state.adminToken = token
  },
  adminLogout (state) {
    state.adminToken = ''
  }
}

export const actions = {
  /*
  nuxtServerInit ({ commit }, { req }) {
    let accessToken = null
    if (req.headers.cookie) {
      var parsed = cookieparser.parse(req.headers.cookie)
      accessToken = parsed.auth
    }
    commit('setAdminToken', accessToken)
  }
  */
}
