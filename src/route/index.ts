import {createRouter, createWebHistory} from "vue-router"

// 路由表
let routes = [
    {
        path: '/',
        name: 'mainPage',
        component: () => import('../pages/mainPage.vue'),
        meta: {
            keepAlive: true,
            activeName: 'mainActive'
        },
        children: [
            {
                name: "homePage",
                path: "/homePage",
                component: () => import("../pages/homePage.vue"),
                meta: {
                    keepAlive: true,
                    activeName: 'mainActive'
                },
            },
            {
                name: "projectPage",
                path: "/projectPage",
                component: () => import("../pages/projectPage.vue"),
                meta: {
                    keepAlive: true,
                    activeName: 'mainActive'
                },
            },
            {
                name: "siteMapPage",
                path: "/siteMapPage",
                component: () => import("../pages/sitemapPage.vue"),
                meta: {
                    keepAlive: true,
                    activeName: 'mainActive'
                },
            },
            {
                name: "wechatPage",
                path: "/wechatPage",
                component: () => import("../pages/wechatPage.vue"),
                meta: {
                    keepAlive: true,
                    activeName: 'mainActive'
                },
            },
            {
                name: "systemPage",
                path: "/systemPage",
                component: () => import("../pages/systemPage.vue"),
                meta: {
                    keepAlive: true,
                    activeName: 'mainActive'
                },
            },

        ]
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router