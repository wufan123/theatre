function wxJS() {
    return new Promise((resolve, reject) => {
        if (window.WeixinJSBridge)
            return resolve(window.WeixinJSBridge)
        else {
            document.addEventListener('WeixinJSBridgeReady', () => {
                return resolve(window.WeixinJSBridge)
            }, false)
        }
    })
}

function wxPay(payInfo, successFunc, errorFunc) {
    wxJS().then((wx) => {
        wx.invoke('getBrandWCPayRequest', {
                "appId": payInfo.appid,     //公众号名称，由商户传入
                "timeStamp": payInfo.timestamp,         //时间戳，自1970年以来的秒数
                "nonceStr": payInfo.noncestr, //随机串
                "package": payInfo.package,
                "signType": 'MD5',         //微信签名方式：
                "paySign": payInfo.sign //微信签名
            },
            res => {
                console.log(res)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    successFunc()
                } else {
                    errorFunc()
                }
            }
        )
      })
}

export default {
    wxPay: wxPay
}