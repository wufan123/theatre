<template>
  <page :headerTitle="`支付订单`" :footerText="`确认支付`" :footerFunc="confirmPay">
    <div slot="contain" class="payInfo">
      <div class="center last-time" v-if="this.payLockInfo.orderType=='goodsAndFilm'">支付剩余时间：{{getPayTime()}}</div>
      <div class="flexb payment" flex="main:justify"><label>实付款</label><label>￥{{payLockInfo.price}}</label></div>
      <div class="c-pay">
        <group title="选择支付方式">
          <radio title="title" :options="typeData" v-model="value" disabled></radio>
        </group>
        <!--<div >
         <label>选择支付方式</label>
         <div class="payItem">
           <img :src="require('assets/images/pay/member.png')">
           <label>会员卡：支付￥20.00</label>
         </div>
         <label>剩余183.00支付方式</label>
         <div class="payItem">
           <img :src="require('assets/images/pay/wexin.png')">
           <label>微信</label>
         </div>
       </div>-->
      </div>
      <div class="tip">
        <p>温馨提示：</p>
        <p>订单一旦完成购买，不退不换</p>
      </div>
    </div>
  </page>
</template>
<script>
  import {List, ListItem} from 'views/components/settingList'
  import {Group, Radio} from "vux";
  import StoreApi from 'api/storeApi'
  import WxApi from 'api/wxApi'
  import {mapState} from "vuex";
  import OrderApi from "api/orderApi";
  import TheatreApi from "../../api/theatreApi";
  import AuthApi from "../../api/authApi";
  import {AlertModule} from "vux";
  import orderApi from "../../api/orderApi";
  let typeData = [
    {
      icon: 'http://p0bd8izdn.bkt.clouddn.com/ruihua/wap/images/wexin.png',
      key: '2',
      value: '微信'
    }];
  export default {
    data(){
      return {
        telphone: '13800138000',
        value: '2',
        typeData: typeData,
        payTime: 0,
        erroInfo: ''
      }
    },
    components: {List, ListItem, Group, Radio},
    computed: {
      ...mapState("business", ['payLockInfo']),
      ...mapState('common', ['openId'])
    },
    methods: {
      getPayTime(){
        let h, m, s;
        s = this.payTime % 60;
        m = parseInt((this.payTime / 60)) % 60;
        h = parseInt(this.payTime / 3600);
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
      },
      async cancelOrder(){
        let res;
        try {
          res = await OrderApi.cancelOrder(data.hasOrder);
        } catch (e) {
          //todo
        }
        let ctx = this;
        AlertModule.show({
          title: '提示',
          content: '支付超时，订单已取消，请重新购买',
          onHide () {
            ctx.$router.push('Home')
          }
        })
      },
      fetchData(){
        if (this.payLockInfo.payTime > 0 && this.payLockInfo.orderType == 'goodsAndFilm') {
          this.payTime = this.payLockInfo.payTime;
          let ct = this;
          ct.timer = setInterval(() => {
            if (--this.payTime <= 0) {
              clearInterval(ct.timer);
              ct.cancelOrder();
            }
          }, 1000)
        }
      },

      // 获取支付方式
      getPayType: function () {
        var payType = ""
        if (!this.payLockInfo)
          return payType
        if (this.payLockInfo.price === 0) {
          //如果当前无需支付任何金额，优惠券全抵扣的情况下，默认传account
          if (!payType)
            payType = "account"
        } else {
          if (payType)
            payType += ","
          payType += "weixinpay"
        }
        return payType
      },
      async confirmOrderStatus(){
        if (this.payLockInfo.orderType == 'goods') {
          this.$router.push({
            name: 'PaySuccess', query: {
              orderType: 'goods'
            }
          })
        } else {
          this.$vux.loading.show({
            text: '正在出票...'
          });
          let res;
          try {
            res = await orderApi.getCinemaOrderStatus(this.payLockInfo.orderId);
          } catch (e) {
            this.confirmOrderStatus();
            return;
          }
          //3 为订单完成
          if (res && res.data && res.data.orderInfo && res.data.orderInfo && res.data.orderInfo.orderStatus == '3') {
            this.$router.push({
              name: 'PaySuccess'
            })//场次票为默认订单类型，套票支付不走此页面，在确认套票订单
          } else {
            this.confirmOrderStatus();
            return;
          }
          this.$vux.loading.hide();
        }
      },
      // 点击确认支付
      async confirmPay () {
        this.$vux.loading.show({
            name: '请稍后'
          }
        );
//        let conRes;
//        try {
//          conRes = await  AuthApi.getWeixinConfig();
//        } catch (e) {
//          this.$util.showRequestErro(e)
//        }
//        if (conRes && conRes.data) {
        let res;
        try {
          res = await StoreApi.goodsAndFilmComfirmNewPay(this.payLockInfo.orderId, this.payLockInfo.orderType, "weixinpay", 0, this.openId)
        }
        catch (e) {
          this.$util.showRequestErro(e)
        }
        if (res && res.data && res.data.weixinpay) {
          let wxpay = res.data.weixinpay;
          let ctx = this;
          if (WeixinJSBridge) {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": wxpay.appId,     //公众号名称，由商户传入
                "timeStamp": wxpay.timeStamp.toString(),//时间戳，自1970年以来的秒数
                "nonceStr": wxpay.nonceStr, //随机串
                "package": wxpay.package,
                "signType": wxpay.signType,//微信签名方式
                "paySign": wxpay.paySign//微信签名
              },
              function (res) {
//                ctx.erroInfo = res;
                try {
                  res = JSON.parse(res);
                } catch (e) {

                }
                if (res.err_msg == "get_brand_wcpay_request:ok") {//cancel
//                  ctx.erroInfo.type='gotoPaySuccess';
                  ctx.confirmOrderStatus()
                } else {
                  if (res.err_desc)
                    ctx.$util.showRequestErro({text: res.err_desc});
                }
              }
            );
          }
          else {

          }
        }
//        }
        this.$vux.loading.hide();

      },
      change(val){

      },

    },
    destroyed(){
      if (this.timer)
        clearInterval(this.timer);
    }
  }
</script>
<style lang="less">
  @import "~style/base-variables.less";

  .c-pay {
    .weui-cells {
      background: none !important;
    }
    .weui-cells__title {
      color: @font-color;
      padding-bottom: 10px;
    }
    .vux-radio-icon {
      height: 29px;
      width: 29px;
    }
  }

  .pay-card {
    margin-bottom: 10px;
    .weui-cells__title {
      margin-bottom: 10px;
      color: #000;
    }
  }
</style>

<style lang="less" scoped>
  @import "~style/base-variables.less";

  .payInfo {
    font-size: 15px;
    // .payItem{
    //   display: flex;
    //   padding: 11px 0;
    //   align-items: center;
    //   border-bottom: dashed @border-color 1px;
    //   margin-bottom: 15px;
    //   img{
    //     height: 29px;
    //     width: 29px;
    //   }
    //   label{
    //     margin-left: 12px;
    //   }
    // }
    .last-time {
      padding: 15px 0 0;
      font-size: 14px;
      color: @color-sub;
      font-weight: bold;
    }
    .c-pay {
      padding: 15px 0px 15px 0px;
      background: @base-bg-color;
    }

    .payment {
      background: @base-bg-color;
      margin-bottom: 15px;
      margin-top: 11px;
      padding: 15px;
      :first-child {
        color: @font-color;
        font-size: 15px;
      }
      :nth-child(2) {
        font-size: 17px;
        color: @color-primary;
        font-weight: bold;
      }
    }
    .tip {
      margin-left: 15px;
      margin-top: 15px;
    }
  }


</style>
