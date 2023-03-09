<template>
    <div>页面未找到</div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"

    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    onMounted(() => {

    })

</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

</style>