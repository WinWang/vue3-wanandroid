import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./route"
import "lib-flexible"
import {Lazyload, showFailToast} from "vant";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import {useUserStore} from "./store/userStore";

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(router)
app.use(Lazyload)
app.use(pinia)
app.mount('#app')


/**
 * 登录拦截判断
 */
const userStore = useUserStore()
router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth)) {
        if (userStore.getLoginState) {
            next();
        } else {
            showFailToast("请登录后操作！")
            next('/loginPage')
        }
    } else {
        next();
    }
})