<template>
    <div>项目</div>
</template>

<script setup lang="ts">
    import {onActivated, onMounted, reactive} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";
    import {defineOptions} from "unplugin-vue-define-options/macros";

    defineOptions({
        name: "projectPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    onMounted(() => {
        console.log("初始化：>>>>>项目")
    })


</script>

<style scoped lang="less">

</style>