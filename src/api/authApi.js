import apiHttp from './apiHttp'

/**
 * 注册接口
 *
 * @param {*} code 验证码
 * @param {*} phone 手机号
 * @param {*} passwd 密码
 * @param {*} cinemaCode 影城编号
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function registered(code, phone, passwd, cinemaCode) {
    return apiHttp.post('/user/registered', {
        validateCode: code,
        userMobile: phone,
        userPasswd: passwd,
        cinemaCode: cinemaCode
    })
}

/**
 * 账号登陆
 *
 * @param {*z} phone 手机号
 * @param {*} passwd 密码
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function login(phone, passwd) {
    return apiHttp.post('/user/login', {
        userAccount: phone,
        userPasswd: passwd
    })
}

/**
 * 用户登出
 *
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function logout() {
    return apiHttp.get('/user/logout', {})
}


/**
 * 获取用户信息
 *
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getUserInfo() {
    return apiHttp.get('/user/getUserInfo', {})
}



/**
 * 修改用户信息
 *
 * @param {*} userInfo 用户信息对象， key值参照下面
lifeState	N		用户生活状态
userNickname	N		用户昵称
userSex	N		用户性别
userBirthday	N		用户出生日期，格式2017-03-06
degree	N		用户学历
headImage	N		用户头像
workIndustry	N		从事行业
movieHobit	N		观影类型
email	N		邮箱
newPassword	N		新密码（配合旧密码选填，当要修改密码时必填）
oldPasswd	N		旧密码（选填，当要修改密码时必填）
 */

function modifyUserInfo(userInfo) {
    return apiHttp.post('/user/setUserInfo', userInfo)
}

/**
 * 获取验证码
 */
function getValidateCode(codeType, userMobile) {
    return apiHttp.post('/service/getValidateCode', {
        userMobile: userMobile,
        codeType: codeType || 'firstLogin'
    })
}

/**
 * 非会员登录  user/smsLogin
 */
function smsLogin(userMobile, validateCode,recommendId) {
    var vQuery={}
    vQuery.userMobile = userMobile
    vQuery.validateCode = validateCode
    vQuery.cinemaCode = apiHttp.CINEMA_CODE
    if(recommendId){
        vQuery.recommendId = recommendId
    }
    return apiHttp.post('/user/smsLogin', vQuery)
}

function getOpenId(code) {
  return apiHttp.get('/user/getWeixinOpenId',{
    code:code,
    cinemaCode:apiHttp.CINEMA_CODE
  })
}

/**
 * 注册信息配置
 */
function registeredConfig() {
    return apiHttp.post('/home/registeredConfig', {
        refresh: 1
    })
}
/**
 * 忘记密码
 */
function findPasswd(userMobile, validateCode, userPasswd) {
    return apiHttp.post('/user/findPasswd', {
        userMobile: userMobile,
        validateCode: validateCode,
        newUserPasswd: userPasswd
    })
}

/**
 * 获取微信配置信息
 */
function getWeixinConfig() {
    return apiHttp.post('/user/getWeixinConfig', {
        cinemaCode: apiHttp.CINEMA_CODE
    })
}


export default {
    registered: registered,
    login: login,
    logout: logout,
    findPasswd: findPasswd,
    getUserInfo: getUserInfo,
    modifyUserInfo: modifyUserInfo,
    getValidateCode: getValidateCode,
    smsLogin: smsLogin,
    registeredConfig: registeredConfig,
    getWeixinConfig: getWeixinConfig,
  getOpenId
}
