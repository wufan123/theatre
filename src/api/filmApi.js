import apiHttp from './apiHttp'

/**
 * 广告栏信息
 *
 * @param {*} type 0: banner， 1：广告， 2：购票成功弹窗
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getBanner(type) {
    return apiHttp.get('/home/getBanner', {
        type: type,
        cinemaCode: apiHttp.CINEMA_CODE
    });
}

/**
 * 影片列表
 *
 * @param {*} type 类型，1：热映电影，2：待映电影
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getMove(type) {
    return apiHttp.get('/home/getMove', {
        type: type,
        cinemaCode: apiHttp.CINEMA_CODE
    });
}

function getFilmDetail(filmId) {
    return apiHttp.get('/home/filmDetail', {
        filmId: filmId
    });
}

function follow(filmId) {
    return apiHttp.get('/user/remind', {
        filmId: filmId
    });
}

function unremind(filmId) {
    return apiHttp.get('/user/unremind', {
        filmId: filmId
    });
}

function filmEvaluateList(filmId) {
    let timestamp = Date.parse(new Date()) / 1000;
    return apiHttp.get('/home/filmViews', {
        filmId: filmId,
        refresh: timestamp
    });
}
function filmReplyList(evalauteId) {
    return apiHttp.get('/home/backViews', {
        pid: evalauteId
    });
}

function getSeat(featureAppNo) {
    return apiHttp.get('/home/seat', {
        featureAppNo: featureAppNo
    });
}
//电影关注
function remind(filmId) {
    return apiHttp.get('/user/remind', {
        filmId: filmId
    });
}

export default {
    getBanner: getBanner,
    getMove: getMove,
    getFilmDetail: getFilmDetail, //获取电影详情
    unremind: unremind, //取消关注
    filmEvaluateList: filmEvaluateList, //电影评价列表
    filmReplyList: filmReplyList, //评价回复列表
    getSeat: getSeat, //选座
    remind: remind //关注影片
};
