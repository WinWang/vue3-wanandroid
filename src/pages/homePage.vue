<template>
    <van-pull-refresh v-model:loading="loading" @refresh="onRefresh">
        <div class="vertical-layout">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item, index) in state.bannerList" :key="index">
                    <van-image :src="item?.imagePath" height="220px" width="100%"/>
                </van-swipe-item>
            </van-swipe>
            <van-list
                v-model:loading="refreshing"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div>
                    <template v-for="(item,index) in state.homeList">
                        <div @click="toDetail(item)">
                            <van-row type="flex" justify="space-between">
                                <div class="list-name">{{ item.shareUser !== "" ? item.shareUser : item.author }}</div>
                                <div class="list-data">{{ item.niceShareDate }}</div>
                            </van-row>
                            <div class="list-title">{{ item.title }}</div>
                            <van-row type="flex" justify="space-between">
                                <div class="list-type">{{ item.superChapterName }}/{{ item.chapterName }}</div>
                                <img class="list-icon" :src="item.collect?likeSel:likeNor"
                                     @click.stop="addMyFavi(item,index)"/>
                            </van-row>
                            <van-divider></van-divider>
                        </div>
                    </template>
                </div>
            </van-list>
        </div>
    </van-pull-refresh>

    <van-loading color="#1989fa" v-if="loading" class="loading-data"/>
</template>

<script setup lang="ts">
    import {onActivated, onMounted, reactive, ref} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";
    import likeNorUrl from '../assets/img/icon-like-nor.png';
    import likeSelUrl from '../assets/img/icon-like-sel.png';
    import 'vant/es/toast/style';

    defineOptions({
        name: 'homePage'
    })
    const route = useRoute()
    const router = useRouter()
    /************变量声明******************/
    const state = reactive({
        bannerList: [],
        homeList: []
    })
    const loading = ref<boolean>(false)
    const refreshing = ref<boolean>(false)
    const finished = ref<boolean>(false)

    /************变量声明******************/
    const likeNor = likeNorUrl
    const likeSel = likeSelUrl
    let pageIndex = 0

    onMounted(() => {
        init()
        console.log("初始化：>>>>>首页")
    })

    onActivated(() => {
        console.log("onActivated执行")
    })

    const init = () => {
        getBanner()
    }

    /**
     * 获取Banner
     */
    const getBanner = async () => {
        const data = await apiService.getBanner()
        state.bannerList = state.bannerList.concat(data.data)
        loading.value = false
    }

    /**
     * 获取首页列表
     */
    const getHomeList = async () => {
        const homeList = await apiService.getHomeList(pageIndex)
        state.homeList = state.homeList.concat(homeList.data.datas)
        finished.value = homeList.data.datas && homeList.data.datas.length % 10 != 0;
        loading.value = false
        refreshing.value = false
    }

    /**
     * 刷新方法
     */
    const onRefresh = async () => {
        pageIndex = 0
        await getBanner()
        await getHomeList()
        refreshing.value = false
    }

    /**
     * 加载更多
     */
    const onLoad = async () => {
        pageIndex++;
        await getHomeList()
    }


</script>

<style scoped lang="less">
    .home-bg {
        width: 100vw;
        height: calc(100vh - 50px);
        overflow: auto;
    }

    .list-name {
        font-size: 14px;
        color: #777;
        margin-left: 15px;
    }

    .list-data {
        font-size: 14px;
        color: #777;
        margin-right: 15px;
    }

    .list-title {
        text-align: left;
        font-size: 16px;
        color: #000;
        margin: 8px 15px;
    }

    .list-type {
        font-size: 14px;
        color: #777;
        margin-left: 15px;
    }

    .list-icon {
        height: 20px;
        width: 20px;
        margin-right: 15px;
    }


</style>