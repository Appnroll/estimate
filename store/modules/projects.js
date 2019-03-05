import { firebaseAction } from 'vuexfire'
import refs from '~/services/firebase'

const state = {
  projects: []
}

const getters = {
  get: state => state.projects
}

const mutations = {}

const actions = {
  setRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('projects', ref)
  }),
  add: ({}, payload) => {
    refs.projectsRef.add(payload)
  },
  update: async ({}, { id, ...data }) => {
    await refs.projectsRef.doc(id).update(data)
  },
  delete: async ({}, id) => {
    await refs.projectsRef.doc(id).delete()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
