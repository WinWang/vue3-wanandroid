<template>
    <!--    成功状态-->
    <slot v-if="viewState===VIEW_STATE_SUCCESS"></slot>
    <!--普通错误状态-->
    <div v-else-if="viewState===VIEW_STATE_ERROR" class="loading-content-wrap">
        <van-image width="200px" :src="emptyImage"></van-image>
        <div class="loading-text-tips">数据异常</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <!--网络错误状态-->
    <div v-else-if="viewState===VIEW_STATE_NETWORK_ERROR" class="loading-content-wrap">
        <van-image width="200px" :src="timeoutImage"></van-image>
        <div class="loading-text-tips">网络异常</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <!--空页面状态-->
    <div v-else-if="viewState===VIEW_STATE_EMPTY" class="loading-content-wrap">
        <van-image width="200px" :src="emptyImage"></van-image>
        <div class="loading-text-tips">暂无数据</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <!--骨架屏或者loading-->
    <div v-else>
        <!--骨架屏-->
        <template v-if="skeleton">
            <template v-for="(item,index) in skeletonSize">
                <slot name="skeleton" v-if="customSkeleton"></slot>
                <van-skeleton v-else title :row="3" style="margin-top: 10px;margin-bottom: 10px"></van-skeleton>
            </template>
        </template>
        <!--普通loading-->
        <div v-else class="loading-content-wrap">
            <van-image :src="loading"></van-image>
        </div>
    </div>

</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted} from "vue"
    import emptyImage from "../assets/img/common_empty_content.png"
    import timeoutImage from "../assets/img/timeout.png"
    import loading from "../assets/img/loading.gif"

    import {
        VIEW_STATE_EMPTY,
        VIEW_STATE_ERROR, VIEW_STATE_LOADING,
        VIEW_STATE_NETWORK_ERROR,
        VIEW_STATE_SUCCESS
    } from "../const/ViewStateConstant";

    const props = defineProps({
        //页面状态
        viewState: {
            type: String,
            default: VIEW_STATE_LOADING
        },
        //是否骨架屏
        skeleton: {
            type: Boolean,
            default: false,
        },
        //自定义骨架屏
        customSkeleton: {
            type: Boolean,
            default: false
        },
        //是否列表类骨架屏-列表默认长度
        skeletonSize: {
            type: Number,
            default: 1
        }
    })
    const emits = defineEmits(["retry"])
    const retryClick = () => {
        emits("retry")
    }

    onMounted(() => {

    })

    // watch(() => props.viewState, (newValue, oldValue) => {
    //     console.log("viewState>>>>>>>>" + newValue)
    // })


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

    .loading-content-wrap {
        flex-direction: column;
        display: flex;
        width: 100vw;
        height: 70vh;
        align-items: center;
        justify-content: center;
    }

    .loading-text-tips {
        font-size: 15px;
        color: #333333;
    }

    .loading-text-button {
        margin-top: 10px;
        line-height: 30px;
        color: #ff6900;
        font-size: 15px;
        height: 30px;
        width: 120px;
        text-align: center;
        border: 1px solid #FF6900;
        border-radius: 20px;
    }


</style>