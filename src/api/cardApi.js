import apiHttp from './apiHttp'

// 会员卡列表
function getCardInfo() {
    return apiHttp.get("/user/getCardInfo", {
    })
}
//绑定会员卡
function setUserBind(cinemaCode, cardCode, cardPwd) {
    return apiHttp.get("/user/setUserBind", {
        cardNumber: cardCode,
        cardPassword: cardPwd,
        cinemaCode: cinemaCode
    })
}
// 解绑会员卡  type 	1 实体卡 2爱莱卡
function setUserUnbind(id, type) {
    return apiHttp.get("/user/setUserUnbind", {
        id: id,
        type: type
    })
}
// 充值
function recharge(amount, cinemaCode,cardId,payType,openId) {
    return apiHttp.get("/user/recharge", {
        rechargeAmount: amount,
        payType:payType,
        cinemaCode: cinemaCode,
        cardId:cardId,
        openId:openId
    })
}

export default {
    getCardInfo:getCardInfo,
    setUserBind:setUserBind,
    setUserUnbind:setUserUnbind,
    recharge:recharge
}