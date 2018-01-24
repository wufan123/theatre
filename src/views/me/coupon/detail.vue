<template>
  <page :headerTitle="`详情`"  :footerText="`解除绑定`" :footerFunc="relieveBind">
    <div slot="contain">
      <div class="detail">
        <coupon-item>
          <label class="leftTitle" slot="right">{{coupon.voucherName}}</label>
          <label class="leftInfo" slot="right">有效期 {{new Date(coupon.validData * 1000).format("yyyy-MM-dd")}}</label>
          <label class="rightTitle" slot="left">￥{{coupon.voucherValue}}</label>
        </coupon-item>
        <div class="info">
            <p class="title">优惠券编码：{{coupon.voucherNum}}</p>
            <p class="title">使用规则：</p>
            <textarea class="rule-info" readonly>
{{couponInfo.useRule}}
</textarea>
        </div>
      </div>

    </div>
  </page>
</template>
<script>
  import CouponItem from 'views/components/couponList/item.vue'
  import {mapState} from "vuex";
  import CouponApi from 'api/couponApi'
  export default {
    components: {CouponItem},
    computed: {
      ...mapState("coupon/", ['coupon'])
    },
    data(){
      return {
        couponInfo: {}
      }
    },
    methods: {
      relieveBind(){
        var _this = this;
        this.$vux.confirm.show({
          content:"是否解除该优惠券?",
          onConfirm () {
            CouponApi.userVoucherDelete(_this.coupon.voucherNum).then(res=>{
              _this.$router.back(-1)
            })
          }
        })
      },
      getData(){
        CouponApi.userVoucherDetail(this.coupon.voucherNum).then(res => {
          this.couponInfo = res.data
        })
      },
      fetchData(){
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~style/base-variables";

  .detail {
    padding: 15px 0
  }

  .rightTitle {
    font-size:18px;
    white-space: nowrap;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }

  .info {
    margin: 10px 15px;
    .title {
      margin-bottom: 10px;
      font-size: 15px;
    }
    .rule-info {
      width: 100%;
      background: none;
      border: 0;
      font-size:14px;
      height: 400px;
      line-height: 22px;
    }
  }

  .leftTitle {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    color: @color-sub;
  }

  .leftInfo {
    font-size: 12px;
    color: @font-color;
  }
</style>
