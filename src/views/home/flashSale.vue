<template>
  <page :headerTitle="`限时抢`" flex-box="1" :white="true">
    <div slot="contain" >
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-46' >
        <div v-for="(item,index) in 7" :key="index" flex="dir:left cross:center" class="couponItem" @click="listItemClick">
          <div flex="dir:top" :style="{backgroundImage:`url(${require('assets/images/home/sale_bg.png')})`}" class="left">
            <label class="title">¥150</label>
            <label class="info">有效期:2017-12-11</label>
          </div>
          <div flex="dir:top" class="right" :style="{backgroundImage:index==0?`url(${require('assets/images/home/flash_sale_right_2.png')})`:`url(${require('assets/images/home/flash_sale_right_1.png')})`}">
              <label class="title">立即抢</label>
              <label class="tip">已抢光20%</label>
          </div>
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import StoreApi from 'api/storeApi'
    export default {
      components:{PageScroller},
      data(){
        return {
          value:'11111',
          dataList:[]
        }
      },
      methods: {
        getDataList(page){
         return StoreApi.getBuyingGoods().then(success => {
          console.log(success)
          this.dataList= success.data
          let res = {
            data:success.data,
            page:{
              number:0,size:success.data.length,totalElements:success.data.length,totalPages:1
            }
          }
          return res
        }, error => {
          console.log(error)
        })
        },
        fetchData(){
          return this.$refs.scroller.reset()
        },
        listItemClick(){
          this.$vux.toast.text('请到我的优惠券中查看', 'bottom');
        }
      }
    }
</script>
<style lang="less">
  @import "~style/base-variables";
  .couponItem{
    height: 90px;
    margin: 15px;
    border-radius: 5px;
    .right{
      height: 100%;
      width: 75px;
      background: center no-repeat;
      background-size: 100%100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      .title{
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
      }
      .tip {
        font-size: 9px;
      }
    }
    .left{
      height: 100%;
      flex: 1;
      background: center no-repeat;
      background-size: 100%100%;
      display: flex;
      justify-content: center;
      padding-left: 25px;
      .title{
        font-size: 20px;
        font-weight: bold;
        color: @color-primary;
      }
      .info{
        font-size: 12px;
        color: @font-color;
      }
    }
  }
</style>
