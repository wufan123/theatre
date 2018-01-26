<template>
  <page :headerTitle="`组合购`">
    <div slot="contain" class="package">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown height='-46' :usePullup="false">
        <div v-for="(itemp,index) in dataList" :key="index" >
          <div v-for="(item,indexp) in itemp.data" :key="indexp" class="ticket-card" @click="Detail(itemp)">
            <list twoLine :title="item.name">
              <list-item v-for="(itemc,indexc) in item.detail" :img="itemc.img" :key="indexc"
                         :contentTitle="itemc.name" extra="">
                <div slot="contentBrief">
                  <!-- <p>12 月 3 日 10：00</p> -->
                  <p flex="main:justify"><label>数量</label> <label v-if="itemc.type==1">{{itemc.number}}张</label><label v-else>{{itemc.number}}份</label></p>
                  <!-- <p>{{itemc.exstatus==1?'已兑换':`兑换期限至: ${new Date(itemc.endTime*1000).format('yyyy-MM-dd hh:mm:ss')}`}}</p> -->
                </div>
              </list-item>
            </list>
            <div class="flexb" flex="main:justify">
              <label>总价：{{itemp.price}}元</label>
              <label v-if="itemp.status==0">未支付</label>
              <label v-else-if="itemp.status==1">已支付</label>
              <label v-else-if="itemp.status==5">超时</label>
              <label v-else-if="itemp.status==6">取消</label>
              <label v-else-if="itemp.status==7">订单退货</label>
              <label  v-else></label>
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
        let arr=[]
        try {
          res = await orderApi.getPackageOrders()
        } catch (e) {
          this.$util.showRequestErro(e)
        }
        if (res && res.data) {
          res.data=res.data.filter((item,index)=>{
            return item.price>0
          })
          if (page>1) {
            this.dataList = this.dataList.concat(res.data);
          } else {
            this.dataList =res.data;
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
      Detail(order){
        this.$store.commit('business/setSelectedPackageOrder', order)
        this.$router.push({name: 'PackageOrderDetail'})
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
  .package .am-list .am-list-header {
    padding: 5px 0;
    border-bottom: 1px dashed #ded5c7;
    font-size: 14px;
  }
</style>

