<template>
  <page :headerTitle="`福州特产`" >
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-46' >
        <div v-for="(itemp,index) in dataList" class="ticket-card" @click="orderDetail(itemp)">
          <list twoLine >
            <list-item v-for="(item,index) in itemp.details" :key="index" :img="item.goodsImg"
            :contentTitle="item.goodsName"   extra=""  >
            <div slot="contentBrief">
              <!-- <p>12 月 3 日 10：00</p> -->
              <p flex="main:justify"> <label>数量：</label> <label>{{item.number}}张</label> </p>
            </div>
              </list-item>
          </list>
          <div class="flexb">
            <label>总价：{{itemp.price}}元</label>
            <label v-if="itemp.status==0">未支付</label>
            <label v-if="itemp.status==1">已支付</label>
            <label v-if="itemp.status==3">已退货</label>
            <label v-if="itemp.status==6">已取消</label>
            <label v-if="itemp.status==10">已打印</label>
            <label v-if="itemp.status==11">已验证</label>
          </div>
        </div>
        </page-scroller>
    </div>
  </page>
</template>
<script>
import PageScroller from "views/components/pageScroller.vue";
import orderApi from "api/orderApi";
import { List, ListItem } from "views/components/settingList";

export default {
  components: { PageScroller, List, ListItem },
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    getDataList(page) {
      return orderApi.getGoodsOrders(page).then(
        success => {
          console.log(success);
          this.dataList = success.data;
          let res = {
            data: success.data,
            page: {
              number: 0,
              size: success.data.length,
              totalElements: success.data.length,
              totalPages: 1
            }
          };
          return res;
        },
        error => {
          console.log(success);
        }
      );
    },
    orderDetail(order){
      console.log('order',order)
      this.$router.push({name:'LocalProductDetail',query:{id:order.orderNo}})
    },
    fetchData() {
      return this.$refs.scroller.reset();
    }
  }
};
</script>
<style lang="less">

</style>

