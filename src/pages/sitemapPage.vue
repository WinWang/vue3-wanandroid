<template>
    <ViewStateComp :view-state="viewState" @retry="getSiteData">
        <div class="vertical-layout">
            <template v-for="(item,index) in state.siteList">
                <div>
                    <van-sticky :offset-top="toolHeight">
                        <div class="site-header">{{ item.name }}</div>
                    </van-sticky>

                    <div class="site-wrap">
                        <template v-for="(itemIn,ind) in item.articles">
                            <!--<van-tag round :type="setButtonStyle(ind)" size="large" style="margin: 10px 5px">-->
                            <!--{{itemIn.title}}-->
                            <!--</van-tag>-->
                            <div @click="itemClick(itemIn)"
                                 :class="['tab-style',{'color-1':ind%1==0,'color-2':ind%2==0,'color-3':ind%3==0,'color-4':ind%4==0,'color-5':ind%5==0,'color-6':ind%6==0,'color-7':ind%7==0,'color-8':ind%8==0,'color-9':ind%9==0,'color-9':ind%0==0}]">
                                {{ itemIn.title }}
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </ViewStateComp>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {inject, onMounted, reactive} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import {defineOptions} from "unplugin-vue-define-options/macros";
    import {SiteModel} from "../model/SiteModel";
    import apiService from "../http/apiService";
    import ViewStateComp from "../components/ViewStateComp.vue";
    import {useRequestStatus} from "../hooks/useRequestStatus";

    defineOptions({
        name: "siteMapPage"
    })
    const [viewState, requestApi] = useRequestStatus()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        siteList: <Array<SiteModel>>[]
    })
    const toolHeight = inject("toolBarHeight")

    onMounted(() => {
        getSiteData()
    })

    const getSiteData = async () => {
        const result = await requestApi(apiService.getSite())
        state.siteList = result.data

    }


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

    .site-header {
        height: 40px;
        background: aliceblue;
        color: black;
        font-size: 18px;
        line-height: 40px;
        text-align: left;
        padding-left: 15px;
        font-style: italic;
        font-weight: 700;

    }

    .site-wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 10px 0px;
    }

    .tab-style {
        margin: 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: white;
        padding: 0px 10px;
        font-size: 15px;
        border-radius: 20px;
        background: #ff57fa;
    }

    .color-1 {
        background: #ea986c;
    }

    .color-2 {
        background: #eaacc8;
    }

    .color-3 {
        background: #e6ea74;
    }

    .color-4 {
        background: #9f60ea;
    }

    .color-5 {
        background: #73eac3;
    }

    .color-6 {
        background: #4264ea;
    }

    .color-7 {
        background: #ea5f19;
    }

    .color-8 {
        background: #c132ea;
    }

    .color-9 {
        background: #ea986c;
    }

    .color-0 {
        background: #adabea;
    }

</style>