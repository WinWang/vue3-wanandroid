<template>
    <div class="vertical-layout">
        <van-tabs color="#ff6900" line-height="2px" title-active-color="#ff6900" title-inactive-color="#333" sticky
                  swipeable v-model:active="tabActive" @click-tab="changeTab" :ellipsis=isEllipsis
                  :offset-top=toolHeight>
            <van-tab v-for="(tab,index) in state.wechatTab" :title="tab.name" :key="index">
            </van-tab>

            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div style="width: 100vw">
                    <template v-for="(item,index) in state.chatList">
                        <div>
                            <div style="height: 20px" v-if="index===0"></div>
                            <van-row type="flex" justify="space-between" @click="itemClick(item)">
                                <div class="list-name">{{ item.shareUser === "" ? item.author : item.shareUser }}</div>
                                <div class="list-data">{{ item.niceShareDate }}</div>
                            </van-row>
                            <div class="list-title" @click="itemClick(item)">{{ item.title }}</div>
                            <van-row type="flex" justify="space-between" @click="itemClick(item)">
                                <div class="list-type">{{ item.superChapterName }}/{{ item.chapterName }}</div>
                                <img class="list-icon" :src="item.collect?likeSel:likeNor"/>
                            </van-row>
                            <van-divider></van-divider>
                        </div>
                    </template>
                </div>
            </van-list>
        </van-tabs>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {inject, onMounted, reactive, ref} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"
    import {defineOptions} from "unplugin-vue-define-options/macros";
    import {WechatTabModel} from "../model/WechatTabModel";
    import {HomeArticleModelDatas} from "../model/HomeArticleModel";
    import likeNorUrl from "../assets/img/icon-like-nor.png";
    import likeSelUrl from "../assets/img/icon-like-sel.png";

    defineOptions({
        name: "wechatPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        wechatTab: <Array<WechatTabModel>>[],
        chatList: <Array<HomeArticleModelDatas>>[]
    })
    const tabActive = ref(0)
    const loading = ref<boolean>(false)
    const refreshing = ref<boolean>(false)
    const finished = ref<boolean>(false)
    const isEllipsis = ref<boolean>(false)
    const toolHeight = inject("toolBarHeight")

    const likeNor = likeNorUrl
    const likeSel = likeSelUrl
    let pageIndex = 0 //公众号请求页码
    let courseId = -1; //公众号ID

    onMounted(() => {
        getWeChatTab()
    })

    const getWeChatTab = async () => {
        const result = await apiService.getWeChatTab()
        state.wechatTab = state.wechatTab.concat(result.data)
        courseId = state.wechatTab[0].id
        await getWechatHistory()
    }

    const getWechatHistory = async () => {
        const result = await apiService.getChatHistory(courseId, pageIndex)
        refreshing.value = false
        if (pageIndex == 0) {
            state.chatList = result.data.datas
        } else {
            state.chatList = state.chatList.concat(result.data.datas)
        }
        finished.value = (state.chatList.length === result.data.total)
        loading.value = false
    }

    const changeTab = (index: any) => {
        courseId = state.wechatTab[index.name].id
        pageIndex = 0
        finished.value = false
        loading.value = false
        getWechatHistory()
    }

    /**
     * 加载更多
     */
    const onLoad = async () => {
        if (courseId > 0) {
            pageIndex++;
            await getWechatHistory()
        }
    }

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