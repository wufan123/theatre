<template>
  <page headerTitle="选择优惠券" flex-box="1" footerText="确认" :footerFunc="confirmCoupon" >
  <coupon-item slot="contain" v-for="(item,index) in couponList" :key="index" @click.native="select(item)" :disabled="item.disabled">
    <div slot="right" flex="cross:center" >
      <label  flex-box="0" flex="main:center cross:center" :class="item.checked?'select active':'select'" ></label>
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
        props:['list', 'orderType'],
        components:{CouponItem},
        data(){
            return {
                selectCoupon:{},
                voucherType: null, // 优惠券类型
                seatCount: 1, // 订单座位数
                couponList: [],
            }
        },
        methods: {
          fetchData() {
            if (this.orderType=='goods') {
              this.$store.state.coupon.goodsCouponList.forEach(item => {
                this.couponList.push(item)
              })
            } else {
              this.$store.state.coupon.ticketCouponList.forEach(item => {
                this.couponList.push(item)
              })
            }
          },
          select(coupon){
            let itemChecked = !coupon.checked // 当前选中状态
            // 初始化选中类型
            if (!this.voucherType && itemChecked) {
              this.voucherType = coupon.voucherType
              // 已选中兑换券，立减券不可选。或者已选中立减券，兑换券不可选
              this.couponList.forEach(item => {
                let checked = (this.voucherType==0&&item.voucherType!=0)||(this.voucherType!=0&&item.voucherType==0)
                this.$set(item,'disabled',checked)
              })
            }

            // 修改选中状态
            this.couponList.forEach(item => {
              if (item.voucherNum == coupon.voucherNum) {
                this.$set(item,'checked',!item.checked)
              } else {
                // 除了兑换券，其他单选
                if (itemChecked && coupon.voucherType != 0) {
                  this.$set(item,'checked',false)
                }
              }
            })

            // 选中个数
            let selectCount = 0;
            this.couponList.forEach(item => {
              if (item.checked) {
                selectCount++
              }
            })

            // 无选中状态，清除当前类型
            if(selectCount == 0) {
              this.voucherType = null
              this.couponList.forEach(item => {
                this.$set(item,'disabled',false)
              })
            }

            // 如果是兑换券，且已经达到最大
            if (this.voucherType == 0) {
              this.couponList.forEach(item => {
                if (item.voucherType == 0) {
                  let disabled = (selectCount >= this.seatCount) && (!item.checked);
                  this.$set(item,'disabled',disabled)
                }
              })
            }
          },
          confirmCoupon(){
            if (this.orderType=='goods') {
              this.$store.commit("coupon/setGoodsCouponList", this.couponList);
            } else {
              this.$store.commit("coupon/setTicketCouponList", this.couponList);
            }
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
