<template>
  <div>
    <page :headerTitle="`来点小吃`" flex-box="1" :white="true">
      <div slot="contain">

        <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown
                       height='-90'>
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
         <div slot="footer">
            <x-button  class="no-radius bottomBtn" type="primary" :style="$util.isIphoneX()?{'margin-bottom':'14px'}:{}"  @click.native="createOrder">{{bottomTitle}}</x-button>
          </div>
    </page>
 
    
  </div>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import GoodItem from 'views/components/goodList/item.vue'
  import StoreApi from 'api/storeApi'
  import TheatreApi from "api/theatreApi";
  import ItemNumber from 'views/components/itemNumber.vue'
  import {mapState} from "vuex";
  export default {
    components: {PageScroller, GoodItem, ItemNumber},
    data(){
      return {
        classType: 103,
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
      async getDataList(page){
        try {
          let hyRes = await StoreApi.getGoodsList();
          if (!hyRes||!hyRes.data||hyRes.data.length<=0) {
            this.createOrder()
            return;
          }
          let theatreRes = await TheatreApi.getGoodsList(this.classType);
          if (!theatreRes||!theatreRes.data||theatreRes.data.length<=0) {
            this.createOrder()
            return;
          }
          this.dataList = [];
          theatreRes.data.forEach(goods => {
            hyRes.data.forEach(hyGoods => {
              if (hyGoods.goodsId == goods.hyGoodsId) {
                hyGoods.num = 0;
                this.dataList.push(hyGoods)
              }
            })
          })
          if (this.dataList.length <= 0) {
            this.createOrder()
            return;
          }
          let res = {
            data: this.dataList,
            page: {
              number: 0, size: this.dataList.length, totalElements: this.dataList.length, totalPages: 1
            }
          }
          return res
        } catch(e) {
          this.createOrder()
        }
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
      display:inline-block;
      min-width:27px;
      min-height:22px;
      right: 10px;
    }
  }
</style>

