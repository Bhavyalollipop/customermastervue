import instance from '@/plugins/interceptors'
const strict = true
const namespaced = true
const state = () => ({
  status: '',
  token: null
})
const mutations = {
  UPDATE_TOKEN (state, res) {
    state.token = res.token
  }
}
const actions = {
  postLogin ({ commit }, data) {
    // get the custodian list
    return instance.post('/session/login', data).then((res) => {
      commit('UPDATE_TOKEN', { token: res.data.detail })
      return res.data
    })
  },
  postRegister ({ commit }, data) {
    // get the custodian list
    return instance.post('/session/register', data).then((res) => {
      commit('UPDATE_TOKEN', { token: res.data.detail })
      return res.data
    })
  }
}
export default {
  strict,
  namespaced,
  state,
  mutations,
  actions
}
