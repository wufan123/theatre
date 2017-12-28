<template>
  <page :headerTitle="`场次票`" >
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-46' >
        <div v-for="(item,index) in dataList" class="ticket-card" @click="$router.push('TicketDetail')">
          <list twoLine >
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
            :contentTitle="`坊巷文化影音秀`"   extra=""  >
            <div slot="contentBrief">
              <p>12 月 3 日 10：00</p>
              <p>1张</p>
            </div>
              </list-item>
          </list>
          <div class="flexb">
            <label>总价：198元</label>
            <label>支付完成</label>
          </div>
        </div>
        </page-scroller>
    </div>
  </page>
</template>
<script>
import PageScroller from "views/components/pageScroller.vue";
import TheatreApi from "api/theatreApi";
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
      return TheatreApi.getPackageList(202).then(
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
    fetchData() {
      return this.$refs.scroller.reset();
    }
  }
};
</script>
<style lang="less">

</style>

