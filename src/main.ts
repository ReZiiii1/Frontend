import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

import 'unfonts.css'

const app = createApp(App)

const pinia = createPinia()

registerPlugins(app)
app.use(router)
app.use(pinia)

app.mount('#app')
