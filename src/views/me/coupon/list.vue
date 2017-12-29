<template>
    <page :headerTitle="`优惠券`" flex-box="1" :white="true">
      <img src="../../../assets/images/scan.png" slot="rightTop" class="icon"/>
      <div slot="contain">
          <div flex="dir:top">
              <div flex-box="0" flex="dir:left cross:center " class="topBar">
                <div class="inputOut">
                  <x-input  v-model="value" ></x-input>
                </div>
                <div class="s-button khaki">添加</div>
              </div>
              <div flex-box="1">
                <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-110' >
                  <coupon-item v-for="(item,index) in 8" :key="index" @click.native="$router.push('CouponDetail')">
                    <label class="leftTitle" slot="right">立减券</label>
                    <label class="leftInfo" slot="right">有效期 2017-12-11</label>
                    <label class="rightTitle" slot="left">￥30</label>
                  </coupon-item>
                  <div flex="flex:left main:center">
                      <img :src="require('assets/images/me/coupon_lost.png')" class="couponLost">
                  </div>
                </page-scroller>
              </div>
          </div>
      </div>
    </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CouponItem from 'views/components/couponList/item.vue'
   import {XInput,XButton} from 'vux'
  import CouponApi from 'api/couponApi'
    export default {
      components:{XInput,XButton,PageScroller,CouponItem},
      data(){
            return {
              value:'11111',
              dataList:[]
            }
        },
        methods: {
          getDataList(page){
            return CouponApi.userVoucherList(page,0).then(success =>{
              console.log(success)
              this.dataList= success.data.voucherList
              let res = {
                data:success.data,
                page:{
                  number:0,size:this.dataList.length,totalElements:this.dataList.length,totalPages:1
                }
              }
              return res
            })
          },
          fetchData(){
            return this.$refs.scroller.reset()
          }
        }

    }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .topBar{
    padding: 15px 15px 10px;
    justify-content: space-between;
    .s-button{padding: 6px 15px;}
    .inputOut{padding-bottom: 2px;
      border: solid @color-active 1px;
      font-size: 14px;
      height: 30px;
      width: 275px;
      .weui-cell{
        padding: 5px 11px;
      }
    }
  }
  .couponLost{
    height: 31px;margin-bottom: 10px;
  }
  .icon{
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
