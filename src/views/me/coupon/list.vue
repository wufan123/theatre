<template>
  <page :headerTitle="`优惠券`" flex-box="1" :white="true">
    <img src="../../../assets/images/scan.png" @click="Scan" slot="rightTop" class="icon"/>
    <div slot="contain">
      <div flex="dir:top">
        <div flex-box="0" flex="dir:left cross:center " class="topBar">
          <div class="inputOut">
            <x-input v-model="value" placeholder="请输入优惠券码"></x-input>
          </div>
          <div class="s-button khaki" @click="addCoupon">添加</div>
        </div>
        <div flex-box="1">
          <page-scroller  :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown
                         :usePullup="false"
                         height='-110'>
            <coupon-item v-for="(item,index) in canUseList" :key="index" @click.native="gotoCouponDetail(item)">
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <label class="leftInfo" slot="right">有效期:{{new Date(item.startTime * 1000).format("yyyy-MM-dd")}}至{{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">{{item._voucherValue}}</label>
            </coupon-item>

            <div flex="flex:left main:center" @click="seeExpireCoupon">
              <img v-if="!isSeeExpire" :src="require('assets/images/me/coupon_lost.png')" class="couponLost">
              <p class="mb20 f16" v-if="isSeeExpire">已失效的券</p>
            </div>
            <coupon-item v-if="isSeeExpire" v-for="(item,index) in invalidList" :key="index+'valli'"
                         :disabled="item.stock"
                         @click.native="gotoCouponDetail(item)">
              <label class="leftTitle" slot="right">{{item.voucherName}}</label>
              <div slot="right">
                <label v-if="item.status==1" class="is-tip">未销售</label>
                <label v-else-if="item.status==2" class="is-tip" v-text="item.validData-(parseInt(new Date().getTime()/1000))>0?`已销售`:`已过期`" >已销售</label>
                <label v-else-if="item.status==3" class="is-tip">已使用</label>
                <label v-else-if="item.status==5" class="is-tip">锁定</label>
                <label v-else class="is-tip">已作废</label>
              </div>
              <label class="leftInfo" slot="right">有效期 {{new Date(item.validData * 1000).format("yyyy-MM-dd")}}</label>
              <label class="rightTitle" slot="left">{{item._voucherValue}}</label>
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
      Scan(){
        var _this = this;
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    _this.value = result;
                    _this.addCoupon()
                    //其它网页调用二维码扫描结果：
                    //var result=sessionStorage.getItem('saomiao_result');
                }
            });
      },
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
           console.log('res', page == 1, page)
           if(page==1){
             this.dataList= res.data.voucherList
             this.canUseList=[]
             this.invalidList=[]
           }else{
             this.dataList= this.dataList.concat(res.data.voucherList)
           }
          res.data.voucherList.forEach(item => {
            if (item.bindStatus == 1) {
              // this.dataList.push(item)
              if (item.status == 2 && (new Date().getTime() / 1000 < item.validData)) {
                this.canUseList.push(item)
              } else {
                item.stock = true
                this.invalidList.push(item)
              }
              item._voucherValue = item.voucherType == 0?'兑换券':`￥${item.voucherValue}`;
            }
          });
          res.page={
            number: page, size: 100, totalElements: res.data.totalNum, allElementss: res.data.voucherNumber
          }
           if (!this.$util.isEmptyObject(res.data.voucherList)) {
             page += 1
             that.getDataList(page)
           }
        }
        this.$vux.loading.hide();
        return res
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
          this.value = ''
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
  .is-tip{position: absolute;right: 15px;padding: 2px 8px;top: 35px; font-size: 12px; background: #a40000;border-radius: 10px;text-align: center;color: #ffffff;}
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
    white-space: nowrap;
    font-size: 16px;
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
