<template>
  <page :headerTitle="`优惠券`" flex-box="1" :white="true">
    <!--<img src="../../../assets/images/scan.png" slot="rightTop" class="icon"/>-->
    <div slot="contain">
      <div flex="dir:top">
        <div flex-box="0" flex="dir:left cross:center " class="topBar">
          <div class="inputOut">
            <x-input v-model="value" placeholder="请输入优惠券码"></x-input>
          </div>
          <div class="s-button khaki" @click="addCoupon">添加</div>
        </div>
        <div flex-box="1">
          <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown
                         :usePullup="false"
                         height='-110'>
            <coupon-item v-for="(item,index) in canUseList" :key="index" @click.native="gotoCouponDetail(item)">
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
            </coupon-item>

            <div flex="flex:left main:center" @click="seeExpireCoupon">
              <img v-if="!isSeeExpire" :src="require('assets/images/me/coupon_lost.png')" class="couponLost">
              <p class="mb20 f16" v-if="isSeeExpire">已失效的券</p>
            </div>
            <coupon-item v-if="isSeeExpire" v-for="(item,index) in invalidList" :key="index+'valli'"
                         :disabled="item.stock"
                         @click.native="gotoCouponDetail(item)">
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <label slot="right" v-if="item.status==3" class="is-tip">已使用</label>
              <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">￥{{item.voucherValue}}</label>
            </coupon-item>

          </page-scroller>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CouponItem from 'views/components/couponList/item.vue'
  import {XInput, XButton} from 'vux'
  import CouponApi from 'api/couponApi'
  export default {
    components: {XInput, XButton, PageScroller, CouponItem},
    data(){
      return {
        value: '',
        isSeeExpire: false,
        canUseList: [],
        invalidList: [],
        dataList: []
      }
    },
    methods: {
      async  getDataList(page){
        var that = this
        page = page == 0 ? 1 : page;
        let res;
        try{
          res = await  CouponApi.userVoucherList(page, 0);
        }catch (e){
          this.$util.showRequestErro(e);
        }
        if (res && res.data) {
          // page == 1 ? this.dataList= res.data.voucherList : this.dataList= this.dataList.concat(res.data.voucherList)
          res.data.voucherList.forEach(item => {
            if (item.bindStatus == 1) {
              this.dataList.push(item)
              if (item.status == 2 && (new Date().getTime() / 1000 < item.validData)) {
                this.canUseList.push(item)
              } else {
                item.stock = true
                this.invalidList.push(item)
              }
            }
          });

          if (!this.$util.isEmptyObject(res.data.voucherList)) {
            page += 1
            that.getDataList(page)
          }
        }
        this.$vux.loading.hide();
        return {
          page: {
            number: res.data.voucherNumber, size: 100, totalElements: res.data.totalNum, totalPages: 1
          }
        }
      },
      gotoCouponDetail(item){
        this.$store.commit("coupon/setCoupon", item);
        this.$router.push({path: 'CouponDetail'});
      },
      fetchData(){
        this.$vux.loading.show();
        let ct =this;
        setTimeout(()=>{//优化体验，查看列表时超过3秒隐藏loading
          ct.$vux.loading.hide();
        },3000);
        return this.$refs.scroller.reset()
      },
      seeExpireCoupon(){
        this.isSeeExpire = !this.isSeeExpire
      },
      async addCoupon(){
        if (!this.value) {
          this.$vux.toast.text("请输入优惠券码");
          return;
        }
        this.$vux.loading.show({
          text: '正在添加'
        });
        let res;
        try {
          res = await CouponApi.addVoucher(this.value);
        } catch (e) {
          this.$util.showRequestErro(e)
        }
        if (res && res.status === 0) {
          this.$vux.toast.show({
            text: '绑定成功',
            type: 'success'
          });
          this.fetchData();
        }
        this.$vux.loading.hide();
      }
    }


  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";

  .topBar {
    padding: 15px 15px 10px;
    justify-content: space-between;
    .s-button {
      padding: 6px 15px;
    }
    .inputOut {
      padding-bottom: 2px;
      border: solid @color-active 1px;
      font-size: 14px;
      height: 30px;
      width: 275px;
      .weui-cell {
        padding: 5px 11px;
      }
    }
  }

  .couponLost {
    height: 31px;
    margin-bottom: 10px;
  }

  .icon {
    height: 22px;
    width: 22px;
  }

  .rightTitle {
    font-size: 20px;
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
    color: @color-sub;
  }

  .leftInfo {
    font-size: 12px;
    color: @font-color;
  }
</style>
