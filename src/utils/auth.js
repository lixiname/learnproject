const TOKEN_IDCARD = 'idcard-token'
const TOKEN_NAME = 'name-token'
const TOKEN_IDENTITY = 'identity-token'
const TOKEN_KEY = 'mxg-msm-token'
const USER_KEY = 'mxg-msm-user'
// 获取 token
export function getToken() {
    return window.sessionStorage.getItem(TOKEN_KEY)
}
export function getTokenID() {
    return window.sessionStorage.getItem(TOKEN_IDCARD)
}
export function getTokenN() {
    return window.sessionStorage.getItem(TOKEN_NAME)
}
export function getTokenIdentity() {
    return window.sessionStorage.getItem(TOKEN_IDENTITY)
}
// 保存 token
export function setTokenID(token) {
    return  window.sessionStorage.setItem(TOKEN_IDCARD, token)
}
export function setTokenN(token) {
    return  window.sessionStorage.setItem(TOKEN_NAME, token)
}
export function setTokenIdentity(token) {
    return  window.sessionStorage.setItem(TOKEN_IDENTITY, token)
}
export function removeTokens() {
    window.sessionStorage.removeItem(TOKEN_IDCARD)
    window.sessionStorage.removeItem(TOKEN_NAME)
    window.sessionStorage.removeItem(TOKEN_IDENTITY)
}
// 获取用户信息
export function getUser() {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY))
}
//保存用户信息
export function setUser(user) {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}
//移除用户信息
export function removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_KEY)
}

export function getDateTime(){
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();
    let datetime = year + '-' + month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    return datetime;
}
