<template>
  <page :headerTitle="`确认套票订单`" :footerText="`支付`" :footerFunc="lockAndPayOrder">
    <div slot="contain">
      <div class="c-order">
        <div class="c-info">
          <list twoLine>
            <div v-if="packageInfo&&packageInfo.detail" class="good-content">
              <list-item v-for="(item,index) in packageInfo.detail" :key="index" :img="item.goodsImg"
                         :contentTitle="item.goodsName"
                         :contentBrief="`x ${item.goodsNums}`"></list-item>
            </div>
          </list>
        </div>
        <div class="price">
          <div class="flexb" flex="main:justify"><label>总价</label><label>￥{{packageInfo.price}}</label></div>
          <div class="flexb payment" flex="main:justify"><label>实付款</label><label>￥{{packageInfo.price}}</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile"  ref="phone"
                 v-model="phone"></x-input>
      </group>
      <div class="info">
        <p>温馨提示：</p>
        <p>手机号用于生成订单，及发送支付短信</p>
        {{erroInfo}}
      </div>
    </div>
  </page>
</template>
<script>
  import {List, ListItem} from "views/components/settingList";
  import {XInput, Group} from "vux";
  import OrderApi from "api/orderApi";
  import ComboApi from "api/comboApi";
  import StoreApi from "api/storeApi";
  import {mapState} from "vuex";
  export default {
    props: ["goodInfo"],
    data() {
      return {
        phone: "",
        orderId: this.$route.query.orderId,
        packageId: this.$route.query.packageId,
        orderType: "package",
        packageInfo: {}
      };
    },
    computed: {
      ...mapState("common/", ["userInfo",'openId'])
    },
    methods: {
      async fetchData() {

        this.phone = this.userInfo.bindmobile;
        this.oldPhone = this.phone;
        let res = await ComboApi.getPackageDetail(this.packageId, this.orderType);
        if (res && res.data) {
          this.packageInfo = res.data;
        }
      },
      // 锁定，跳转到支付页面
      async lockAndPayOrder() {
        
        if (!this.$refs.phone.valid) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '请输入正确的手机号'
          })
          return
        }
        if (this.phone === "") {
          this.$vux.toast.show({
            type: "cancel",
            text: "手机号不能为空"
          });
          return;
        }
        this.$vux.loading.show({
          text: '正在支付'
        });
        if (this.phone !== this.userInfo.bindmobile) {
          OrderApi.updateOrderMobile(this.phone, this.orderId)
        }
        let res;
        try {
          res = await StoreApi.payPackage("weixinpay", this.orderId,this.openId);
        }
        catch (e) {
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
                ctx.erroInfo = res;
                try {
                  res = JSON.parse(res);
                } catch (e) {

                }
                if (res.err_msg == "get_brand_wcpay_request:ok") {//cancel
                  ctx.erroInfo.type='gotoPaySuccess';
                  ctx.$router.push({name: 'PaySuccess',query:{
                      orderType:'package'
                  }})
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
        this.$vux.loading.hide();
      }
    },
    components: {List, ListItem, XInput, Group}
  };
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";

  .c-order {
    padding: 0 15px;
    background: @base-bg-color;
    .c-info {
      border-bottom: dashed @border-color 1px;
    }
    .am-list-item {
      padding: 15px 0;
      margin-top: -1px;
    }
    .price {
      padding: 15px 0;
      font-size: 14px;
      color: @font-color-sub;
      .payment {
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
    }
  }

  .info {
    margin: 15px;
    font-size: 16px;
  }
</style>
