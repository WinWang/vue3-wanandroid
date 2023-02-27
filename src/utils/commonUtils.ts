/**
 * 获取cookie值
 * @param name
 * @returns {string}
 */
function getCookie(name: string) {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split('; ');
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split('=');
        if (arr[0] == name) return arr[1];
    }
    return '';
}


/**
 * 设置Cookie
 * @param name
 * @param value
 * @param expireHours
 */
function addCookie(name: string, value: string, expireHours: number) {
    let cookieString = name + "=" + decodeURIComponent(value);
    //判断是否设置过期时间
    if (expireHours > 0) {
        let date = new Date();
        date.setTime(date.getTime() + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toUTCString();
    }
    document.cookie = cookieString;
}


/**
 * 获取连接参数
 * @param name
 * @returns {string | null}
 */
function getUrlKey(name: string) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export default {
    getCookie,
    addCookie,
    getUrlKey,
}



