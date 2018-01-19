import apiHttp from './apiHttp'

/**
 * 获取卖品列表
 */
function getGoodsList() {
    return apiHttp.get('/home/getCinemaGoods', {
      cinemaCode: apiHttp.CINEMA_CODE,
    })
  }

  /**
   * 获取卖品详情
   */
  function getGoodsDetail(goodsId) {
    return apiHttp.get('/home/getCinemaGoodsDetail', {
      goodsId: goodsId,
    })
  }
  /**
   * 生成卖品订单
   * @param {*} phoneNum
   * @param {*} goods
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function createGoodsOrder(phoneNum='', goods) {
    return apiHttp.get('/sale/setCinemaOrder', {
      cinemaCode: apiHttp.CINEMA_CODE,
      mobile: phoneNum,
      goods: goods
    })
  }

  //卖品订单详情
  function getGoodsOrderDetail(orderNo) {
    return apiHttp.get('/sale/getOrderGoodDetail',{
      orderNo
    });
  }

  /**
   * 生成卖品&影票订单
   * @param {*} phoneNum
   * @param {*} goods
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function createGoodsFilmOrder(phoneNum='', goods, orderId) {
    return apiHttp.get('/sale/setCinemaOrder', {
      cinemaCode: apiHttp.CINEMA_CODE,
      mobile: phoneNum,
      goods: goods,
      orderId: orderId
    })
  }

  // 合并影票卖品订单
  function mergeOrder(filmOrderId, goodsOrderId, mobile='') {
    return apiHttp.get('/user/mergeOrder', {
      filmOrderId: filmOrderId,
      goodsOrderId: goodsOrderId,
      mobile: mobile
    });
  }

  /**
   * 生成套票订单
   * @param {*} cinemaCode
   * @param {*} phoneNum
   * @param {*} packages
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function createComboOrder(phoneNum='', packages) {
    return apiHttp.get('/package/createOrder', {
      cinemaCode: apiHttp.CINEMA_CODE,
      mobile: phoneNum,
      packages: packages
    })
  }

  /**
   * 获取当前订单可使用的优惠券，卡券等信息
   * @param {*} orderId
   * @param {*} orderType
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function getOrderPayWay(orderId, orderType) {
    return apiHttp.get('/user/getOrderPayWay', {
      cinemaCode: apiHttp.CINEMA_CODE,
      orderId: orderId,
      orderType: orderType
    })
  }

  /**
   * 提交第一步确认支付 包含一起使用电影优惠券跟卖品券 会员卡
   * @param {*} orderId
   * @param {*} orderType
   * @param {*} cardId
   * @param {*} couponCode
   */
  function getOrderPayLock(orderId, orderType, cardId, couponCode) {
    var param = {
      cinemaCode: apiHttp.CINEMA_CODE,
      orderId: orderId,
      orderType: orderType,
    }
    if (cardId)
      param.cardId = cardId
    if (couponCode)
      param.couponCode = couponCode

    return apiHttp.get('/user/getOrderPayLock', param)
  }

  /**
   * 提交第一步确认支付 包含一起使用电影优惠券跟卖品券 会员卡
   * @param {*} orderId
   * @param {*} orderType
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function getPackageBuyPayway(orderId) {
    var param = {
      orderId: orderId
    }
    return apiHttp.get('/pay/getPackageBuyPayway', param)
  }


  function payPackage(payType,orderId,openId) {
    let param = {
      payType,orderId,openId 
    }
    return apiHttp.get('/pay/packagePay',param);
  }

  /**
   * 添加票券
   * @param {*} voucherNum
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function addVoucher(voucherNum) {
    return apiHttp.get('/user/addVoucher', {
      voucherNum: voucherNum,
    })
  }

  /**
   * 使用票券
   * @param {*} orderId
   * @param {*} voucherNum
   * @param {*} type //	类型film：影票;goods：卖品;
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function useVoucher(orderId, voucherNum, type) {
    return apiHttp.get('/user/useVoucher', {
      voucherNum: voucherNum,
    })
  }


/**
 * 支付接口
 * @param {*} orderId
 * @param {*} orderType
 * @param {*} payType
 * @param {*} integralNum
 * @param openId
 */
  function goodsAndFilmComfirmNewPay(orderId, orderType, payType, integralNum, openId) {
    console.log(openId);
    var params = {
      orderId: orderId,
      orderType: orderType,
      payType: payType,
    }
    if (openId)
      params.openId = openId
    if (integralNum && integralNum > 0)
      params.integralNum = integralNum
    return apiHttp.get('/user/goodsAndFilmComfirmNewPay', params)
  }

  function getPackagesList() {
    var params = {
      cinemaCode: apiHttp.CINEMA_CODE
    }
    return apiHttp.get('/package/getPackagesList', params)
  }

  /**
   * 获取卖品订单状态
   * @param {*} orderId
   */
  function getGoodsStatus(orderId) {
    var params = {
      orderId: orderId
    }
    return apiHttp.get('/sale/getGoodsStatus', params)
  }

  /**
   * 修改订单电话号码
   * @param {*} orderId
   * @param {*} phone
   * @param {*} success_cb
   * @param {*} fail_cb
   */
  function updateGoodsOrder(orderId, phone='') {
    var params = {
      orderCode: orderId,
      mobile: phone,
    }
    return apiHttp.get('/user/updateOrderFilmMobile', params)
  }

  /**
   * 获取抢购卖品列表
   */
  function getBuyingGoods() {
    var params = {
      cinemaCode: apiHttp.CINEMA_CODE
    }
    return apiHttp.get('/Buying/getBuyingGoods', params)
  }

  /**
   * 抢购卖品下单
   * @param {*} panicbuyingId 活动id
   * @param {*} number 抢购数量
   */
  function createBuyingOrder(panicbuyingId, number) {
    var params = {
      panicbuyingId: panicbuyingId,
      number: number
    }
    return apiHttp.get('/Sale/setCinemaBuyingOrderNew', params)
  }


  export default {
    getGoodsList: getGoodsList,
    createGoodsOrder: createGoodsOrder,
    getOrderPayWay: getOrderPayWay,
    getOrderPayLock: getOrderPayLock,
    addVoucher: addVoucher,
    useVoucher: useVoucher,
    goodsAndFilmComfirmNewPay: goodsAndFilmComfirmNewPay,
    getPackagesList: getPackagesList,
    createComboOrder: createComboOrder,
    getPackageBuyPayway: getPackageBuyPayway,
    getGoodsStatus: getGoodsStatus,
    createGoodsFilmOrder: createGoodsFilmOrder,
    getGoodsDetail: getGoodsDetail,
    updateGoodsOrder: updateGoodsOrder,
    getBuyingGoods: getBuyingGoods,
    mergeOrder: mergeOrder,
    getGoodsOrderDetail,
    payPackage
  }
