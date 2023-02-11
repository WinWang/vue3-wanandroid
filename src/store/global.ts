import {defineStore} from "pinia"

export const useGlobal = defineStore("global", {
    state: () => {
        return {
            hasLogin: false
        }
    },

    getters: {
        login: (state) => {
            return state.hasLogin
        }
    },

    actions: {
        setLogin(loginState: boolean) {
            this.hasLogin = loginState
        }
    }


})