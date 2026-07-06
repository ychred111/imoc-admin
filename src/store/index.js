import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters'
import app from './modules/app'

export default createStore({
  modules: {
    user,
    app
  },
  getters
})
