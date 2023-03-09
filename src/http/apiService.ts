import {HomeArticleModel} from "../model/HomeArticleModel";
import {BannerModelChild} from "../model/BannerModel";
import httpRequest from "./request"
import {SystemModel} from "../model/SystemModel";
import {WechatTabModel} from "../model/WechatTabModel";
import {SiteModel} from "../model/SiteModel";
import {ProjectTypeModel} from "../model/ProjectTypeModel";
import {ProjectListModel} from "../model/ProjectListModel";
import {LoginModel} from "../model/LoginModel";


// let baseUrl = process.env.VUE_APP_BASE_URL;

// let baseUrlPost = process.env.VUE_APP_BASE_URL_POST;

/**
 * 获取Banner接口
 */
function getBanner() {
    return httpRequest.get<Array<BannerModelChild>>(
        {
            url: "/banner/json",
            checkResultCode: false
        }
    )
}


/**
 * 获取首页接口
 * @param index
 */
function getHomeList(index: number) {
    return httpRequest.get<HomeArticleModel>(
        {
            url: "/article/list/" + index + "/json",
        }
    );
}


/**
 * 获取系统架构数据
 */
function getSystem() {
    return httpRequest.get<Array<SystemModel>>({url: "/tree/json"});
}

/**
 * 获取微信公众号Tab数据
 */
function getWeChatTab() {
    return httpRequest.get<Array<WechatTabModel>>({url: "/wxarticle/chapters/json"});
}


/**
 * 获取公众号的历史文章列表
 * @param id
 * @param index
 */
function getChatHistory(id: number, index: number) {
    return httpRequest.get<HomeArticleModel>({url: "/wxarticle/list/" + id + "/" + index + "/json"})
}


/**
 * 获取导航数据
 */
function getSite() {
    return httpRequest.get<Array<SiteModel>>({url: "/navi/json"});
}


/**
 * 登录接口
 * @param phone
 * @param password
 */
function login(phone: string, password: string) {
    return httpRequest.post<LoginModel>({
        url: "/user/login",
        params: {"username": phone, "password": password}
    })
}


/**
 * 获取项目分类
 */
function getProjectType() {
    return httpRequest.get<Array<ProjectTypeModel>>({url: "/project/tree/json"})
}


/**
 * 获取项目列表
 */
function getProjectList(id: number, index: number) {
    return httpRequest.get<ProjectListModel>({url: "/project/list/" + index + "/json?cid=" + id})
}

/**
 * 获取收藏列表
 * @param pageIndex
 */
function getCollectList(pageIndex: number) {
    return httpRequest.get<HomeArticleModel>({url: "/lg/collect/list/" + pageIndex + "/json"})
}

/**
 * 收藏站内文章
 * @param id
 */
function addFavorite(id: number) {
    return httpRequest.post({
        url: '/lg/collect/' + id + '/json',
        checkLoginState: true,
        needJumpToLogin: true,
        showLoading: true
    })
}


export default {
    getBanner,
    getHomeList,
    getSystem,
    getWeChatTab,
    getChatHistory,
    getSite,
    login,
    getProjectType,
    getProjectList,
    getCollectList,
    addFavorite,
}

