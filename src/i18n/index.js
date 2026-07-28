// 流程：
// 先安装依赖 → 创建 i18n 配置文件（定义语言包） → 在 main.js 中注册 → 组件中使用 $t() 或 useI18n() 进行翻译。
import { createI18n } from 'vue-i18n'
import mEnLocale from './lang/en'
import mZhLocale from './lang/zh'
import store from '@/store'
// 定义语言包 (messages)
const messages = {
  en: { msg: { ...mEnLocale } },
  zh: { msg: { ...mZhLocale } }
}

// 设置默认语言 (locale)
// const locale = 'zh'

// 返回当前lang
function getLanguage () {
  return store && store.getters && store.getters.language
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  globalInjection: true, // 全局注入 $t 函数
  locale: getLanguage(),
  messages
})
// 导出 i18n 实例
export default i18n
// 在 main.js 中注册
