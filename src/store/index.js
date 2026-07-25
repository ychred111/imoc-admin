import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters'
import app from './modules/app'
import theme from './modules/theme'
import permission from './modules/permission'

export default createStore({
  modules: {
    user,
    app,
    theme,
    permission
  },
  getters
})
