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
  import TheatreApi from "./api/theatreApi";
  export default {
    name: 'app',
    mounted() {
       console.log(this.$route.query)
        let recommendId = this.$util.getQueryString('recommendId')|| this.$route.query.recommendId
        if(recommendId){
          this.$store.commit('common/setRecommendId', recommendId)
        }
      this.storePromotion();//必须在initWx前保存推广人信息
      this.initWx();
    },
    computed: {
      ...mapState('common', ['openId', 'userInfo'])
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
            let code = this.$util.getQueryString('code')||this.$route.query.code;//vue-router的query获取会有问题
            let reUrl = 'https://jufang.zmaxfilm.com/';
            if (!code) {
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${configRes.data.appId}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_base#wechat_redirect`
            } else {
              let res;
              try {
                res = await authApi.getOpenId(code);
              } catch (e) {
                  this.$util.showRequestErro(e)
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
      },
      storePromotion(){
        let promoter = this.$util.getQueryString('promoter')||this.$route.query.promoter;
        if (promoter) {
          let promotion = {
            promoter: promoter,
            type: this.$util.getQueryString('type')||this.$route.query.type
          }
          this.$store.commit('common/setPromotion', promotion);
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
