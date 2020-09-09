import instance from '@/plugins/interceptors'
const strict = true
const namespaced = true
const state = () => ({
  status: ''
})
const mutations = {
  LIST_UPDATE (state, res) {
    state.status = res.status
  }
}
const actions = {
  view ({ commit }, { id }) {
    // get the custodian list
    return instance.get(`/customer/view/${id}`).then((res) => {
      commit('LIST_UPDATE', res)
      return res.data
    })
  },
  getList ({ commit }, { page, count }) {
    // get the custodian list
    return instance.get(`/customer/${page}/${count}`).then((res) => {
      commit('LIST_UPDATE', res)
      return res.data
    })
  },
  create ({ commit }, form) {
    // get the custodian list
    return instance.post('/customer/create', form).then((res) => {
      commit('LIST_UPDATE', res)
      return res.data
    })
  },
  update ({ commit }, { id, form }) {
    // get the custodian list
    return instance.post(`/customer/update/${id}`, form).then((res) => {
      commit('LIST_UPDATE', res)
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
