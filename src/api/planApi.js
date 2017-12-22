import apiHttp from './apiHttp'

/**
 * 排片时间列表
 * 
 * @param {*} filmNo 影片编号
 */
function getTimes(param) {
    var vQuery = {};
    if (param.filmNo) {
        vQuery.filmNo = param.filmNo;
    }
    vQuery.cinemaCode = apiHttp.CINEMA_CODE;
    return apiHttp.get('/home/getTimes', vQuery);
}

/**
 * 排片列表
 *
 * @param {*} filmNo 影片编号
 */
function getPlans(param) {
    var vQuery = {};
    if (param.filmNo) {
        vQuery.filmNo = param.filmNo;
    }
    vQuery.cinemaCode = apiHttp.CINEMA_CODE;
    vQuery.time = param.time;
    return apiHttp.get('/home/getPlans', vQuery);
}
//排期日期
function planDay(filmNo) {
    return apiHttp.get('/home/getTimes', {
        filmNo: filmNo,
        cinemaCode: apiHttp.CINEMA_CODE
    });
}

function getPlansSeatInfo(featureAppNoList) {
    return apiHttp.get('/home/getPlansSeatInfo', {
        featureAppNoList: featureAppNoList,
        cinemaCode: apiHttp.CINEMA_CODE
    });
}
export default {
    getTimes: getTimes,
    getPlans: getPlans,
    planDay: planDay,
    getPlansSeatInfo: getPlansSeatInfo
};