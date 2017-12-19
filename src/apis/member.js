import httpApi from './httpApi'

const prefix = '/business';
const zbacserverfix = '/zbacserver'
//影院管理
const CINEMALIST = `${zbacserverfix}/cinema/list`
const CINEMASYNS = `${zbacserverfix}/cinema/sync`
//影院管理-联系人
const CONTACTLIST= `${prefix}/contact/getList`;
const CONTACTADD=`${prefix}/contact/create`
const CONTACTEDIT = `${prefix}/contact/update`
const CONTACTDELETE = `${prefix}/contact/delete`
//岗位管理
const STATIONLIST = `${zbacserverfix}/role/list`
const STATIONADD = `${zbacserverfix}/role/add`
const STATIONEDIT = `${zbacserverfix}/role/update`
const STATIONDEL = `${zbacserverfix}/role/delete`
const STATIONADDPERMISSION = `${zbacserverfix}/role/addPermission`
//权限
const PERMISSIONSADD = `${zbacserverfix}/permissions/add`
const PERMISSIONSLIST = `${zbacserverfix}/permissions/list`


export default {
    //影院管理
    getCinemaList(page,size){
        var params = {}
        params.page = page
        params.size = size
        return httpApi.get(CINEMALIST, {params: params})
    },
    getCinemSync(){
        return httpApi.get(CINEMASYNS)
    },
    //影院管理-联系人
    getContactList (params) {
        return httpApi.get(CONTACTLIST, {params: params})
    },
    ContactAdd(params){
        return httpApi.post(CONTACTADD,params)
    },
    ContactEdit(params){
        return httpApi.post(CONTACTEDIT,params)
    },
    ContactDelete(params){
        return httpApi.post(CONTACTDELETE,params)
    },
    //岗位管理
    getStationList(params){
        return httpApi.get(STATIONLIST, {params: params})
    },
    StationAdd(params){
        return httpApi.post(STATIONADD, params)
    },
    StationEdit(params){
        return httpApi.post(STATIONEDIT, params)
    },
    StationDelete(params){
        return httpApi.post(STATIONDEL, params)
    },
    StationAddPermission(params){
        return httpApi.post(STATIONADDPERMISSION, params)
    },
    PermissionAdd(params){
        return httpApi.post(PERMISSIONSADD, params)
    },
    PermissionList(params){
        return httpApi.get(PERMISSIONSLIST, params)
    },
}
