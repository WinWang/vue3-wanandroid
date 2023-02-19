<template>
    <div class="vertical-layout">
        <van-tabs color="#ff6900" v-model:active="tabActive" line-height="2px" title-active-color="#ff6900"
                  title-inactive-color="#333" sticky
                  swipeable @change="changeTab" :offset-top="toolHeight">
            <van-tab v-for="(tab,index) in state.projectTList" :title="tab.name" :key="index">
            </van-tab>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div style="width: 100vw">
                    <template v-for="(item,index) in state.PList">
                        <div>
                            <div style="height: 20px" v-if="index==0"></div>
                            <div style="display: flex;flex-direction: row; justify-content: center"
                                 @click="itemClick(item)">
                                <van-image :src="item.envelopePic" height="120" width="60" lazy-load
                                           @click="previewImg(item.envelopePic)"/>
                                <div style="display: flex;flex-direction: column;width: 280px;margin-left: 10px">
                                    <div class="p-title">{{ item.title }}</div>
                                    <div class="p-desc">{{ item.desc }}</div>
                                    <van-row type="flex" justify="space-between" style="margin-top: 10px">
                                        <div class="list-type">{{ item.shareUser == "" ? item.author : item.shareUser }}
                                        </div>
                                        <div class="list-data">{{ item.niceDate }}</div>
                                    </van-row>
                                    <img class="list-icon" :src="item.collect?likeSel:likeNor"/>
                                </div>
                            </div>
                            <van-divider></van-divider>
                        </div>
                    </template>
                </div>
            </van-list>
        </van-tabs>

    </div>
</template>

<script setup lang="ts">
    import {inject, onMounted, reactive, ref} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";
    import {defineOptions} from "unplugin-vue-define-options/macros";
    import likeNorUrl from '../assets/img/icon-like-nor.png';
    import likeSelUrl from '../assets/img/icon-like-sel.png';
    import {ProjectListModelDatas} from "../model/ProjectListModel";
    import {ProjectTypeModel} from "../model/ProjectTypeModel";

    defineOptions({
        name: "projectPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        projectTList: <Array<ProjectListModelDatas>>[],//type类型List
        PList: <Array<ProjectTypeModel>>[],//项目数据
    })
    const loading = ref<boolean>(false)
    const finished = ref<boolean>(false)
    const tabActive = ref(0)
    const toolHeight = inject("toolBarHeight")
    /************变量声明******************/
    const likeNor = likeNorUrl
    const likeSel = likeSelUrl
    let pid = -1
    let pageIndex = -1

    onMounted(() => {
        getTreeList()
    })

    /**
     * 获取Tree列表
     */
    const getTreeList = async () => {
        const treeData = await apiService.getProjectType()
        state.projectTList = treeData.data;
        pid = treeData.data[0].id;
        getePList()
    }

    /**
     * 获取项目列表
     */
    const getePList = async () => {
        await apiService.getProjectList(pid, pageIndex)
            .then(res => {
                if (res.data.datas.length > 0) {
                    if (pageIndex === 0) {
                        state.PList = res.data.datas
                    } else {
                        state.PList = state.PList.concat(res.data.datas);
                    }
                    if (res.data.datas.length % 10 == 0) {
                        finished.value = true;
                    } else {
                        finished.value = false
                    }
                    loading.value = false;
                } else {
                    loading.value = false;
                    finished.value = true
                }
            })
    }

    const changeTab = (index: any) => {
        pageIndex = 0;
        loading.value = false;
        finished.value = false;
        pid = state.projectTList[index].id;
        getePList()
    }

    /**
     * 加载更多
     */
    const onLoad = async () => {
        if (pid > 0) {
            pageIndex++;
            await getePList()
        }
    }

    const itemClick = (item: ProjectListModelDatas) => {
        window.open(item.link)
    }


</script>

<style scoped lang="less">

    .p-title {
        font-size: 15px;
        color: #333;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .p-desc {
        margin-top: 5px;
        font-size: 15px;
        color: #999;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .list-data {
        font-size: 14px;
        color: #777;
        margin-right: 15px;
    }

    .list-type {
        font-size: 14px;
        color: #777;
    }

    .list-icon {
        margin-top: 10px;
        height: 20px;
        width: 20px;
        align-self: flex-end;
        margin-right: 10px;
    }
</style>