import Vuex from 'vuex'
import projects from './modules/projects'
import users from './modules/users'
import { firebaseMutations } from 'vuexfire'

const store = () => {
  return new Vuex.Store({
    mutations: {
      ...firebaseMutations
    },
    modules: {
      projects,
      users
    }
  })
}

export default store
