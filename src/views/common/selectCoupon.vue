<template>
  <page headerTitle="选择优惠券" flex-box="1" footerText="确认" :footerFunc="confirmCoupon" >
  <coupon-item slot="contain" v-for="(item,index) in list" :key="index" @click.native="select(item)"
  >
    <div slot="right" flex="cross:center" >
      <label  flex-box="0" flex="main:center cross:center" :class="item.voucherNum== selectedCoupon.voucherNum?'select active':'select'" ></label>
      <div style="overflow: hidden;"  flex="dir:top" flex-box="1">
        <label class="leftTitle text-ellipsis-line">{{item.voucherName}}</label>
        <label class="leftInfo text-ellipsis-line" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
      </div>
    </div>
    <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
  </coupon-item>
  </page>
</template>
<script>
  import CouponItem from 'views/components/couponList/item.vue'
    export default {
        props:['list'],
        components:{CouponItem},
        data(){
            return {
                selectCoupon:{}
            }
        },
        methods: {
          select(item){
              this.selectedCoupon = item;
          },
          confirmCoupon(){
            this.$store.commit("business/setSelectedCoupon",
              item);
            this.$router.go(-1);
          }
        }
    }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .userCoupon{padding-top:10px;}
  .leftTitle {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    color: @color-sub;
  }

  .select{border:1px solid @color-sub;width:15px;height:15px;border-radius: 50%;position:relative; margin:0 10px 0 -5px;
    &.active::before{content:"";width:11px;height:11px;background:@color-sub;border-radius: 50%;}
  }

  .leftInfo {
    font-size: 12px;
    color: @font-color;
  }
  .rightTitle {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }
</style>
