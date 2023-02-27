import {defineStore} from "pinia";
import {LoginModel} from "../model/LoginModel";

/**
 * 用户登陆状态信息保存
 */
export const useUserStore = defineStore("userInfo", {
    state: () => {
        return {
            hasLogin: false,
            userInfo: <LoginModel>{}
        }
    },

    getters: {
        getLoginState: (state) => {
            return state.hasLogin
        },
        getUserInfo: (state) => {
            return state.userInfo
        }
    },

    actions: {
        setLoginState(loginState: boolean) {
            this.hasLogin = loginState
        },

        setUserInfo(userInfo: LoginModel | null) {
            if (userInfo) {
                this.userInfo = userInfo
            } else {
                this.userInfo = <LoginModel>{}
            }
        }
    },

    persist: {
        enabled: true
    }


})