<template>
    <div>导航</div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import {defineOptions} from "unplugin-vue-define-options/macros";

    defineOptions({
        name: "siteMapPage"
    })
    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    onMounted(() => {
        console.log("初始化：>>>>>导航")
    })

</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

</style>