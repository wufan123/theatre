<template>
  <page headerTitle="选择优惠券" flex-box="1" footerText="确认" :footerFunc="confirmCoupon">
    <coupon-item slot="contain" v-for="(item,index) in couponList" :key="index" @click.native="select(item)"
                 :disabled="item.disabled||item.status==2">
      <div slot="right" flex="cross:center">
        <label flex-box="0" flex="main:center cross:center" :class="item.checked?'select active':'select'"></label>
        <div style="overflow: hidden;" flex="dir:top" flex-box="1">
          <label class="leftTitle text-ellipsis-line">{{item.voucherName}}</label>
          <label class="leftInfo text-ellipsis-line"
                 slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
        </div>
      </div>
      <label class="rightTitle" slot="left">{{item._voucherValue}}</label>
    </coupon-item>
  </page>
</template>
<script>
  import CouponItem from 'views/components/couponList/item.vue'
  export default {
    components: {CouponItem},
    data(){
      return {
        selectCoupon: {},
        voucherType: null, // 优惠券类型
        seatCount: this.$route.query.seatCount, // 订单座位数
        couponList: [],
        orderType: this.$route.query.orderType
      }
    },
    methods: {
      fetchData() {
        if (this.orderType == 'goods') {
          this.$store.state.coupon.goodsCouponList.forEach(item => {
            item._voucherValue = item.voucherType == 0?'兑换券':`￥${item.voucherValue}`;
            this.couponList.push(item)
          })
        } else {
          this.$store.state.coupon.ticketCouponList.forEach(item => {
            item._voucherValue = item.voucherType == 0?'兑换券':`￥${item.voucherValue}`;
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
            let checked = (this.voucherType == 0 && item.voucherType != 0) || (this.voucherType != 0 && item.voucherType == 0)
            this.$set(item, 'disabled', checked)
          })
        }

        // 修改选中状态
        this.couponList.forEach(item => {
          if (item.voucherNum == coupon.voucherNum) {
            this.$set(item, 'checked', !item.checked)
          } else {
            // 除了兑换券，其他单选
            if (itemChecked && coupon.voucherType != 0) {
              this.$set(item, 'checked', false)
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
        if (selectCount == 0) {
          this.voucherType = null
          this.couponList.forEach(item => {
            this.$set(item, 'disabled', false)
          })
        }

        // 如果是兑换券，且已经达到最大
        if (this.voucherType == 0) {
          this.couponList.forEach(item => {
            if (item.voucherType == 0) {
              let disabled = (selectCount >= this.seatCount) && (!item.checked);
              this.$set(item, 'disabled', disabled)
            }
          })
        }
      },
      confirmCoupon(){
        if (this.voucherType == 0) {
          let list = this.couponList.filter(item => {
            return item.checked
          });
          console.log(list.length,parseFloat(this.seatCount));
          if (list.length < parseFloat(this.seatCount)) {
            this.$vux.toast.text(`还需要${this.seatCount - list.length}张兑换券`);
            return;
          }
        }
        if (this.orderType == 'goods') {
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

  .userCoupon {
    padding-top: 10px;
  }

  .leftTitle {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    color: @color-sub;
  }

  .select {
    border: 1px solid @color-sub;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: relative;
    margin: 0 10px 0 -5px;
    &.active::before {
      content: "";
      width: 11px;
      height: 11px;
      background: @color-sub;
      position:absolute;
      top:2px;
      left:2px;
      border-radius: 50%;
    }
  }

  .leftInfo {
    font-size: 12px;
    color: @font-color;
  }

  .rightTitle {
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }
</style>
