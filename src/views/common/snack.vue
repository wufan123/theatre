<template>
  <div>
    <page :headerTitle="`来点小吃`" flex-box="1" :white="true">
      <div slot="contain">
        <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown
                       height='-48'>
          <good-item v-for="(item,index) in dataList" :key="item.goodsId" :goodsName="item.goodsName"
                     :channelFee="item.price" :goodsCoverImage="item.goodsImg" class="snackItem">

            <!-- <x-number v-show="item.num>0" :value="item.num" :min="0"   ></x-number> -->
            <item-number :item="{num:item.num,index:index,stock:item.channelStock}" @onChange="change"></item-number>
            <!-- <div class="test">
              <item-number :item="{num:item.num,index:index,stock:item.channelStock}" @onChange="change"></item-number>
            </div> -->
          </good-item>
        </page-scroller>
      </div>
    </page>
    <x-button class="no-radius bottomBtn" type="primary" @click.native="createOrder">{{bottomTitle}}</x-button>
  </div>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import GoodItem from 'views/components/goodList/item.vue'
  import StoreApi from 'api/storeApi'
  import ItemNumber from 'views/components/itemNumber.vue'
  import {mapState} from "vuex";
  export default {
    components: {PageScroller, GoodItem, ItemNumber},
    data(){
      return {
        value: 0,
        dataList: [],
        numList: [],
        orderId: this.$route.query.orderId,
        bottomTitle: '不选了，直接下单',
      }
    },
    computed:{
      ...mapState('common',['userInfo'])
    },
    methods: {
      getDataList(page){
        return StoreApi.getGoodsList().then(success => {
          this.dataList = success.data
          if(this.dataList.length<=0){
            this.createOrder()
          }
          this.dataList.forEach(data => {
            data.num = 0;
          })
          let res = {
            data: success.data,
            page: {
              number: 0, size: success.data.length, totalElements: success.data.length, totalPages: 1
            }
          }
          return res
        }, error => {

        })
      },
      fetchData(){
        return this.$refs.scroller.reset()
      },
      change(item){
        let newItem = {...this.dataList[item.index],num:item.num};
        this.$set(this.dataList, item.index, newItem);
        let sum =this.dataList.map((i)=>{
            return i.num*i.price
        })
          .reduce((acc,i)=>{
            acc+=i;
            return acc
        });
            this.bottomTitle =sum? `下一步（卖品总计 ￥${sum.toFixed(2)}）`:'不选了，直接下单购票';
      },
      async createOrder() {
        var goodsStr = "";
        for (var i = 0; i < this.dataList.length; i++) {
          var goods = this.dataList[i];
          if (goods.num && goods.num != 0) {
            if (goodsStr) {
              goodsStr += ",";
            }
            goodsStr += goods.goodsId + ":" + goods.num;
          }
        }
        if (goodsStr.length == 0) {
          this.$router.push({path: 'ConfirmOrder?orderId=' + this.orderId})
          return;
        }
        this.$vux.loading.show({
          text: '下单中'
        });
        let mobile = this.userInfo.bindmobile;
        let createRes;
        try{
            createRes = await StoreApi.createGoodsFilmOrder(mobile, goodsStr, this.orderId);
        }catch (e)
        {
            this.$util.showRequestErro(e);
        }
        if(createRes&&createRes.data){
            let mergeRes;
            try{
              mergeRes = await StoreApi.mergeOrder(this.orderId, createRes.data, mobile)
            }catch (e)
            {
                this.$util.showRequestErro(e)
            }
            if(mergeRes&&mergeRes.status==0){
              this.$router.push({path: 'ConfirmOrder?orderId=' + this.orderId})
            }
        }
        this.$vux.loading.hide();
      }
    }
  }
</script>
<style lang="less">
  @import "~style/base-variables";

  .snackItem {
    position: relative;  overflow: hidden;
    .vux-number-selector {display:flex;padding:0!important;
      border: solid @color-active 1px !important;
      width:20px;height:20px;justify-content: center;
    align-items: center;
    }
    .vux-number-input {
      background: @color-sub !important;
      color: white;
      height:15px;
    }
    .vux-number-selector svg{width:13px;height:13px;}
    .num {
      .weui-cell {
        padding: 0 !important;
      }
      position: absolute;
      bottom: 22px;
      min-width:27px;
      min-height:22px;
      right: 10px;
    }
  }
</style>

