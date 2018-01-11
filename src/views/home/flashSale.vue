<template>
  <page headerTitle="限时抢券" flex-box="1">
    <div slot="contain" class="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown :usePullup="false"
                     :height="'-46'">
        <div class="flash">
          <coupon-item v-for="(item,index) in dataList" :key="index" @click.native="listItemClick(item,index)">
            <label class="leftTitle text-ellipsis-line" slot="right">{{item.packageName}}</label>
            <label class="leftInfo text-ellipsis-line" slot="right">{{item.converKnows}}</label>
            <label class="rightTitle" slot="left">立即抢</label>
            <label class="rightTip" slot="left">剩余{{item.stock}}份</label>
          </coupon-item>
        </div>
      </page-scroller>
    </div>
    <div slot="footer">
      <div class="see-coupon" flex="cross:center main:center" @click="$router.push('CouponList')">
        <img :src="require('assets/images/home/see_card.png')" class="see-coupon-img"></div>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CouponItem from 'views/components/couponList/item.vue'
  import StoreApi from 'api/storeApi'
  import TheatreApi from 'api/theatreApi'
  import {mapState} from "vuex";
  export default {
    components: {PageScroller, CouponItem},
    data(){
      return {
        dataList: []
      }
    },
    computed:{
      ...mapState('common',['userInfo'])
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
      listItemClick(item,index) {
        this.bindingTicket(item,index)
      },
      async bindingTicket(item,index){
        this.$vux.loading.show({
          text:'正在抢购'
        });
        let res;
        try{
           res = await StoreApi.createComboOrder(this.userInfo.bindmobile, `${item.hyPackageId}:1`);
        }catch (e){
          this.$util.showRequestErro(e)
        }
        if (res && res.data) {
            let payRes = await StoreApi.payPackage('account', res.data.packageId);
            if (payRes && payRes.status === 0) {
              this.$vux.toast.show({
                text:'抢购成功',
                type:'success'
              });
              this.$set(this.dataList,index,{...item,stock:--item.stock});
              TheatreApi.getPackageList(202);
            }
        }
        this.$vux.loading.hide();
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "~style/base-variables";

  .see-coupon {
    height: 50px;
  }

  .see-coupon-img {
    width: 215px;
    height: 30px;
    margin: 0 auto;
  }

  .coupon-list {
    padding-top: 15px;
  }

  .flash {
    padding-top: 1px;
  }

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
