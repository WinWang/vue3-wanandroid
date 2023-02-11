import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"
import Components from 'unplugin-vue-components/vite'
import {VantResolver} from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()]
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            "/api": {
                target: "https://www.wanandroid.com",   // 要请求的后台地址
                changeOrigin: true,    // 是否跨域
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    },
    css: {
        postcss: {
            plugins: [
                postCssPxToRem(
                    {
                        rootValue: 37.5,
                        propList: ['*']
                    }
                )
            ]
        }
    }
})
