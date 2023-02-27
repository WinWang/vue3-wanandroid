<template>
    <div id="app" style="width: 375px;">
        <!-- 这是vue3的写法，与vue2的写法有所区别，如果这里使用vue2.x写法，会有警告 -->
        <router-view v-slot="{ Component , route}">
            <keep-alive>
                <component :is="Component" :key="getFirstLevelRoute(route).name"
                           v-if="getFirstLevelRoute(route).meta.keepAlive"/>
            </keep-alive>
            <component :is="Component" :key="getFirstLevelRoute(route).name"
                       v-if="!getFirstLevelRoute(route).meta.keepAlive"/>
        </router-view>
    </div>
</template>


<script setup lang="ts">
    import {ref, reactive, watch} from "vue";
    import {RouteLocationNormalized, useRoute, useRouter} from "vue-router";

    const route = useRoute()
    const router = useRouter()

    const state = reactive({
        //缓存缓存路由
        keepAliveList: []
    })

    /**
     * 解决路由嵌套刷新的问题--获取真正的路由根结点
     * @param route
     */
    const getFirstLevelRoute = (route: RouteLocationNormalized) => {
        if (!Array.isArray(route.matched) || route.matched.length === 0) {
            return route;
        }
        return route.matched[0];
    }

    watch(() => route, (newVal, oldVal) => {
        // console.log(">>>>>" + newVal.name)
        // if (newVal.meta.keepAlive && state.keepAliveList.indexOf(newVal.name) === -1) {
        //     state.keepAliveList.push(newVal.name);
        //     console.log(">>>>>>" + state.keepAliveList);
        // }
    }, {deep: true})

</script>


<style scoped lang="less">

</style>
