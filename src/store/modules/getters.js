import variables from '@/styles/variables.scss'
// 快捷访问
const getter = {
  token: state => state.user.token,
  // return 是 true 表示用户信息已经存在
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened // 创建快捷访问，方便各组件直接读取
}

export default getter
