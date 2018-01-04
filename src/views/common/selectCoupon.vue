<template>
  <page headerTitle="选择优惠券" flex-box="1">
    {{list}}
  <coupon-item slot="contain" v-for="(item,index) in list" :key="index" @click.native="select(item)"
  >
    <label class="leftTitle" slot="right">{{item.voucherName}}</label>
    <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
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
            }
        },
        methods: {
          select(item){
              this.$store.commit("business/setSelectedCoupon",
                item);
              this.$router.go(-1);
          }
        }
    }
</script>
<style lang="less">
</style>
