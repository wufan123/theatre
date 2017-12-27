<template>
  <div>
    <page :headerTitle="`来点小吃`" flex-box="1" :white="true">
      <div slot="contain">
        <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage usePulldown
                       height='-48'>
          <good-item v-for="(item,index) in dataList" :key="item.goodsId" :goodsName="item.goodsName"
                     :channelFee="item.showPrice" :goodsCoverImage="item.goodsImg" class="snackItem">

            <!--<x-number v-show="item.num>0" :value="item.num" :min="0"   ></x-number>-->
            <item-number :item="{num:item.num,index:index}" @onChange="change"></item-number>
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
  import {XNumber} from 'vux'
  import ItemNumber from 'views/components/itemNumber.vue'
  export default {
    components: {PageScroller, XNumber, GoodItem, ItemNumber},
    data(){
      return {
        value: 0,
        dataList: [],
        numList: [],
        orderId: this.$route.query.orderId,
        bottomTitle: '不选了，直接下单',
      }
    },
    methods: {
      getDataList(page){
        return StoreApi.getGoodsList().then(success => {
          this.dataList = success.data
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
            return i.num*i.showPrice
        }).reduce((acc,i)=>{
            acc+=i;
            return acc
        });
            this.bottomTitle =sum? `下一步（卖品总计 ￥${sum}）`:'不选了，直接下单购票';
      },
      createOrder() {
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
        let mobilePhone = this.$store.state.common.userInfo.bindmobile
        if (!mobilePhone) {
          this.$vux.toast.show({
            type: 'cancel',
            text: '获取用户信息失败'
          })
          return;
        }
        this.$vux.loading.show({
          text: '下单中'
        })
        StoreApi.createGoodsFilmOrder(mobilePhone, goodsStr, this.orderId).then(success => {
          StoreApi.mergeOrder(this.orderId, success.data, mobilePhone).then(success => {
            this.$vux.loading.hide()
            this.$router.push({path: 'ConfirmOrder?orderId=' + this.orderId})
          }, error => {
            this.$vux.loading.hide()
          })
        }, error => {
          this.$vux.loading.hide()
        })
      }
    }
  }
</script>
<style lang="less">
  @import "~style/base-variables";

  .snackItem {
    position: relative;
    .vux-number-selector {
      border: solid @color-active 1px !important;
    }
    .vux-number-input {
      background: @color-sub !important;
      color: white;
    }
    .num {
      .weui-cell {
        padding: 0 !important;
      }
      position: absolute;
      bottom: 30px;
      right: 10px;
    }
  }
</style>

