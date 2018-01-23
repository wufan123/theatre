<template>
  <page :headerTitle="`场次票`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown height='-46'>
        <div v-for="(item,index) in dataList" class="ticket-card" @click="orderDetail(item)">
          <list twoLine>
            <list-item :img="item.filmImg"
                       :contentTitle="item.filmName" extra="">
              <div slot="contentBrief">
                <!-- <p>12 月 3 日 10：00</p> -->
                <p flex="main:justify"><label>数量</label><label>{{item.seatCount}}份</label></p>
              </div>
            </list-item>
          </list>
          <div class="flexb" flex="main:justify">
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
  import {List, ListItem} from "views/components/settingList";

  export default {
    components: {PageScroller, List, ListItem},
    data() {
      return {
        dataList: []
      };
    },
    methods: {
      async getDataList(page) {
        let res;
        try {
          res = await orderApi.getAllMoiveOrder('', page);
        } catch (e) {
            this.$util.showRequestErro(e)
        }
        if (res && res.data) {
          if (page>1) {
            this.dataList = this.dataList.concat(res.data);
          } else {
            this.dataList = res.data;
          }
          res = {
            data: this.dataList,
            page: {
              number: page,
              totalElements: this.dataList.length
            }
          }
        }
        this.$vux.loading.hide();
        return res;
      },
      orderDetail(order){
        this.$store.commit('business/setSelectedTicketOrder', order)
        this.$router.push({name: 'TicketDetail', query: {id: order.orderCode, status: order.status}})
      },
      fetchData() {
        this.$vux.loading.show();
        let ct =this;
        setTimeout(()=>{//优化体验，查看列表时超过3秒隐藏loading
          ct.$vux.loading.hide();
        },3000);
        return this.$refs.scroller.reset();
      }
    }
  };
</script>
<style lang="less">

</style>

