import apiHttp from './apiHttp'

/**
 * 排片时间列表
 *
 * @param {*} cinemaCode 影院编码
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getTimes(param) {
    var vQuery = {};
    if (param.filmNo) {
        vQuery.filmNo = param.filmNo;
    }
    vQuery.cinemaCode = param.cinemaCode;
    return apiHttp.get('/home/getTimes', vQuery);
}

/**
 * 排片列表
 *
 * @param {*} time 时间
 * @param {*} cinemaCode 影院编码
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getPlans(param) {
    var vQuery = {};
    if (param.filmNo) {
        vQuery.filmNo = param.filmNo;
    }
    vQuery.cinemaCode = param.cinemaCode;
    vQuery.time = param.time;
    return apiHttp.get('/home/getPlans', vQuery);
}
//排期日期
function planDay(filmNo, cinemaCode) {
    return apiHttp.get('/home/getTimes', {
        filmNo: filmNo,
        cinemaCode: cinemaCode
    });
}

function getPlansSeatInfo(featureAppNoList, cinemaCode) {
    return apiHttp.get('/home/getPlansSeatInfo', {
        featureAppNoList: featureAppNoList,
        cinemaCode: cinemaCode
    });
}
export default {
    getTimes: getTimes,
    getPlans: getPlans,
    planDay: planDay,
    getPlansSeatInfo: getPlansSeatInfo
};