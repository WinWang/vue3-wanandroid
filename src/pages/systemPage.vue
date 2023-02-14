<template>
    <div>体系</div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"

    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    defineOptions({
        name: 'systemPage'
    })

    onMounted(() => {
        console.log("初始化：>>>>>系统")
    })

</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

</style>