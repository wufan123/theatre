<template>
  <page :headerTitle="`充值`">
    <div slot="contain">
      <div class="recharge">
        <p class="title">{{card.levelName}}：{{card.cardNumber}}</p>
        <div class="recharge-b" flex="main:justify">
          <i class="icon subtract" @click="subtract">-</i>
          <input class="input" type="text" placeholder="请输入100的整倍数" v-model="amount">
          <i class="icon add" @click="add">+</i>
        </div>
        <img :src="require('assets/images/me/comfirm_btn.png')" @click="confirm" class="comfirm-btn">
      </div>
    </div>
  </page>
</template>
<script>
  import CardApi from 'api/cardApi'
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        amount: '',
        card: {}
      }
    },
    computed: {
      ...mapState('common', ['openId'])
    },
    methods: {
      subtract(){
        this.amount = Number(this.amount) - 100
        if (this.amount <= 0) {
          this.amount = ''
        }
      },
      add(){
        this.amount = Number(this.amount) + 100
        if (this.amount > 1000000) {
          this.amount = 1000000
        }
      },
      async confirm(){
        if (!this.$util.isNumberBy100(this.amount)) {
          this.$vux.toast.text("请输入整百金额", 'middle');
          return
        }
        let res;
        try {
          res = await  CardApi.recharge(this.amount, this.card.id, 'weixinpay', this.openId);
        } catch (e) {
          this.$util.showRequestErro(e);
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
                  ctx.$vux.toast.show({
                    text: '充值成功',
                    type: 'success'
                  })
                  ctx.$router.go(-1)

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
      },
      fetchData(){
        this.card = this.$route.query
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";

  .recharge {
    text-align: center;
    margin: 60px;
    overflow: hidden;
    .title {
      color: @color-sub;
      font-size: 15px;
      margin-bottom: 20px
    }
    .recharge-b {
      margin-bottom: 20px;
      .input {
        text-align: center;
        width: 160px;
        padding: 0 10px;
        border-radius: 4px;
        border: 1px solid @color-sub;
        box-sizing: border-box;
        background: none;
      }
      .icon {
        color: @color-sub;
        line-height: 10px;
        padding: 10px 12px;
        font-size: 20px;
        border-radius: 4px;
        border: 1px solid @color-sub;
        box-sizing: border-box;
        &:active {
          background: @color-sub;
          color: #ffffff;
        }
      }
    }
  }
</style>
