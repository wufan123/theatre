import apiHttp from './apiHttp'

/**
 * 分类字典列表
 * @param {*} sourceType
 * @param {*} classType
 */
function getClassList(sourceType, classType) {
    return apiHttp.getTheatre("/classType/list", {
        sourceType: sourceType,
        classType: classType
    })
}

/**
 * 信息列表
 * @param {*} classType
 */
function getInformationList(classType) {
    return apiHttp.getTheatre("/information/list", {
        classType: classType
    })
}

/**
 * 卖品列表
 * @param {*} classType
 */
function getGoodsList(classType) {
    return apiHttp.getTheatre("/goods/list", {
        classType: classType
    })
}

/**
 * 套票列表
 * @param {*} classType
 */
function getPackageList(classType) {
    return apiHttp.getTheatre("/package/list", {
        classType: classType
    })
}

/**
 * 页面配置信息
 * @param {*} miscKey
 * @param {*} success_cb
 * @param {*} fail_cb
 */
function getMiscConfig(miscKey) {
    let params = {}
    if (miscKey) {
        params.miscKey = miscKey
    }
    return apiHttp.getTheatre("/miscConfig/list", params)
}

function scanCode(params) {
  return apiHttp.getTheatre("/promotion/scanCode",params)
}

function finishPromotion(params) {
  return apiHttp.getTheatre('/promotion/finishPromotion',params)
}

function getPromotionList(promoter,startSuccessTime,endSuccessTime) {
    return apiHttp.getTheatre('/promotion/list',{
        promoter: promoter,
        startSuccessTime:startSuccessTime,
        endSuccessTime:endSuccessTime
    })
}

export default {
    getClassList: getClassList,
    getGoodsList: getGoodsList,
    getPackageList: getPackageList,
    getInformationList: getInformationList,
    getMiscConfig: getMiscConfig,
    scanCode,
    finishPromotion,
    getPromotionList
}
