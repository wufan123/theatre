<template>
  <page :headerTitle="`福州特产`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown height='-46'>
        <div v-for="(itemp,index) in dataList" class="ticket-card" @click="orderDetail(itemp)">
          <list twoLine>
            <list-item v-for="(item,index) in itemp.details" :key="index" :img="item.goodsImg"
                       :contentTitle="item.goodsName" extra="">
              <div slot="contentBrief">
                <!-- <p>12 月 3 日 10：00</p> -->
                <p flex="main:justify"><label>数量</label> <label>{{item.number}}份</label></p>
              </div>
            </list-item>
          </list>
          <div class="flexb">
            <label>总价：{{itemp.price}}元</label>
            <label v-if="itemp.status==0">未支付</label>
            <label v-else-if="itemp.status==1">已支付</label>
            <label v-else-if="itemp.status==3">已退货</label>
            <label v-else-if="itemp.status==6">已取消</label>
            <label v-else-if="itemp.status==10">已打印</label>
            <label v-else-if="itemp.status==11">已验证</label>
            <label  v-else>{{item.exstatus==1?'已兑换':`兑换期限至: ${new Date(item.endTime*1000).format('yyyy年MM月dd日 hh:mm:ss')}`}}</label>
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
        try{
            res = await orderApi.getGoodsOrders(page);
        }catch (e){
            this.$util.showRequestErro(e)
        }
        if(res&&res.data){
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
          };
        }
        this.$vux.loading.hide();
        return res;

      },
      orderDetail(order){
        this.$router.push({name: 'LocalProductDetail', query: {id: order.orderNo}})
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

