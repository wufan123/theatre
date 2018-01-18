<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import AuthApi from 'api/authApi'
  import HttpApi from 'api/apiHttp'
  import {mapState} from "vuex";
  import authApi from "./api/authApi";
  export default {
    name: 'app',
    mounted() {
      this.initWx();
    },
    computed: {
      ...mapState('common', ['openId'])
    },
    methods: {
      async initWx(){
        let configRes;
        try {
          configRes = await  AuthApi.getWeixinConfig()
        } catch (e) {

        }
        if (configRes && configRes.data) {
          //获取openid
          if (!this.openId) {
            let code = this.$route.query.code;
            let reUrl = 'https://jufang.zmaxfilm.com/preJufang/index.html';
            if (!code) {
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${configRes.data.appId}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_base#wechat_redirect`
            } else {
              let res;
              try {
                res = await authApi.getOpenId(code);
              } catch (e) {

              }
              if (res && res.data) {
                this.$store.commit("common/setOpenId", res.data.openId);
              }
            }
          }
          //初始化微信 js sdk
          wx.config(
            {
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: configRes.data.appId, // 必填，公众号的唯一标识
              timestamp: configRes.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: configRes.data.noncestr, // 必填，生成签名的随机串
              signature: configRes.data.signature,// 必填，签名，见附录1
              jsApiList: [
                'chooseWXPay',
                'onMenuShareQQ',
                'onMenuShareAppMessage',
                'onMenuShareQZone',
                'onMenuShareTimeline',
                'scanQRCode'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }
          )
        }
      }
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
