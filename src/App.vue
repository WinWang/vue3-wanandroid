<template>
    <div id="app">
        {{ $route?.meta?.activeName }}
        <!-- 这是vue3的写法，与vue2的写法有所区别，如果这里使用vue2.x写法，会有警告 -->
        <router-view v-slot="{ Component }">
            <keep-alive v-if="$route.meta.keepAlive">
                <div>
                    <component :is="Component" :key="$route.meta.activeName || $route.name" />
                </div>
            </keep-alive>
            <div v-if="!$route.meta.keepAlive">
                <component :is="Component" :key="$route.name" />
            </div>
            
        </router-view>
    </div>
</template>


<script setup lang="ts">
    import {ref, reactive, watch} from "vue";
    import {useRoute, useRouter} from "vue-router";

    const route = useRoute()
    const router = useRouter()

    const state = reactive({
        //缓存缓存路由
        keepAliveList: []
    })


    watch(() => route, (newVal, oldVal) => {
        // console.log(">>>>>" + newVal.name)
        // if (newVal.meta.keepAlive && state.keepAliveList.indexOf(newVal.name) === -1) {
        //     state.keepAliveList.push(newVal.name);
        //     console.log(">>>>>>" + state.keepAliveList);
        // }
    }, {deep: true})

</script>


<style scoped>

</style>
