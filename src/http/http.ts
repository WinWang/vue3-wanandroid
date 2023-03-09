import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse,} from "axios";
import 'vant/es/toast/style';
import {errorHandler} from "./request";


/**
 * 定义接口响应包装类
 */
export interface BaseResponse {
    //wanAndroid-API响应体
    errorCode: number
    errorMsg: string
    //拓展xxx-API响应体
}

/**
 * 接口实现类包装，例如有其他业务可以再次继承实现xxxResponse
 */
export interface ApiResponse<T = any> extends BaseResponse {
    //wanAndroid-API响应体
    data: T | any;
    //拓展xxx-API响应体
}

/**
 * 封装后，不支持传入拦截器
 * 需要自己定义接口继承 AxiosRequestConfig类型
 * 从而支持传入拦截器，但拦截器选项应为可选属性
 * 之后请求实例传入的options为继承了AxiosRequestConfig的自定义类型
 */
interface InterceptorHooks {
    requestInterceptor?: (config: HttpRequestConfig) => HttpRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    responseInterceptorCatch?: (error: any) => any;
}

interface HttpRequestConfig extends AxiosRequestConfig {
    showLoading?: boolean; //是否展示请求loading
    checkResultCode?: boolean;//是否检验响应结果码
    checkLoginState?: boolean //校验用户登陆状态
    needJumpToLogin?: boolean //是否需要跳转到登陆页面
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
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then(res => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log("request方法>>>>>>>" + err)
                    errorHandler(err)
                    if (err) {
                        reject(err);
                    }
                });
        });
    }

    // get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    //     return this.instance.get(url, {params});
    // }

    get<T = any>(config: HttpRequestConfig): Promise<ApiResponse<T>> {
        return this.request({...config, method: 'GET'});
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





