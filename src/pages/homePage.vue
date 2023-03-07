<template>
    <ViewStateComp :view-state="viewState" @retry="init">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="vertical-layout">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(item, index) in state.bannerList" :key="index">
                        <van-image :src="item?.imagePath" height="220px" width="100%"/>
                    </van-swipe-item>
                </van-swipe>
                <van-list
                    v-model:loading=loading
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div>
                        <template v-for="(item,index) in state.homeList">
                            <div @click="toDetail(item)">
                                <van-row type="flex" justify="space-between">
                                    <div class="list-name">{{
                                            item.shareUser !== "" ? item.shareUser : item.author
                                        }}
                                    </div>
                                    <div class="list-data">{{ item.niceShareDate }}</div>
                                </van-row>
                                <div class="list-title">{{ item.title }}</div>
                                <van-row type="flex" justify="space-between">
                                    <div class="list-type">{{ item.superChapterName }}/{{ item.chapterName }}</div>
                                    <img class="list-icon" :src="item.collect?likeSel:likeNor"
                                         @click.stop="addFavoriteArticle(item.id,index)"/>
                                </van-row>
                                <van-divider></van-divider>
                            </div>
                        </template>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
    </ViewStateComp>
</template>

<script setup lang="ts">
    import {onActivated, onMounted, reactive, ref} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";
    import likeNorUrl from '../assets/img/icon-like-nor.png';
    import likeSelUrl from '../assets/img/icon-like-sel.png';
    import 'vant/es/toast/style';
    import {HomeArticleModelDatas} from "../model/HomeArticleModel";
    import {BannerModelChild} from "../model/BannerModel";
    import ViewStateComp from "../components/ViewStateComp.vue";
    import {useRequestStatus} from "../hooks/useRequestStatus";

    defineOptions({
        name: 'homePage'
    })
    const route = useRoute()
    const router = useRouter()
    const [viewState, requestApi] = useRequestStatus()
    /************变量声明******************/
    const state = reactive({
        bannerList: <Array<BannerModelChild>>[],
        homeList: <Array<HomeArticleModelDatas>>[]
    })
    const loading = ref<boolean>(false)
    const finished = ref<boolean>(false)

    /************变量声明******************/
    const likeNor = likeNorUrl
    const likeSel = likeSelUrl
    let pageIndex = -1
    let pageInit = false

    onMounted(() => {
        init()
    })

    onActivated(() => {

    })

    const init = () => {
        // getBanner()+getHomeList()组合--合并状态
        requestApi(Promise.all([
            apiService.getBanner(), apiService.getHomeList(pageIndex)])).then((res) => {
            //banner数据
            state.bannerList = state.bannerList.concat(res[0].data)
            //首页列表
            state.homeList = state.homeList.concat(res[1].data.datas)
            finished.value = state.homeList.length == res[1].data.total
            loading.value = false
        })
        pageInit = true
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
        if (!pageInit) {
            return
        }
        const homeList = await apiService.getHomeList(pageIndex)
        state.homeList = state.homeList.concat(homeList.data.datas)
        finished.value = state.homeList.length == homeList.data.total
        loading.value = false
    }

    /**
     * 添加收藏文章
     */
    const addFavoriteArticle = async (articleID: number, listIndex: number) => {
        await apiService.addFavorite(articleID)
        state.homeList[listIndex].collect = true
    }


    /**
     * 刷新方法
     */
    const onRefresh = () => {
        pageIndex = 0
        init()
    }

    /**
     * 加载更多
     */
    const onLoad = async () => {
        pageIndex++;
        await getHomeList()
    }

    /**
     * 条目点击
     * @param item
     */
    const toDetail = (item: HomeArticleModelDatas) => {
        window.open(item.link)
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