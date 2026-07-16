import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.scss'
import installIcon from './icons'
import store from './store/index.js'
import './permission.js' // 导入导航守卫
import i18n from './i8n/index.js'
import installFilters from './filters'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installIcon(app)

// 注册
app.use(router)
app.use(store)
app.use(i18n) // ✅ 注册 i18n
installFilters(app) //  注册过滤器插件

// 挂载
app.mount('#app')
