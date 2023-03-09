<template>
    <slot v-if="viewState===VIEW_STATE_SUCCESS"></slot>
    <div v-else-if="viewState===VIEW_STATE_ERROR" class="loading-content-wrap">
        <van-image width="200px" :src="emptyImage"></van-image>
        <div class="loading-text-tips">暂无数据</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <div v-else-if="viewState===VIEW_STATE_NETWORK_ERROR" class="loading-content-wrap">
        <van-image width="200px" :src="timeoutImage"></van-image>
        <div class="loading-text-tips">暂无数据</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <div v-else-if="viewState===VIEW_STATE_EMPTY" class="loading-content-wrap">
        <van-image width="200px" :src="emptyImage"></van-image>
        <div class="loading-text-tips">暂无数据</div>
        <div class="loading-text-button" @click="retryClick">点我重试</div>
    </div>
    <div v-else class="loading-content-wrap">
        <van-image :src="loading"></van-image>
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
        VIEW_STATE_ERROR,
        VIEW_STATE_NETWORK_ERROR,
        VIEW_STATE_SUCCESS
    } from "../const/ViewStateConstant";

    const props = defineProps({
        viewState: String
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