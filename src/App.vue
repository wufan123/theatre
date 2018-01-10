<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import AuthApi from 'api/authApi'
  export default {
    name: 'app',
    mounted() {
      AuthApi.getWeixinConfig().then(success => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: success.data.appId, // 必填，公众号的唯一标识
          timestamp: success.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: success.data.noncestr, // 必填，生成签名的随机串
          signature: success.data.signature,// 必填，签名，见附录1
          jsApiList: [
            'chooseWXPay',
            'onMenuShareQQ',
            'onMenuShareAppMessage',
            'onMenuShareQZone',
            'onMenuShareTimeline',
            'scanQRCode'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

      wx.ready(function(){  
    //alert("微信验证OK");  
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。  
  
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口  
    wx.onMenuShareAppMessage({  
        title: '这是分享给朋友标题', // 分享标题  
        desc: '这是分享给朋友描述', // 分享描述  
        link: '这是分享给朋友链接', // 分享链接  
        imgUrl: 'https://pic1.zhimg.com/da8e974dc_s.jpg', // 分享图标  
        type: '', // 分享类型,music、video或link，不填默认为link  
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
        success: function () {   
            // 用户确认分享后执行的回调函数  
            alert("分享给朋友成功");  
        },  
        cancel: function () {   
            // 用户取消分享后执行的回调函数  
            alert("分享给朋友失败");  
        }  
    });  
}); 




      }, error => {

      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "style/base-variables";
  @import "style/reset-vux";
  @import "style/common";
  @import "style/style";

  #app {
    border-bottom: 1px solid black;
    height: 100%;
    > div {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
