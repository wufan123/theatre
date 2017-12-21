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
function addVoucher(voucherNum) {
    return apiHttp.get('/user/addVoucher', {
        voucherNum: voucherNum
    });
}

export default {
    addVoucher: addVoucher,
    userVoucherList: userVoucherList
};