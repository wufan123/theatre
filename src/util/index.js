var debug = false,
  {slice} = [];

export const isArray = Array.isArray;

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}

export function isIphoneX(){
  return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}

export function mapIntroduceData(data) {
  data.contentUrl = `/IntroduceDetail?contentUrl=${data.contentUrl}&title=${data.title}&redirectType=${data.redirectType}&redirectId=${data.redirectId}`;
  return data;
}

export function showRequestErro(err) {
  let info;
  if (err.text) {
    info = err.text;
  }
  else {
    switch (err.code) {
      case 'ECONNABORTED':
        info = "服务器正在开小差哦";
        break;
      default:
        info = "网络错误";
    }
  }
  switch (err.status) {
    case '20001':
      return;
  }
  window._vue.$vux.toast.show({
    text: info,
    type: 'cancel'
  })
}

export function getAsUriParameters(data) {
  return Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}

export function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

export function showLoginConfirm() {
  window._vue.$vux.confirm.show({
    title: '温馨提示',
    content: '您还未登录，请先登录后再进行操作哦',
    confirmText: "立即登录",
    onCancel () {
      // window._vue.$router.push("Home")
    },
    onConfirm () {
      window._vue.$router.push("Login");
    }
  })
}

export function wxShare(title, desc, imgUrl, link) {
  if (!link) {
    link = `https://jufang.zmaxfilm.com/#/Home?recommendId=${window._vue.$store.state.common.userInfo.userId}`
  }

  wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl
  })
  wx.onMenuShareTimeline({
    title: title,
    link: link,
    imgUrl: imgUrl
  })
  wx.onMenuShareQQ({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl
  })
  wx.onMenuShareQZone({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl
  })
}
export function isString(val) {
  return typeof val === 'string';
}

export function isDefined(x) {
  return x === undefined;
}

export function isBoolean(val) {
  return val === true || val === false;
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

export function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function isNumberBy100(ssn) {
  var re = /^[0-9]*[0-9]$/i;       //校验是否为数字
  if (re.test(ssn) && ssn % 100 === 0) {
    return true;
  } else {
    return false;
  }
}


export const assign = Object.assign || _assign;

export function merge(target) {

  var args = slice.call(arguments, 1);

  args.forEach((source) => {
    _merge(target, source, true);
  });

  return target;
}

export function defaults(target) {

  var args = slice.call(arguments, 1);

  args.forEach((source) => {

    for (var key in source) {
      if (target[key] === undefined) {
        target[key] = source[key];
      }
    }

  });

  return target;
}

function _assign(target) {

  var args = slice.call(arguments, 1);

  args.forEach((source) => {
    _merge(target, source);
  });

  return target;
}

function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

