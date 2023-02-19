import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./route"
import "lib-flexible"
import {Lazyload} from "vant";

const app = createApp(App)
app.use(router)
app.use(Lazyload)
app.mount('#app')