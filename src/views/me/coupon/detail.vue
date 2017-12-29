<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="detail">
        <coupon-item>
          <label class="leftTitle" slot="right">{{coupon.voucherName}}</label>
          <label class="leftInfo" slot="right">有效期 {{new Date(coupon.validData*1000).format("yyyy-MM-dd")}}</label>
          <label class="rightTitle" slot="left">￥{{coupon.voucherValue}}</label>
        </coupon-item>
        <div class="info">
            <p class="title bold">优惠券编码：{{coupon.voucherNum}}</p>
            <p class="title">使用规则：</p>
            <p>1. 立减券可以在购买剧票时使用；</p>
            <p>2. 特惠场，见面会等特殊场次不可用</p>
            <p>3. 一经兑换则该券为无效券，如需退单，退还金额为实际支付金额；</p>
            <p>4. 立减券需在有效期内使用，过期作废，立减券不可兑换现金；</p>
            <p>5. 中瑞剧坊可在法律许可的范围内对使用规则作出适当的调整。</p>
        </div>
      </div>

    </div>
  </page>
</template>
<script>
import CouponItem from 'views/components/couponList/item.vue'
import {mapState} from "vuex";
export default {
  components:{CouponItem},
  computed:{
    ...mapState("coupon/",['coupon'])
  },
  data(){
      return{
      }
  }
}
</script>

<style lang="less" scoped>
  @import "~style/base-variables";
  .detail{padding: 15px 0}
.rightTitle {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }
  .info{margin: 10px 15px;
    .title{margin-bottom: 10px;font-size: 15px;}
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
