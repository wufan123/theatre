import axios from 'axios'
import signUtil from '../util/signUtil'

let API_BASE_URL = "/api/ruihua"
let APP_ACCOUNT = 'zmaxfilm'
let APP_PASSWORD = 'adflkjlsda'
let API_VERSION = '1.0.0'
let DEVICE_TYPE = 'web'
let token = '0552a7361f6fdfb829f5fc442d92d736a'
const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
    },
    transformRequest: [function (data, headers) {
        return changeData(data);
    }],
})


async function getToken(config) {
    var res = await instance.post('service/getToken', {
        'appAccount': APP_ACCOUNT,
        'appPasswd': APP_PASSWORD,
        'appVersion': API_VERSION,
        'deviceNumber': '',
        'deviceType': DEVICE_TYPE
    }, { tryAgain: true })
    if (res && res.data && res.data.tokenId) {
        token = res.data.tokenId
        if (config) {
            config.params.sign = getSign(config.params, config.dataObj)
            config.tryAgain = true
            config.data = urlToObject(config.data)//data重置
            config.url = config.url.replace(API_BASE_URL, '')//二次请求url重复
            res = await instance.request(config)
        }

    }
    return res
}

function getSign(params, data) {
    delete params.sign
    if (token) {
        params.tokenId = token
    }
    let timeStr = new Date().getTime().toString();
    params.t = timeStr
    let params_temp = Object.assign({}, params)
    if (data) {
        params_temp = Object.assign(params_temp, data)
    }
    return signUtil.getSign(params_temp)
}

function changeData(data) {
    if (!data)
        return data
    let str = ''
    let keys = Object.keys(data)
    if (!keys || keys.length == 0)
        return data
    keys.forEach(function (element) {
        str += '&' + element + "=" + data[element]
    }, this);
    return str.substring(1, str.length)
}


var urlToObject = function (urlParams) {
    var urlObject = {};
    if (urlParams) {
        var urlString = urlParams
        var urlArray = urlString.split("&");
        for (var i = 0, len = urlArray.length; i < len; i++) {
            var urlItem = urlArray[i];
            var item = urlItem.split("=");
            urlObject[item[0]] = item[1];
        }
        return urlObject;
    }
};

instance.interceptors.request.use(config => {
    console.log("===============request params", config)
    if (!config.params) {
        config.params = {}
    }
    let sign = getSign(config.params, config.data)
    //添加sign
    config.params.sign = sign
    console.log("sign=" + sign)
    console.log(" config.params", config.params)
    return config;
});

instance.interceptors.response.use(response => {
    let data = response.data
    console.info(`URL【${response.config.url}】请求:`, data)
    if (data.status == 0) {
        return data
    } else {
        console.log("response error", data)
        if (!response.config.tryAgain && data && data.status == '10001') {
            return getToken(response.config)
        }
        return Promise.reject(data);
    }
}, error => {
    console.log("error.response", error.response)
    return Promise.reject(error);
    //CommonAlert.netError("网络异常:"+error.response.status)
});


function get(url, params) {
    return instance.get(url, { params: params })
}

function post(url, params) {
    return instance.post(url, params)
}


export default {
    instance,
    get,
    post
}
