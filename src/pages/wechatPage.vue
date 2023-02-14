<template>
    <div>公众号</div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"
    import {defineOptions} from "unplugin-vue-define-options/macros";

    defineOptions({
        name: "wechatPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    onMounted(() => {
        console.log("初始化：>>>>>公众号")
    })

</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

</style>