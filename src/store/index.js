import { createStore } from 'vuex'
import user from './modules/user'
import getter from './modules/getter'

export default createStore({
  modules: {
    user,
    getter
  }
})
