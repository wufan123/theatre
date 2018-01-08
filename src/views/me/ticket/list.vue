<template>
  <page :headerTitle="`场次票`" >
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage  usePulldown height='-46' >
        <div v-for="(item,index) in dataList" class="ticket-card" @click="orderDetail(item)">
          <list twoLine >
            <list-item :img="item.filmImg"
            :contentTitle="item.filmName"   extra=""  >
            <div slot="contentBrief">
              <!-- <p>12 月 3 日 10：00</p> -->
              <p flex="main:justify" > <label>数量</label><label>{{item.seatCount}}张</label> </p>
            </div>
              </list-item>
          </list>
          <div class="flexb">
            <label>总价：{{item.orderPrice}}元</label>
            <label v-if="item.status==0">未支付</label>
            <label v-if="item.status==3">已完成</label>
            <label v-if="item.status==6">已取消</label>
            <label v-if="item.status==9">已退票</label>
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
      return orderApi.getAllMoiveOrder( '',page).then(
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
      console.log('setSelectedTicketOrder',order)
      this.$store.commit('business/setSelectedTicketOrder',order)
      this.$router.push({name:'TicketDetail',query:{id:order.orderCode,status:order.status}})
    },
    fetchData() {
      return this.$refs.scroller.reset();
    }
  }
};
</script>
<style lang="less">

</style>

