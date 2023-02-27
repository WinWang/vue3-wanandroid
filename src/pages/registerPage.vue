<template>
    <div class="vertical-layout">
        <div class="login-back">
            <div class="input-wrap">
                <img class="icon-use-pass" src="../assets/img/icon_user.png"/>
                <input class="input-style" placeholder="请输入你的用户名"/>
            </div>

            <div class="input-wrap">
                <img class="icon-use-pass" src="../assets/img/icon_pass.png"/>
                <input class="input-style" placeholder="请输入你的密码"/>
            </div>

            <div class="input-wrap">
                <img class="icon-use-pass" src="../assets/img/icon_pass.png"/>
                <input class="input-style" placeholder="请确认你的密码"/>
            </div>

            <div class="login-button">
                注 册
            </div>
        </div>

        <van-icon name="arrow-left" color="#fff" style="position: absolute;left: 10px;top: 20px" size="20px"
                  @click="$router.back()"/>

    </div>
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
    .login-back {
        height: 100vh;
        width: 375px;
        background: linear-gradient(360deg, #ff6900, rgba(255, 105, 0, 0.3));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .input-wrap {
            display: flex;
            flex-direction: row;
            height: 60px;
            align-items: center;
            width: 280px;

            .icon-use-pass {
                width: 30px;
                height: 30px;
            }

            .input-style {
                margin-left: 20px;
                background: none;
                border: none;
                outline: none;
                width: 230px;
                height: 50px;
                font-size: 18px;
                color: #fff;
                border-bottom: 1px solid white;
            }
        }

    }


    .login-button {
        margin-top: 40px;
        width: 280px;
        height: 50px;
        border-radius: 25px;
        background: white;
        font-size: 23px;
        color: #ff6900;
        line-height: 50px;
    }

    input::-webkit-input-placeholder {
        color: #eae9e5;
    }
</style>