import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters'

export default createStore({
  modules: {
    user
  },
  getters
})
