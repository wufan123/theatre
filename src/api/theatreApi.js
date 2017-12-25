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

export default {
    getClassList: getClassList,
    getInformationList: getInformationList
}