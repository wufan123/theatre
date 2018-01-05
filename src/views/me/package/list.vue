<template>
  <page :headerTitle="`套票`" >
    <div slot="contain" class="package">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-46' >
        <div v-for="(itemp,index) in dataList" :key="index" >
          <div v-for="(item,indexp) in itemp.data" :key="indexp" class="ticket-card" @click="Detail(itemp)" >
            <list twoLine :title="item.name" >
              <list-item v-for="(itemc,indexc) in item.detail" :img="itemc.img" :key="indexc"
              :contentTitle="itemc.name"   extra=""  >
              <div slot="contentBrief">
                <!-- <p>12 月 3 日 10：00</p> -->
                <p flex="main:justify"> <label>数量：</label> <label>{{itemc.number}}张</label> </p>
              </div>
                </list-item>
            </list>
            <div class="flexb">
              <label>总价：{{itemp.price}}元</label>
              <label v-if="itemp.status==0">未支付</label>
              <label v-if="itemp.status==1">已支付</label>
              <label v-if="itemp.status==5">超时</label>
              <label v-if="itemp.status==6">取消</label>
              <label v-if="itemp.status==7">订单退货</label>
            </div>
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
      return orderApi.getPackageOrders().then(
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
    Detail(order){
      this.$store.commit('business/setSelectedPackageOrder',order)
      this.$router.push({name:'PackageOrderDetail'})
    },
    fetchData() {
      return this.$refs.scroller.reset();
    }
  }
};
</script>
<style lang="less">
.package .am-list .am-list-header{padding:5px 0;border-bottom:1px dashed #ded5c7;font-size:14px;}
</style>

