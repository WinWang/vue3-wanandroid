<template>
    <div class="vertical-layout">
        <div class="login-back">
            <div class="input-wrap">
                <img class="icon-use-pass" src="../assets/img/icon_user.png"/>
                <input class="input-style" placeholder="请输入你的用户名" v-model="phone"/>
            </div>

            <div class="input-wrap">
                <img class="icon-use-pass" src="../assets/img/icon_pass.png"/>
                <input class="input-style" placeholder="请输入你的密码" v-model="password"/>
            </div>

            <div class="login-button" @click="doLogin()">
                登 录
            </div>
            <div class="register-button" @click="$router.push({path:'/RegisterView'})">
                注 册
            </div>
        </div>

        <van-icon name="arrow-left" color="#ff6900" style="position: absolute;left: 10px;top: 20px" size="20px"
                  @click="$router.back()"/>
    </div>
</template>

<!--/*******************************Script-Start**********************************************/-->
<script setup lang="ts">
    import {onMounted, reactive, ref} from "vue"
    import {useRoute, useRouter} from 'vue-router'
    import apiService from "../http/apiService"
    import {showFailToast, showSuccessToast} from "vant";
    import 'vant/es/toast/style';
    import {useUserStore} from "../store/userStore";

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const state = reactive({})
    const phone = ref("")
    const password = ref("")

    onMounted(() => {

    })

    const doLogin = async () => {
        if (phone.value == "" || password.value == "") {
            showFailToast("请输入账号或密码")
            return;
        }
        const loginInfo = await apiService.login(phone.value, password.value)
        userStore.setUserInfo(loginInfo.data)
        userStore.setLoginState(true)
        showSuccessToast("登录成功")
        router.back()
        // .then(res => {
        //     if (res.errorCode === 0) {
        //         this.$toast.success("登录成功")
        //         this.$store.commit('setUserName', res.data.username);
        //         Bus.$emit('loginEvent', true)
        //         this.$router.back();
        //     }
        // })
    }


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
                width: 25px;
                height: 25px;
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

        .register-button {
            margin-top: 40px;
            width: 280px;
            height: 50px;
            border-radius: 25px;
            background: #ff6900;
            font-size: 23px;
            color: white;
            border: 1px solid white;
            line-height: 50px;
        }

    }
</style>