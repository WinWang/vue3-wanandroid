import {createApp, nextTick} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./route"
import "lib-flexible"
import {Lazyload, showFailToast} from "vant";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import {useUserStore} from "./store/userStore";
import {useGlobalStore} from "./store/global";


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
const useGlobal = useGlobalStore()
router.beforeEach((to, from, next) => {
    //keepAlive滚动逻辑处理
    if (from.matched.some(m => m.meta.scrollState)) {
        useGlobal.getScrollKeyValue.set(from.path, document.documentElement.scrollTop)
    }
    //登陆拦截操作
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

router.afterEach((to, from) => {
    if (to.meta.scrollState == true) {
        const scrollTop: number = useGlobal.getScrollKeyValue.get(to.path) as number
        nextTick().then(() => {
            document.documentElement.scrollTop = scrollTop
        })
    } else {
        nextTick().then(() => {
            document.documentElement.scrollTop = 0
        })
    }
})
