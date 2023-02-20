<template>
    <div class="vertical-layout">
        <div ref="titleBar">
            <van-nav-bar :title="state.title" fixed placeholder active-color="#ee0a24"
                         @click-left=openDrawer>
                <template #left>
                    <van-icon name="wap-nav" color="white" size="18"/>
                </template>
                <template #right>
                    <van-icon name="search" color="white" size="18"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="main-content">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
            </router-view>
        </div>
        <van-tabbar route v-model="activeIndex" @change="onTabChange" placeholder fixed active-color="#ff6900">
            <van-tabbar-item to="/homePage" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/systemPage" icon="search">体系</van-tabbar-item>
            <van-tabbar-item to="/wechatPage" icon="friends-o">公众号</van-tabbar-item>
            <van-tabbar-item to="/projectPage" icon="friends-o">项目</van-tabbar-item>
            <van-tabbar-item to="/siteMapPage" icon="setting-o">导航</van-tabbar-item>
        </van-tabbar>
        <van-popup
            get-container="#app"
            v-model:show="showPop"
            position="left"
            :style="{ width: '70%' ,height:'100%',background:'#DFDFDF'}"
        >
            <div class="drawer-wrap">
                <div class="top-wrap" @click="doLogin">
                    <img class="avator-style" src="../assets/img/avator.jpg"/>
                    <div class="user-name">{{ !userStore.hasLogin ? '登录/注册' : userStore.userInfo.username }}</div>
                </div>

                <van-cell-group>
                    <van-cell value="我的收藏" icon="like-o" is-link @click="toCollect()"/>
                    <van-cell value="TODO" icon="add-o" is-link/>
                    <van-cell value="退出登录" icon="share"/>
                </van-cell-group>

            </div>
        </van-popup>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onActivated, onMounted, reactive, ref, provide} from "vue";
    import {useRoute, useRouter} from 'vue-router'
    import {defineOptions} from "unplugin-vue-define-options/macros";
    import {useUserStore} from "../store/userStore";
    import {showToast} from "vant";

    defineOptions({
        name: "mainPage"
    })
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
        title: "首页",
    })
    const activeIndex = ref(0)
    const showPop = ref<boolean>(false)
    const titleBar = ref<any>(null)
    const toolBarHeight = ref(0)

    onMounted(() => {
        //注入组件高度
        setTimeout(() => {
            toolBarHeight.value = titleBar.value.clientHeight
        })
    })

    provide("toolBarHeight", toolBarHeight)

    onActivated(() => {

    })

    const onTabChange = (index: number) => {
        switch (index) {
            case 0://首页
                state.title = "首页"
                break

            case 1://体系
                state.title = "体系"
                break

            case 2://公众号
                state.title = "公众号"
                break

            case 3://项目
                state.title = "项目"
                break

            case 4://导航
                state.title = "导航"
                break
        }
    }

    const openDrawer = () => {
        showPop.value = true
    }

    const doLogin = () => {
        if (!userStore.getLoginState) {
            router.push({
                path: "/loginPage"
            })
            showPop.value = false
        } else {
            showToast("您已经登录了")
        }
    }


</script>
<!--/********************************Script-End*********************************************/-->

<style scoped lang="less">
    .main-content {
        flex: auto;
    }

    .drawer-wrap {
        display: flex;
        width: 100%;
        flex-direction: column;

        .top-wrap {
            height: 200px;
            background-image: url("../assets/img/drawer-back.jpg");
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .avator-style {
                height: 60px;
                width: 60px;
                border-radius: 30px;
            }

            .user-name {
                margin-top: 15px;
                margin-top: 15px;
                font-size: 18px;
                color: white;
            }

        }

    }

</style>