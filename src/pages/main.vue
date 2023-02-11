<template>
    <div class="vertical-layout-fullscreen">
        <van-nav-bar :title="state.title" fixed></van-nav-bar>
        <div class="main-content">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>

        <van-tabbar v-model="state.active" @change="onTabChange">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="search">体系</van-tabbar-item>
            <van-tabbar-item icon="friends-o">公众号</van-tabbar-item>
            <van-tabbar-item icon="friends-o">项目</van-tabbar-item>
            <van-tabbar-item icon="setting-o">导航</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";

    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        active: 0,
        title: "首页"
    })

    onMounted(() => {

    })

    const onTabChange = (index: number) => {

    }


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">
    .main-content {
        padding-top: 50px;
        flex: auto;
    }
</style>