import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { InstallCodemirro } from "codemirror-editor-vue3"
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(InstallCodemirro) 
app.use(createPinia())
app.use(router)

app.mount('#app')
