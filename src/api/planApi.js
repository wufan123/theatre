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
    vQuery.cinemaCode = param.cinemaCode;
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