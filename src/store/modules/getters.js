
// 快捷访问
const getter = {
  token: state => state.user.token,
  // return 是 true 表示用户信息已经存在
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo
}

export default getter
