<template>
<page :headerTitle="`选择优惠券`" :footerText="`确认`" :footerFunc="confirmCoupon" >
  <div slot="contain" class="userCoupon">
      <coupon-item v-for="(item,index) in useCoupon" :key="index" @click.native="selectCoupon(item)">
        <div slot="right" flex="cross:center">
          <label :class="item.voucherNum== selectedCoupon.voucherNum?'select active':'select'" flex-box="0" flex="main:center cross:center"></label>
          <div style="overflow: hidden;"  flex="dir:top" flex-box="1">
            <label class="leftTitle text-ellipsis-line">{{item.voucherName}}</label>
            <label class="leftInfo text-ellipsis-line" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
          </div>
        </div>
        <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
      </coupon-item>
  </div>
</page>
</template>
<script>
  import CouponItem from 'views/components/couponList/item.vue'
    import {mapState} from "vuex";
  export default {
    data(){
      return{
        canUseList:[],
        selectedCoupon:{}
      }
    },
    components:{CouponItem},
    computed: {
      ...mapState('coupon/', ['useCoupon'])
    },
    methods:{
      selectCoupon(coupon){
        this.selectedCoupon = coupon
      },
      confirmCoupon(){
        this.$store.commit('coupon/setSelectedCoupon',this.selectedCoupon)
        this.$router.go(-1)
      },
      fetchData(){
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