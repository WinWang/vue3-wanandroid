import HttpRequest from "./http"
import {showFailToast} from "vant";
import 'vant/es/toast/style';
import {useUserStore} from "../store/userStore";
import router from "../route";
import {AxiosError} from "axios";
/**
 *  为什么我们要对axios进行封装？
 * 1.外部依赖库，有停止维护的风险，将项目中使用的方法逻辑封装到一个文件/文件夹中同意导出，方便更换库，有利于维护
 * 2.封装起来符合高内聚低耦合的思想
 */

/**
 * 这里值得特别注意的一点：如何做到支持传入请求/响应拦截器
 * 思路：要想在创建实例的时候能传入（请求/响应）拦截器，需要修改传入配置对象options: AxiosRequestConfig的类型，读源码可知AxiosRequestConfig类型定义中并不包括拦截器选项，因此如果要传入拦截器配置，需要扩展AxiosRequestConfig类型，这里我定义了一个 HRequestConfig接口来继承AxiosRequestConfig接口，实现对AxiosRequestConfig的扩展。
 *  当然要传入拦截器配置，首先要定义拦截器的类型，我们可以定义一个InterceptorHooks接口，包含了4个拦截器方法，都为可选项（不是每次请求都要传入拦截器，如果不设置为可选，则必须要传）
 * ，原有的需要在 HRequest类中声明一个承载interceptor的属性
 */

/**
 * 一般情况下，只需创建一个实例
 * 什么时候需要创建多个实例？
 * 比如baseURL不同，且在这个baseURL下请求多次，这个时候创建一个公用的请求实例能够提升代码的可维护性
 */

const userStore = useUserStore()
const httpRequest = new HttpRequest({
    baseURL: "/api",
    timeout: 10 * 1000,
    checkResultCode: true,
    interceptorHooks: {
        requestInterceptor: (config) => {
            // const token = localCache.getCache('token');
            // console.log('config', config);
            //
            // if (config !== undefined && token) {
            //     config!.headers!.Authorization = `Bearer ${token}`;
            //     config!.headers!.post['Content-Type'] = 'application/json;charset=UTF-8'
            // }
            if (config.checkLoginState) {
                if (userStore.getLoginState) {
                    return config
                } else if (config.needJumpToLogin) {
                    router.push({
                        path: "/loginPage"
                    })
                    throw new AxiosError("请登录")
                }
            }
            return config;
        },
        requestInterceptorCatch: (err) => {
            console.log("RequestError", err.toString())
            return err;
        },
        responseInterceptor: (response) => {
            //优先执行自己的请求响应拦截器，在执行通用请求request的
            if (response.status === 200) {
                // @ts-ignore
                const checkResultCode = response.config.checkResultCode
                if (checkResultCode && response.data.errorCode != 0) {
                    showFailToast(response.data.errorMsg)
                    return Promise.reject(response)
                }
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response);
            }
        },
        responseInterceptorCatch: (error) => {
            console.log("ResponseError", error.toString())
            errorHandler(error);
            return Promise.reject(error);
        },
    },
});

export function errorHandler(error: any) {
    if (error instanceof AxiosError) {
        showFailToast(error.message)
    } else if (error != undefined && error.response != undefined && error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:

                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                showFailToast("登录过期，请重新登录")
                // 清除token
                localStorage.removeItem('token');

                break;
            // 404请求不存在
            case 404:
                showFailToast("网络请求不存在")
                break;

            // 其他错误，直接抛出错误提示
            default:
                showFailToast(error.response.data.message)
        }

    }
}

export default httpRequest;