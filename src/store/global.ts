import {defineStore} from "pinia"

export const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            //保存页面顶部滚动的位置
            scrollTopValue: 0,
            //保存页面顶部滚动的位置key-value
            scrollKeyValue: new Map<string, number>()
        }
    },

    getters: {
        getScrollTopValue: (state) => {
            return state.scrollTopValue
        },

        getScrollKeyValue: (state) => {
            return state.scrollKeyValue
        }
    },

    actions: {
        setScrollTopValue(scrollTop: number) {
            this.scrollTopValue = scrollTop
        },

        setScrollKeyValue(key: string, value: number) {
            this.scrollKeyValue.set(key, value)
        }
    }


})