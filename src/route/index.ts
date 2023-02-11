import {createRouter, createWebHistory} from "vue-router"

// 路由表
let routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../pages/main.vue'),
        meta: {
            keepAlive: true
        },
        children: [
            {
                name: "home",
                path: "/",
                component: () => import("../pages/home.vue"),
                meta: {
                    keepAlive: true
                },
            }
        ]
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router