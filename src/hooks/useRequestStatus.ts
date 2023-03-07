import type {Ref} from "vue";
import {ref} from "vue";
import {VIEW_STATE_EMPTY, VIEW_STATE_ERROR, VIEW_STATE_LOADING, VIEW_STATE_SUCCESS} from "../const/ViewStateConstant";
import {ApiResponse} from "../http/http";

type LoadStateResult = [
    Ref<string>,
    <T>(requestPromise: Promise<T>, showLoadingState?: boolean) => Promise<T>
];

/**
 * 在给run方法传入一个promise(该Promise是网络请求类的Promise)，根据网络请求的状态封装对应数据请求外传
 * @param viewState 页面状态
 * @param checkResult 是否检查页面结果
 */
export function useRequestStatus(viewState: string = VIEW_STATE_LOADING, checkResult?: boolean): LoadStateResult {
    const viewStatus = ref(viewState);

    /**
     * 针对多个网络请求共同结果，可以使用Promise.all([p0,p1,p2.....])生成新的Promise，将生成的Promise传递进来即可，外部针对请求的长度取对应的结果集[result1,result2]
     * @param requestPromise 网络请求的Promise，支持单个promise和Promise.all的请求
     * @param showLoadingState 是否展示loading的动画（上拉加载列表情况的处理）
     */
    function run<T>(requestPromise: Promise<T>, showLoadingState?: boolean): Promise<T> {
        if (showLoadingState != false) {
            viewStatus.value = VIEW_STATE_LOADING;
        }
        return new Promise<T>((resolve, reject) => {
            requestPromise.then((res) => {
                if (res instanceof Array) {//兼容Promise.all请求
                    viewStatus.value = VIEW_STATE_SUCCESS
                } else {
                    if (checkResult) {
                        const result = res as ApiResponse
                        const resultData = result.data
                        // console.log(">>>>>>>>>>>>>>>>>>" + result.errorCode)
                        if (result.errorCode != 0) {
                            // console.log(">>>>>>>Error")
                            viewStatus.value = VIEW_STATE_ERROR
                        } else if (resultData instanceof Array && resultData.length == 0) {
                            // console.log(">>>>>>>Empty")
                            viewStatus.value = VIEW_STATE_EMPTY
                        } else {
                            viewStatus.value = VIEW_STATE_SUCCESS
                        }
                    } else {
                        viewStatus.value = VIEW_STATE_SUCCESS
                    }
                }
                resolve(res)
            }).catch((error) => {
                viewStatus.value = VIEW_STATE_ERROR
                reject(error)
            })
        })
    }

    return [viewStatus, run];
}