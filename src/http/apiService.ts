import {HomeArticleModel} from "../model/HomeArticleModel";
import {BannerModelChild} from "../model/BannerModel";
import httpRequest from "./request"


// let baseUrl = process.env.VUE_APP_BASE_URL;
let baseUrl = "";

// let baseUrlPost = process.env.VUE_APP_BASE_URL_POST;

/**
 * 获取Banner接口
 */
function getBanner() {
    return httpRequest.get<Array<BannerModelChild>>({url: baseUrl + "/banner/json"})
}


/**
 * 获取首页接口
 * @param index
 */
function getHomeList(index: number) {
    return httpRequest.get<HomeArticleModel>({url: baseUrl + "/article/list/" + index + "/json"});
}


export default {
    getBanner,
    getHomeList,
}

