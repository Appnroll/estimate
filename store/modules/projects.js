import { firebaseAction } from 'vuexfire'

const state = {
  projects: []
}

const getters = {
  get: state => state.projects
}

const mutations = {
}

const actions = {
  setRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('projects', ref)
  })
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
