<template>
    <van-skeleton>
        <template #template>
            <div class="home-skeleton">
                <van-skeleton-image style="width: 100%;height: 200px;margin-top: 10px"/>
                <template v-for="(item) in 5">
                    <van-skeleton :row="4" style="margin-top: 10px;margin-bottom: 10px"></van-skeleton>
                </template>
            </div>
        </template>
    </van-skeleton>
</template>

<script>
    export default {
        name: "homeSkeleton"
    }
</script>

<style scoped lang="less">
    .home-skeleton {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>