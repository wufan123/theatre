import md5Util from './md5Util'
import sha1Util from './sha1Util'

/**
 * 升序排列，并拼接
 * @param {*} params 
 */
function sortParams(params) {
    // console.log("params", params)
    var newkey = Object.keys(params).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var str = "";
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组undefined
        // if (params[newkey[i]] != undefined && params[newkey[i]] != null&&params[newkey[i]] != '')//传参数不为空
        str += newkey[i] + params[newkey[i]];
    }
    // console.log("str", str)
    return str; //返回排好序的新对象
}

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007F) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        } else {
            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        }
    }
    return out;
}
function getSign(params) {
    //  console.log("params", params)
    let str = sortParams(params);
    //  console.log("cur str=============", str)
    let sha1 = sha1Util.hex_sha1(utf16to8(str));
    let md5 = md5Util.hexMD5(sha1);
    // console.log('sha1',sha1)
    // console.log('md5',md5)
    // console.log("cur res=============", md5.toLowerCase().substr(8, 16))
    // if (true) {
    //     let testStr = 'appAccountzmaxfilmappPasswdadflkjlsdaappVersion1.0.0deviceNumberdeviceTypeweixin-xct1513757406519tokenId433c4ffad4f8cfe798e89e6fcbb5e53c'
    //     let testSha1 = sha1Util.hex_sha1(utf16to8(testStr))
    //     let testMd5 = md5Util.hexMD5(testSha1)
    //     let testRes = testMd5.toLowerCase().substr(8, 16)
    //     console.log("testStr=======", testStr)
    //     console.log("md5=======", testMd5)
    //     console.log("res=====", testRes)
    //     console.log("right", "4a94fda8589234d6")
    // }
    return md5.toLowerCase().substr(8, 16);
}

export default {
    getSign: getSign
};