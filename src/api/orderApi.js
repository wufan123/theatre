import apiHttp from './apiHttp'

/**
 *
 * @param {*} featureAppNo 排期号
 * @param {*} seatIntroduce  座位描述
 * @param {*} phone 	手机号
 * @param {*} seatInfo 锁座信息（json格式）[{"seatNo":"098089","seatPieceName":"座区名称","seatPieceNo":"2342332"}]
 */
function setPlanAndGoodsOrder(featureAppNo, seatIntroduce, mobile='', seatInfo) {
    let params = {
        cinemaCode: apiHttp.CINEMA_CODE,
        featureAppNo: featureAppNo,
        seatIntroduce: seatIntroduce,
        mobile: mobile,
        datas: seatInfo
    }
    return apiHttp.get('/user/setPlanAndGoodsOrder', params);
}

/**
 * 我的影票订单
 * @param {int} status 对应订单状态 -1所有订单1已完成 2未支付3其他9退款退票
 * @param {int} page 页数
 * @param {function} success_cb
 * @param {function} fail_cb
 */
function getCinemaOrders(status, page) {
    return apiHttp.get('/user/getCinemaOrders', {
        "status": status,
        "page": page,
    })
}

//获取我的影片订单
function getAllMoiveOrder(status, page, success_cb, fail_cb) {
    let param = {
      page: page
    }
    if (status) {
      param.status = status
    }
    return apiHttp.get('/user/getCinemaOrders', param, success_cb, fail_cb);
  }

/**
 * 获取待取票影票订单
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getUnwatchCinemaOrders() {
    return apiHttp.get('/user/getCinemaOrders', {
        "status": 1,
        "type": 2
    })
}


/**
 * 获取影票订单状态
 * @param {*} orderID
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getCinemaOrderStatus(orderID) {
    return apiHttp.get('/user/getOrderStatus', {
        "orderId": orderID
    })
}

/**
 * 获取影票订单详情   过期
 * @param {*} orderID
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getCinemaOrderInfo(orderID) {
    return apiHttp.get('/user/getOrderInfo', {
        "orderId": orderID
    })
}

/**
 * 获取影票订单详情
 * @param {*} orderID
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getFilmOrderInfo(orderID) {
    return apiHttp.get('/user/getOrderFilmDetail', {
        "orderNo": orderID
    })
}

/**
 * 修改订单手机
 */
function updateOrderMobile(mobile='',orderCode) {
    return apiHttp.post('/user/updateOrderFilmMobile', {
        orderCode:orderCode,
        mobile: mobile
    })
}


/**
 * 获取卖品订单列表
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getGoodsOrders(page) {
    return apiHttp.get('/sale/getMyGoods', {
        "page": page,
        "buyFlag": 1
    })
}

/**
 * 获取卖品订单状态
 * @param {str} orderId
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getGoodsOrderStatus(orderId) {
    return apiHttp.get('/sale/getGoodsStatus', {
        "orderId": orderId
    })
}

/**
 *
 * @param {*} orderId
 * @param {int} orderType [0,1,2,3]==>>["goodsAndFilm", "film", "goods", "package"]
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getOrderPayInfo(orderId, orderType) {
    return apiHttp.get("/user/getOrderPayInfo", {
        "orderId": orderId,
        "orderType": ["goodsAndFilm", "film", "goods", "package"][orderType]
    })
}

/**
 * 删除订单
 * @param {*} orderId
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function deleteFilmOrderById(orderId) {
    return apiHttp.get("/user/delOrderFilm", {
        "orderid": orderId
    })
}

/**
 * 删除卖品订单
 * @param {*} orderId
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function delOrderGoods(orderId) {
    return apiHttp.get("/user/delOrderGoods", {
        "orderId": orderId
    })
}

/**
 * 删除套票订单
 * @param {*} orderId
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function delComboOrder(orderId, type) {
    return apiHttp.get("/package/delOrder", {
        "orderId": orderId,
        "type": type
    })
}


/**
 * 获取套票订单列表
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getPackageOrders() {
    return apiHttp.get("/package/getMyOrders", {
        status: 1
    })
}

function getOrderStatus(orderid) {
    return apiHttp.get("/user/getOrderStatus", {
        orderid: orderid
    })
}

/**
 * 取消订单
 */
function cancelOrder(orderid) {
    return apiHttp.get("/user/cancelOrder", {
        orderid: orderid
    })
}

export default {
    getOrderStatus: getOrderStatus,
    getCinemaOrders: getCinemaOrders,
    getCinemaOrderStatus: getCinemaOrderStatus,
    getAllMoiveOrder:getAllMoiveOrder,
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
    getFilmOrderInfo: getFilmOrderInfo,
    setPlanAndGoodsOrder: setPlanAndGoodsOrder

}
