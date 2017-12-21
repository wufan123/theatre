import apiHttp from './apiHttp'

/**
 * 获取卖品列表
 * @param {*} cinemaCode 影院编码
 */
function getGoodsList(cinemaCode) {
    return apiHttp.get('/home/getCinemaGoods', {
      cinemaCode: cinemaCode,
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
   * @param {*} cinemaCode 
   * @param {*} phoneNum 
   * @param {*} goods 
   * @param {*} success_cb 
   * @param {*} fail_cb 
   */
  function createGoodsOrder(cinemaCode, phoneNum, goods) {
    return apiHttp.get('/sale/setCinemaOrder', {
      cinemaCode: cinemaCode,
      mobile: phoneNum,
      goods: goods
    })
  }
  
  /**
   * 生成卖品&影票订单
   * @param {*} cinemaCode 
   * @param {*} phoneNum 
   * @param {*} goods 
   * @param {*} success_cb 
   * @param {*} fail_cb 
   */
  function createGoodsFilmOrder(cinemaCode, phoneNum, goods, orderId) {
    return apiHttp.get('/sale/setCinemaOrder', {
      cinemaCode: cinemaCode,
      mobile: phoneNum,
      goods: goods,
      orderId: orderId
    })
  }
  
  /**
   * 生成套票订单
   * @param {*} cinemaCode 
   * @param {*} phoneNum 
   * @param {*} packages 
   * @param {*} success_cb 
   * @param {*} fail_cb 
   */
  function createComboOrder(cinemaCode, phoneNum, packages) {
    return apiHttp.get('/package/createOrder', {
      cinemaCode: cinemaCode,
      mobile: phoneNum,
      packages: packages
    })
  }
  
  /**
   * 获取当前订单可使用的优惠券，卡券等信息
   * @param {*} cinemaCode 
   * @param {*} orderId 
   * @param {*} orderType 
   * @param {*} success_cb 
   * @param {*} fail_cb 
   */
  function getOrderPayWay(cinemaCode, orderId, orderType) {
    return apiHttp.get('/user/getOrderPayWay', {
      cinemaCode: cinemaCode,
      orderId: orderId,
      orderType: orderType
    })
  }
  
  /**
   * 提交第一步确认支付 包含一起使用电影优惠券跟卖品券 会员卡
   * @param {*} cinemaCode 
   * @param {*} orderId 
   * @param {*} orderType 
   * @param {*} success_cb 
   * @param {*} fail_cb 
   */
  function getOrderPayLock(cinemaCode, orderId, orderType, cardId) {
    var param = {
      cinemaCode: cinemaCode,
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
   * @param {*} cinemaCode 
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
   */
  function goodsAndFilmComfirmNewPay(orderId, orderType, payType, integralNum, openId) {
    var params = {
      orderId: orderId,
      orderType: orderType,
      payType: payType
    }
    if (openId)
      params.openId = openId
    if (integralNum && integralNum > 0)
      params.integralNum = integralNum

    return apiHttp.get('/user/goodsAndFilmComfirmNewPay', params)
  }
  
  function getPackagesList(cinemaCode) {
    var params = {
      cinemaCode: cinemaCode
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
  function updateGoodsOrder(orderId, phone) {
    var params = {
      orderCode: orderId,
      mobile: phone,
    }
    return apiHttp.get('/user/updateOrderFilmMobile', params)
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
    updateGoodsOrder: updateGoodsOrder
  }