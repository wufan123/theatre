<template>
    <page :headerTitle="`优惠券`" flex-box="1" :white="true">
      <img src="../../../assets/images/scan.png" slot="rightTop" class="icon"/>
      <div slot="contain" style="background-color: white">
        <div flex="dir:left cross:center main:center">
          <div class="inputOut">
            <x-input  v-model="value" ></x-input>
          </div>
          <div>
            <XButton  class="no-radius" type="primary" mini>添加</XButton>
          </div>
        </div>
        <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-88' >
        <div v-for="(item,index) in dataList" :key="index" flex="dir:left cross:center" class="couponItem">
          <div flex="dir:top" flex-box="1">
            <label>{{item.cinemaName}}立减券</label>
            <label>有效期:2017-12-11</label>
          </div>
          <div>
             <label>¥20</label>
          </div>
        </div>
        </page-scroller>
      </div>
    </page>
</template>
<script>
  import PageScroller from '../../components/PageScroller.vue'
   import {XInput,XButton} from 'vux'
  import CouponApi from 'api/couponApi'
    export default {
      components:{XInput,XButton,PageScroller},
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
<style lang="less">
  @import "~style/base-variables";
  .couponItem{
    height: 60px;
    border: solid @border-color 1px;
    margin: 10px 20px;
    padding: 10px;
    border-radius: 5px;
  }
  .inputOut{
    background-color: #eee;
    width: 200px;
  }
  .icon{
    height: 22px;
    width: 22px;
  }
  .commonButton{
    width: 100px;
  }
</style>
