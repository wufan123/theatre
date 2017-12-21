import apiHttp from './apiHttp'
/**
 * 我的影票订单
 * @param {int} status 对应订单状态 -1所有订单1已完成 2未支付3其他9退款退票
 * @param {int} page 页数
 * @param {function} success_cb 
 * @param {function} fail_cb 
 */
function getCinemaOrders(status, page, success_cb, fail_cb) {
    return apiHttp.get('/user/getCinemaOrders', {
        "status": status,
        "page": page,
    }, success_cb, fail_cb)
}

/**
 * 获取待取票影票订单
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getUnwatchCinemaOrders(success_cb, fail_cb) {
    return apiHttp.get('/user/getCinemaOrders', {
        "status": 1,
        "type": 2
    }, success_cb, fail_cb)
}


/**
 * 获取影票订单状态
 * @param {*} orderID 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getCinemaOrderStatus(orderID, success_cb, fail_cb) {
    return apiHttp.get('/user/getOrderStatus', {
        "orderId": orderID
    }, success_cb, fail_cb)
}

/**
 * 获取影票订单详情   过期
 * @param {*} orderID 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getCinemaOrderInfo(orderID, success_cb, fail_cb) {
    return apiHttp.get('/user/getOrderInfo', {
        "orderId": orderID
    }, success_cb, fail_cb)
}

/**
 * 获取影票订单详情   
 * @param {*} orderID 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getFilmOrderInfo(orderID, success_cb, fail_cb) {
    return apiHttp.get('/user/getOrderFilmDetail', {
        "orderNo": orderID
    }, success_cb, fail_cb)
}

/**
 * 修改订单手机
 */
function updateOrderMobile(mobile, success_cb, fail_cb) {
    return apiHttp.post('/user/updateOrderFilmMobile', {
        mobile: mobile
    }, success_cb, fail_cb)
}


/**
 * 获取卖品订单列表
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getGoodsOrders(page, success_cb, fail_cb) {
    return apiHttp.get('/sale/getMyGoods', {
        "page": page,
        "buyFlag": 1
    }, success_cb, fail_cb)
}

/**
 * 获取卖品订单状态
 * @param {str} orderId
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getGoodsOrderStatus(orderId, success_cb, fail_cb) {
    return apiHttp.get('/sale/getGoodsStatus', {
        "orderId": orderId
    }, success_cb, fail_cb)
}

/**
 * 
 * @param {*} orderId 
 * @param {int} orderType [0,1,2,3]==>>["goodsAndFilm", "film", "goods", "package"]
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getOrderPayInfo(orderId, orderType, success_cb, fail_cb) {
    return apiHttp.get("/user/getOrderPayInfo", {
        "orderId": orderId,
        "orderType": ["goodsAndFilm", "film", "goods", "package"][orderType]
    }, success_cb, fail_cb)
}

/**
 * 删除订单
 * @param {*} orderId 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function deleteFilmOrderById(orderId, success_cb, fail_cb) {
    return apiHttp.get("/user/delOrderFilm", {
        "orderid": orderId
    }, success_cb, fail_cb)
}

/**
 * 删除卖品订单
 * @param {*} orderId 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function delOrderGoods(orderId, success_cb, fail_cb) {
    return apiHttp.get("/user/delOrderGoods", {
        "orderId": orderId
    }, success_cb, fail_cb)
}

/**
 * 删除套票订单
 * @param {*} orderId 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function delComboOrder(orderId, type, success_cb, fail_cb) {
    return apiHttp.get("/package/delOrder", {
        "orderId": orderId,
        "type": type
    }, success_cb, fail_cb)
}


/**
 * 获取套票订单列表
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function getPackageOrders(success_cb, fail_cb) {
    return apiHttp.get("/package/getMyOrders", {
        status: 1
    }, success_cb, fail_cb)
}

function getOrderStatus(orderid, success_cb, fail_cb) {
    return apiHttp.get("/user/getOrderStatus", {
        orderid: orderid
    }, success_cb, fail_cb)
}

/**
 * 取消订单
 */
function cancelOrder(orderid, success_cb, fail_cb) {
    return apiHttp.get("/user/cancelOrder", {
        orderid: orderid
    }, success_cb, fail_cb)
}



export default {
    getOrderStatus: getOrderStatus,
    getCinemaOrders: getCinemaOrders,
    getCinemaOrderStatus: getCinemaOrderStatus,
    getCinemaOrderInfo: getCinemaOrderInfo,
    getGoodsOrders: getGoodsOrders,
    getGoodsOrderStatus: getGoodsOrderStatus,
    getOrderPayInfo: getOrderPayInfo,
    getUnwatchCinemaOrders: getUnwatchCinemaOrders,
    deleteFilmOrderById: deleteFilmOrderById,
    delOrderGoods: delOrderGoods,
    delComboOrder: delComboOrder,
    getPackageOrders: getPackageOrders,
    cancelOrder: cancelOrder,
    updateOrderMobile: updateOrderMobile,
    getFilmOrderInfo: getFilmOrderInfo

}