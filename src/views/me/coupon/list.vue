<template>
  <page :headerTitle="`优惠券`" flex-box="1" :white="true">
    <img src="../../../assets/images/scan.png" slot="rightTop" class="icon"/>
    <div slot="contain">
      <div flex="dir:top">
        <div flex-box="0" flex="dir:left cross:center " class="topBar">
          <div class="inputOut">
            <x-input v-model="value"></x-input>
          </div>
          <div class="s-button khaki" @click="addCoupon">添加</div>
        </div>
        <div flex-box="1">
          <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage usePulldown
                         height='-110'>

            <coupon-item v-for="(item,index) in usableList" :key="index" @click.native="gotoCouponDetail(item)"
                         >
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
            </coupon-item>
            <div flex="flex:left main:center" >
              <img :src="require('assets/images/me/coupon_lost.png')" class="couponLost" @click="showUnusable=true" v-show="!showUnusable">
            </div>
            <coupon-item v-show="showUnusable" v-for="(item,index) in unusableList" :key="index" @click.native="gotoCouponDetail(item)"
                         :disabled="true">
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
            </coupon-item>
          </page-scroller>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CouponItem from 'views/components/couponList/item.vue'
  import {XInput, XButton} from 'vux'
  import CouponApi from 'api/couponApi'
  export default {
    components: {XInput, XButton, PageScroller, CouponItem},
    data(){
      return {
        value: '',
        dataList: [],
        usableList: [],
        unusableList: [],
        showUnusable:false,
      }
    },
    methods: {
      async  getDataList(page){
        let res = await  CouponApi.userVoucherList(page, 0);
        if (res && res.data) {
          this.dataList = res.data.voucherList;
          this.usableList = this.dataList.filter(item => {
            if (item.status < 3)
              return item;
          })
          this.unusableList = this.dataList.filter(item => {
            if (item.status >= 3)
              return item;
          })
          console.log(this.unusableList);
        }
        return {
          page: {
            number: res.data.voucherNumber, size: 100, totalElements: res.data.totalNum, totalPages: 1
          }
        }
      },
      gotoCouponDetail(item){
        this.$store.commit("coupon/setCoupon", item);
        this.$router.push({path: 'CouponDetail'});
      },
      fetchData(){
        return this.$refs.scroller.reset()
      },
      async addCoupon(){
        let res = await CouponApi.addVoucher(this.value);
        if (res && res.status === 0) {
          this.$vux.toast.text("绑定成功", 'bottom');
        }
      }
    }


  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";

  .topBar {
    padding: 15px 15px 10px;
    justify-content: space-between;
    .s-button {
      padding: 6px 15px;
    }
    .inputOut {
      padding-bottom: 2px;
      border: solid @color-active 1px;
      font-size: 14px;
      height: 30px;
      width: 275px;
      .weui-cell {
        padding: 5px 11px;
      }
    }
  }

  .couponLost {
    height: 31px;
    margin-bottom: 10px;
  }

  .icon {
    height: 22px;
    width: 22px;
  }

  .rightTitle {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }

  .rightTip {
    font-size: 9px;
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
