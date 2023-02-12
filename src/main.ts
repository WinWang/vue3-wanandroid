import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./route"
import "lib-flexible"

const app = createApp(App)
app.use(router)
app.mount('#app')