import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from './utils/registerGlobalComponents'

const root = createApp(App)
registerGlobalComponents(root)

root
    .mount('#app')
