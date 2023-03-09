<template>
    <div class="vertical-layout" ref="el"
         style="display: flex;flex-direction: column ;">
        <div style="height: 300px;background: #9f60ea"></div>
        <div style="height: 500px;background: #73eac3">{{ displayY }}</div>
        <div>{{ isScrolling }}</div>
        <div style="height: 500px;background: #9f60ea"></div>
        <div style="height: 500px;background: #ff6900"></div>

    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {computed, onMounted, ref} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import {useScroll} from "@vueuse/core";

    const el = ref<HTMLElement | null>(null)
    const {x, y, isScrolling, arrivedState, directions} = useScroll(el, {
        offset: {top: 30, bottom: 30, right: 30, left: 30},
    })

    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
        setTimeout(() => {
            console.log(el.value?.clientHeight)
        }, 300)
    })

    const displayY = computed({
        get() {
            return y.value.toFixed(1)
        },
        set(val) {
            y.value = parseFloat(val)
        },
    })


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">

</style>