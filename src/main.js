import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // ← 注意是 dist，不是 lib

const app = createApp(App)
ElementPlus(app)
app.use(store).use(router).mount('#app')
