<template>
  <page :headerTitle="`推广记录`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown height='-46'>
        <div v-for="(item,index) in dataList" class="ticket-card" @click="orderDetail(item)">
          <list twoLine>
            <list-item
                       :contentTitle="item.toer" extra="">
              <div slot="contentBrief">
                <!-- <p>12 月 3 日 10：00</p> -->
                <p flex="main:justify"><label>时间</label><label>{{item.successTime}}</label></p>
              </div>
            </list-item>
          </list>
          <div class="flexb">
            <label>编码：{{item.sn}}</label>
            <label v-if="item.status==0"></label>
            <label v-if="item.status==1">创建推广</label>
            <label v-if="item.status==2">推广完成</label>
            <label v-if="item.status==3">推广成功</label>
          </div>
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from "views/components/pageScroller.vue";
  import theatreApi from "api/theatreApi";
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
          res = await theatreApi.getPromotionList('13645017650');
        } catch (e) {
            this.$util.showRequestErro(e)
        }
        if (res && res.data.content) {
          if (page) {
            this.dataList = this.dataList.concat(res.data.content);
          } else {
            this.dataList = res.data.content;
          }
          res = {
            data: this.dataList,
            page: {
              number: page,
              size: 10,
              totalElements: this.dataList.length,
              totalPages: res.data.content.length > 0 ? page + 3 : page + 1
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

