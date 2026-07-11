// import variables from '@/styles/variables.scss'
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
// 快捷访问
const getter = {
  token: state => state.user.token,
  // return 是 true 表示用户信息已经存在
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened, // 创建快捷访问，方便各组件直接读取
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor
}

export default getter
