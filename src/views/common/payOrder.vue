<template>
  <page :headerTitle="`支付订单`" :footerText="`确认支付`" :footerFunc="confirmPay">
    <div slot="contain" class="payInfo">
      <div class="center last-time">支付剩余时间：15：00</div>
      <div class="flexb payment"><label>实付款</label><label>￥200.00</label></div>
      <div class="c-pay">
        <group title="选择支付方式">
          <radio title="title" :options="typeData" v-model="value"></radio>
        </group>
        <!-- <div >
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
        </div> -->
      </div>
      <div class="tip">
        <p>温馨提示：</p>
        <p>订单一旦完成购买，不退不换</p></div>
    </div>
  </page>
</template>
<script>
  import {List, ListItem} from 'views/components/settingList'
  import {Group, Radio} from "vux";
  import StoreApi from 'api/storeApi'
  import WxApi from 'api/wxApi'
  export default {
    data(){
      return {
        telphone: '13800138000',
        typeData: [{
          icon: 'http://p0bd8izdn.bkt.clouddn.com/ruihua/wap/images/member.png',
          key: '1',
          value: '会员卡：余额￥20.00'
        }, {
          icon: 'http://p0bd8izdn.bkt.clouddn.com/ruihua/wap/images/wexin.png',
          key: '2',
          value: '微信'
        }],

        orderId: this.$route.params.orderId,
        orderType: this.$route.params.orderType,
        payLockInfo: this.$route.params.payLockInfo
      }
    },
    components: {List, ListItem, Group, Radio},
    methods: {
      fetchData(){
        console.log('orderId=' + this.orderId)
        console.log('orderType=' + this.orderType)
        console.log(this.payLockInfo)
      },
      // 获取支付方式
      getPayType: function () {
        var payType = ""
        if (!this.payLockInfo)
          return payType
        // if (this.useAccount > 0)
        //     payType = "account"
        // if (this.data.useIntegral > 0) {
        //     if (payType)
        //         payType += ","
        //     payType += "integral"
        // }
        if (this.payLockInfo.price == 0) {
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
      // 点击确认支付
      confirmPay: function () {
        // var orderType = this.orderType
        // var orderId = this.orderId
        // var openId = app.getOpenId()
        // modalUtils.showLoadingToast()
        StoreApi.goodsAndFilmComfirmNewPay(this.orderId, this.orderType, this.getPayType(), 0, null).then(success => {
          if (success.status == 0) {
            let payInfo = success.data.weixinpay
            WxApi.wxPay(payInfo, success => {

            }, error => {

            })
          }
          // modalUtils.hideLoadingToast()
          // if (this.data.payCount == 0) {
          //   pageUtil.gotoPaySuccess(this.data.orderId, this.data.orderType)
          // }
          // else {//启动微信支付
          //   this.requestWxPay(res.weixinpay)
          // }
        }, error => {

        })
      },
      change(val){
        console.log('change', val)
      }
    }
  }
</script>
<style lang="less">
  @import "~style/base-variables.less";
.c-pay{
  .weui-cells{background:none!important;}
  .weui-cells__title{color: @font-color;padding-bottom: 10px;}
  .vux-radio-icon{height: 29px; width: 29px;}
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
  .payInfo{
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
      padding: 15px 0px  15px 0px;
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
    .tip{
      margin-left: 15px;
      margin-top: 15px;
    }
  }


</style>
