import {createRouter, createWebHistory} from "vue-router"

/**
 * 路由表
 * [auth]校验用户是否登陆
 * [keepAlive]页面是否需要保活
 *
 */
let routes = [
    {
        name: 'mainPage',
        path: '/',
        component: () => import('../pages/mainPage.vue'),
        meta: {
            keepAlive: true,
        },
        children: [
            {
                name: "homePage",
                path: "/homePage",
                component: () => import("../pages/homePage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "projectPage",
                path: "/projectPage",
                component: () => import("../pages/projectPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "siteMapPage",
                path: "/siteMapPage",
                component: () => import("../pages/sitemapPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "wechatPage",
                path: "/wechatPage",
                component: () => import("../pages/wechatPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
            {
                name: "systemPage",
                path: "/systemPage",
                component: () => import("../pages/systemPage.vue"),
                meta: {
                    scrollState: true,
                    keepAlive: true
                },
            },
        ]
    },
    // 登陆页面
    {
        name: "loginPage",
        path: "/loginPage",
        component: () => import('../pages/loginPage.vue'),
        meta: {
            keepAlive: false
        }
    },
    // 注册页面
    {
        name: "registerPage",
        path: "/registerPage",
        component: () => import('../pages/registerPage.vue'),
        meta: {
            keepAlive: false
        }
    },
    // 收藏页面
    {
        name: "collectPage",
        path: "/collectPage",
        component: () => import('../pages/collectPage.vue'),
        meta: {
            auth: true,
            keepAlive: false
        }
    },

    // 测试页面
    {
        name: "testPage",
        path: "/testPage",
        component: () => import('../pages/testPage.vue')
    },

    //默认未找到页面
    {
        name: "*",
        path: "/:w+",
        component: () => import('../pages/errorPage.vue')
    }

]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router