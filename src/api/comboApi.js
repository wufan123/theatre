import apiHttp from './apiHttp'

/**
 * 获取套票详情
 * @param {*} id
 * @param {*} type 	package 套票 alk 爱莱卡
 */
function getPackageDetail(id, type) {
    var params = {
        id: id,
        type: type
    };
   return  apiHttp.get('/package/getPackageDetail', params);
}

/**
 * 使用余额支付套票
 * @param {*} orderId
 */
function packageUseAccount(orderId) {
    var params = {
        orderId: orderId
    };
   return apiHttp.get('/pay/packageUseAccount', params);
}

/**
 * 取消使用余额支付套票
 */
function packageCancelAccount(orderId) {
    var params = {
        orderId: orderId
    };
    return apiHttp.get('/pay/packageCancelAccount', params);
}

/**
 * 使用积分支付套票
 */
function packageUseIntegral(orderId) {
    var params = {
        orderId: orderId
    };
    return apiHttp.get('/pay/packageUseIntegral', params);
}

/**
 * 取消使用积分支付套票
 */
function packageCancelIntegral(orderId) {
    var params = {
        orderId: orderId
    };
   return apiHttp.get('/pay/packageCancelIntegral', params);
}

/**
 * 获取可以购买套票的支付方式
 */
function getPackageBuyPayway(orderId) {
    var params = {
        orderId: orderId
    };
    return apiHttp.get('/pay/getPackageBuyPayway', params);
}

/**
 * 获取可以购买套票的支付方式
 */
function packagePay(orderId, payType, openId) {
    var params = {
        orderId: orderId,
        payType: payType,
        openId: openId
    };
    return apiHttp.get('/pay/packagePay', params);
}

/**
 * 查看套票订单结果
 */
function getPackageOrderStatus(orderId) {
    var params = {
        orderId: orderId
    };
    return apiHttp.get('/pay/getPackageOrderStatus', params);
}

/**
 * 创建套票订单
 */
function createOrder(packages, mobile='', cinemaCode) {
    var params = {
        packages: packages,
        mobile: mobile,
        cinemaCode: apiHttp.CINEMA_CODE
    };
    return apiHttp.get('/package/createOrder', params);
}
export default {
    getPackageDetail: getPackageDetail,
    packageUseAccount: packageUseAccount,
    packageCancelAccount: packageCancelAccount,
    packageUseIntegral: packageUseIntegral,
    packageCancelIntegral: packageCancelIntegral,
    getPackageBuyPayway: getPackageBuyPayway,
    packagePay: packagePay,
    getPackageOrderStatus: getPackageOrderStatus,
    createOrder: createOrder
};
