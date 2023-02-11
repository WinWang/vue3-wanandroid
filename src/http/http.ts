import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse,} from "axios";
import {showFailToast} from "vant";


/**
 * 定义接口响应包装类
 */
export interface BaseResponse {
    errorCode: number
    errorMsg: string
}

/**
 * 接口实现类包装，例如有其他业务可以再次继承实现xxxResponse
 */
export interface ApiResponse<T = any> extends BaseResponse {
    data: T | any;
}

// 请求超时时间10s-全局配置-有独立需求可去request对象配置独立对象
axios.defaults.timeout = 10 * 1000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截器
axios.interceptors.request.use(
    config => {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config!.headers!.setContentType = "application/x-www-form-urlencoded"
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        // config.headers.account = localStorage.getItem("account");
        // config.headers.appToken = localStorage.getItem("token");
        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.errorCode != 0) {
                showFailToast(response.data.errorMsg)
                // if(response.data.errorCode===-1001){ //登录拦截处理
                //     router.push({
                //         path:'/LoginView'
                //     })
                // }
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
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
            return Promise.reject(error.response);
        }
    }
);


/**
 * 封装后，不支持传入拦截器
 * 需要自己定义接口继承 AxiosRequestConfig类型
 * 从而支持传入拦截器，但拦截器选项应为可选属性
 * 之后请求实例传入的options为继承了AxiosRequestConfig的自定义类型
 */
interface InterceptorHooks {
    requestInterceptor?: (config: HttpRequestConfig) => HttpRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
    responseInterceptorCatch?: (error: any) => any;
}

interface HttpRequestConfig extends AxiosRequestConfig {
    showLoading?: boolean;
    interceptorHooks?: InterceptorHooks;
}


class HttpRequest {
    config: HttpRequestConfig;
    interceptorHooks?: InterceptorHooks;
    instance: AxiosInstance;

    constructor(options: HttpRequestConfig) {
        this.config = options;
        this.interceptorHooks = options.interceptorHooks;
        this.instance = axios.create(options);
        this.setupInterceptor()
    }


    setupInterceptor(): void {
        this.instance.interceptors.request.use(
            // res => {
            //     return Promise.resolve(res.data)
            // },
            // error => {
            //     return Promise.reject(error)
            // },
            this.interceptorHooks?.requestInterceptor,
            this.interceptorHooks?.requestInterceptorCatch
        );
        this.instance.interceptors.response.use(
            this.interceptorHooks?.responseInterceptor,
            this.interceptorHooks?.responseInterceptorCatch
        );
    }

    // 类型参数的作用，T决定AxiosResponse实例中data的类型
    request<T = any>(config: HttpRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance
                .request<any, AxiosResponse<T>>(config)
                .then(res => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    //     return this.instance.get(url, {params});
    // }

    get<T = any>(config: HttpRequestConfig): Promise<ApiResponse<T>> {
        return this.instance({...config, method: 'GET'});
    }

    post<T = any>(config: HttpRequestConfig): Promise<ApiResponse<T>> {
        return this.request({...config, method: 'POST'});
    }

    delete<T = any>(config: HttpRequestConfig): Promise<ApiResponse<T>> {
        return this.request({...config, method: 'DELETE'});
    }

    patch<T = any>(config: HttpRequestConfig): Promise<ApiResponse<T>> {
        return this.request({...config, method: 'PATCH'});
    }
}

export default HttpRequest





