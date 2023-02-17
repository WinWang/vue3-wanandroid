<template>
    <div class="vertical-layout">
        <van-nav-bar :title="state.title" fixed placeholder></van-nav-bar>
        <div class="main-content">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
            </router-view>
        </div>
        <van-tabbar route v-model="activeIndex" @change="onTabChange" placeholder fixed>
            <van-tabbar-item to="/homePage" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/systemPage" icon="search">体系</van-tabbar-item>
            <van-tabbar-item to="/wechatPage" icon="friends-o">公众号</van-tabbar-item>
            <van-tabbar-item to="/projectPage" icon="friends-o">项目</van-tabbar-item>
            <van-tabbar-item to="/siteMapPage" icon="setting-o">导航</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onActivated, onMounted, reactive, ref} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";
    import {defineOptions} from "unplugin-vue-define-options/macros";

    defineOptions({
        name: "mainPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        title: "首页",
    })
    const activeIndex = ref(0)

    onMounted(() => {
        // initTabSelected()
    })

    onActivated(() => {

    })

    // let initTabSelected = () => {
    //     // console.log("路由名称>>>>>>" + route.path)
    //     switch (route.path) {
    //         case "/homePage":
    //             activeIndex.value = 0
    //             break
    //
    //         case "/systemPage":
    //             activeIndex.value = 1
    //             break
    //
    //         case "/wechatPage":
    //             activeIndex.value = 2
    //             break
    //
    //         case "/projectPage":
    //             activeIndex.value = 3
    //             break
    //
    //         case "/siteMapPage":
    //             activeIndex.value = 4
    //             break
    //     }
    // }


    const onTabChange = (index: number) => {
        // initTabSelected()
        // switch (index) {
        //     case 0://首页
        //         router.push({path: "/homePage"})
        //         break
        //
        //     case 1://体系
        //         router.push({path: "/systemPage"})
        //         break
        //
        //     case 2://公众号
        //         router.push({path: "/wechatPage"})
        //         break
        //
        //     case 3://项目
        //         router.push({path: "/projectPage"})
        //         break
        //
        //     case 4://导航
        //         router.push({path: "/siteMapPage"})
        //         break
        // }
    }


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">
    .main-content {
        flex: auto;
    }
</style>