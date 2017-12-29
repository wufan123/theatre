<template>
  <page :headerTitle="`限时抢`" flex-box="1">
    <div slot="contain" class="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage usePulldown
                     :height="'-46'">
        <div class="flash">
          <coupon-item v-for="(item,index) in dataList" :key="index" @click.native="listItemClick(item)">
          <label class="leftTitle" slot="right">￥{{item.price}}</label>
          <label class="leftInfo" slot="right">{{item.packageName}}</label>
          <label class="rightTitle" slot="left">立即抢</label>
          <label class="rightTip" slot="left">剩余{{item.stock}}份</label>
        </coupon-item>
        </div>
      </page-scroller>
    </div>
    <div slot="footer">
        <div class="see-coupon" flex="cross:center main:center">
          <img :src="require('assets/images/home/see_card.png')" class="see-coupon-img" ></div>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CouponItem from 'views/components/couponList/item.vue'
  import StoreApi from 'api/storeApi'
  import TheatreApi from 'api/theatreApi'
  export default {
    components: {PageScroller, CouponItem},
    data(){
      return {
        dataList: []
      }
    },
    methods: {
      getDataList(){
        return TheatreApi.getPackageList(202).then(success => {
            this.dataList = success.data;
            let res = {
              data: success.data,
              page: {
                number: 0, size: success.data.length, totalElements: success.data.length, totalPages: 1
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
      },
      listItemClick(item) {
            this.bindingTicket(item)
      },
      async bindingTicket(item){
          let res = await StoreApi.createComboOrder(this.$store.state.common.userInfo.bindmobile,`${item.hyPackageId}:1`);
          if(res&&res.data){

          }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .see-coupon{height: 50px;}
  .see-coupon-img{width: 215px;height: 30px;margin: 0 auto;}
  .coupon-list {
    padding-top: 15px;
  }
  .flash{padding-top: 20px;}
  .rightTitle {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }

  .rightTip {
    font-size: 9px;
  }

  .leftTitle {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    color: @color-primary2;
  }

  .leftInfo {
    font-size: 12px;
    color: @font-color;
  }
</style>
