const state = {
  list: []
}

const getters = {
  get: state => state.list
}

const mutations = {
  set: (state, payload) => {
    state.list = payload
  }
}

const actions = {
  async fetch ({ commit }) {
    const { data } = await this.$axios.get(`/api/users`)
    const users = data.filter(user => {
      const companyDomain = (user.profile.email && (user.profile.email.endsWith('@appnroll.com') || user.profile.email.endsWith('@mudita.com')))
      const notDeleted = !user.deleted
      const notBuilds = user.id !== 'U19ELMWGM'
      return companyDomain && notDeleted && notBuilds
    })
    commit('set', users)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
