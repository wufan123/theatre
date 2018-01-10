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
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
