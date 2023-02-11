<template>

</template>

<script setup lang="ts">
    import {onMounted, reactive} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService";

    const route = useRoute()
    const router = useRouter()
    const state = reactive({})

    onMounted(() => {

    })

</script>

<style scoped lang="less">

</style>