import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import { firebaseAction } from 'vuexfire'

const store = () => {
  return new Vuex.Store({
    state: {
      projects: []
    },
    getters: {
      projects: state => state.projects
    },
    mutations: {
      ...firebaseMutations
    },
    actions: {
      setProjectsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
        bindFirebaseRef('projects', ref)
      })
    }
  })
}

export default store
