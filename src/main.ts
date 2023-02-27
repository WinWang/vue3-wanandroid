import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./route"
import "lib-flexible"
import {Lazyload} from "vant";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(router)
app.use(Lazyload)
app.use(pinia)
app.mount('#app')