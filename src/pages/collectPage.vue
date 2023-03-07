<template>
    <div class="vertical-layout">
        <van-nav-bar title="我的收藏" fixed placeholder active-color="#ee0a24"
                     @click-left="$router.back()">
            <template #left>
                <van-icon name="arrow-left" color="white" size="18"/>
            </template>
            <template #right>
                <van-icon name="search" color="white" size="18"/>
            </template>
        </van-nav-bar>
        <ViewStateComp :view-state="viewState" @retry="getCollectList">
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div style="width: 100vw">
                        <template v-for="(item,index) in state.collectList">
                            <div>
                                <div style="height: 20px" v-if="index===0"></div>
                                <van-row type="flex" justify="space-between" @click="itemClick(item)">
                                    <div class="list-name">{{
                                            item.shareUser === "" ? item.author : item.shareUser
                                        }}
                                    </div>
                                    <div class="list-data">{{ item.niceShareDate }}</div>
                                </van-row>
                                <div class="list-title" @click="itemClick(item)">{{ item.title }}</div>
                                <van-row type="flex" justify="space-between" @click="itemClick(item)">
                                    <div class="list-type">{{ item.superChapterName }}/{{ item.chapterName }}</div>
                                </van-row>
                                <van-divider></van-divider>
                            </div>
                        </template>
                    </div>
                </van-list>
            </van-pull-refresh>
        </ViewStateComp>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive, ref} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"
    import {HomeArticleModelDatas} from "../model/HomeArticleModel";
    import ViewStateComp from "../components/ViewStateComp.vue";
    import {useRequestStatus} from "../hooks/useRequestStatus";

    const [viewState, requestApi] = useRequestStatus()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({collectList: <Array<HomeArticleModelDatas>>[]})
    const loading = ref<boolean>(false)
    const refreshing = ref<boolean>(false)
    const finished = ref<boolean>(false)
    let pageIndex = 0

    onMounted(() => {
        getCollectList()
    })

    /**
     * 获取收藏列表数据
     */
    const getCollectList = async () => {
        const result = await requestApi(apiService.getCollectList(pageIndex), pageIndex < 1)
        if (pageIndex == 0) {
            state.collectList = result.data.datas
        } else {
            state.collectList = state.collectList.concat(result.data.datas)
        }
        finished.value = state.collectList.length == result.data.total
        loading.value = false
    }

    const onRefresh = () => {
        pageIndex = 0
        getCollectList()
    }

    /**
     * 加载更多
     */
    const onLoad = async () => {
        if (pageIndex >= 0) {
            pageIndex++;
        } else {
            pageIndex = 0
        }
        await getCollectList()
    }

    /**
     * 条目点击
     * @param item
     */
    const itemClick = (item: HomeArticleModelDatas) => {
        window.open(item.link)
    }


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">
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