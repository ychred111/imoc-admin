import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant/index'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    // token设置
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    // 用户信息设置到state
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login (context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          console.log(data)
          this.commit('user/setToken', data.token)
          // 跳转页面
          router.push('/')
          // 保存登录时间
          setTimeStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    // 退出登录
    // 清掉token跟用户信息

    logout () {
      // 清除 state.token → 页面立即变为未登录状态
      // 清除 state.userInfo → 用户信息消失
      // 清除 localStorage → 刷新页面也不会恢复
      // 清除 state 中的 token
      this.commit('user/setToken', '')
      // 清除 state 中的 用户信息
      this.commit('user/setUserInfo', {})
      // 清除 localStorage 中的所有数据
      removeAllItem()
      //  跳转到登录页
      router.push('./login')
    }

  }

}
