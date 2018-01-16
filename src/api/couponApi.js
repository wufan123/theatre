import apiHttp from './apiHttp'

/**
 * 获取票券列表
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function userVoucherList(page, couponStatus) {
    var params = {
        page: page
    };
    if (couponStatus) params.couponStatus = couponStatus;
    return apiHttp.get('/user/userVoucherList', params);
}

/**
 * 添加票券
 * @param {*} voucherNum
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function addVoucher(voucherNum='') {
    return apiHttp.get('/user/addVoucher', {
        voucherNum: voucherNum
    });
}

/**
 * 获取优惠券详情
 */
function userVoucherDetail(voucherNum, success_cb, fail_cb) {
    return apiHttp.get('/user/userVoucherDetail', {
      voucherNum: voucherNum,
      cinemaCode: apiHttp.CINEMA_CODE
    }, success_cb, fail_cb)
  }

  /**
 * 解绑票券
 * @param {*} voucherNum 
 * @param {*} success_cb 
 * @param {*} fail_cb 
 */
function userVoucherDelete(voucherNum, success_cb, fail_cb) {
    return apiHttp.get('/user/delvoucher', {
      voucherNum: voucherNum
    }, success_cb, fail_cb)
  }


export default {
    addVoucher: addVoucher,
    userVoucherList: userVoucherList,
    userVoucherDetail:userVoucherDetail,
    userVoucherDelete:userVoucherDelete
};
