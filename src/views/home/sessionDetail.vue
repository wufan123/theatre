<template>
  <div>
    <page headerTitle="场次票" flex-box="1" :footerText="`马上购买`" :footerFunc="goToBuy" >
      <div slot="contain">
        <div class="imgOut">
          <img :src="filmDetail&&filmDetail.image"/>
        </div>
        <div class="mainOut">
          <div class="mainBody" flex="dir:top cross:center">
            <div  class="titleBar">
              <div flex="dir:top" flex-box="1">
                <label class="title text-ellipsis-line">
                  {{filmDetail == null ? '坊巷文化影音秀' : filmDetail.filmName}}</label>
                <label class='des text-ellipsis-line'>
                  {{filmDetail == null ? '坊巷文化影音秀' : filmDetail.simpleword}}</label>
              </div>
              <div flex="dir:top " flex-box="0">
                <label class="price">￥{{filmPrice}}</label>
                <!-- <label class="des">满200立减30元</label> -->
              </div>
            </div>
            <div flex="main:center cross:center" class="divider">
              <label class="dividerTitle">
                剧场介绍
              </label>
              <!-- <div class="dividerLine"></div> -->
            </div>
            <div class="content">
              {{filmDetail ? filmDetail.introduction : ''}}
            </div>
          </div>
            <div class="h10"></div>
        </div>
        <!-- <x-button class="no-radius bottomBtn" type="primary" @click.native="show=true">马上购买</x-button> -->
      </div>
    </page>
    <popup v-model="show" position="bottom">
      <div class="popBottom" flex="dir:top">
        <div flex="dir:top" class="body">
          <label class="title">时间</label>
          <scroll-view slot="main" style="border:1px solid red">
          <checker v-model="timeCheck" default-item-class="check-item"  selected-item-class="check-item-selected"
                   class="checker" radio-required style="border:1px solid blue">
            <checker-item :value="filmTime" v-for="(filmTime, index) in filmTimeList" :key="index"
                          @on-item-click="changeTime">{{timeFormat(filmTime)}}
            </checker-item>
          </checker>
          </scroll-view>
          <label class="title">场次</label>
          <scroll-view slot="main">
          <checker v-model="planCheck" default-item-class="check-item" selected-item-class="check-item-selected"
                   class="checker" radio-required>
            <checker-item :value="filmPlan" v-for="(filmPlan, index) in filmPlanList" :key="index"
                          @on-item-click="changePlan">{{filmPlan.startTime}}
            </checker-item>
          </checker>
          </scroll-view>
          <div class="numItem">
            <x-number title="购买数量" :min="1" :max="maxPurchase" v-model="ticketCount"></x-number>
          </div>
        </div>
        <div class="btn" @click="createOrder">
          确认
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import PageScroller from "views/components/pageScroller.vue";
import ScrollView from "views/components/simpleScrollView.vue";
import { Popup, Checker, CheckerItem, XNumber } from "vux";
import FilmApi from "api/filmApi";
import PlanApi from "api/planApi";
import OrderApi from "api/orderApi";
import theatreApi from "api/theatreApi";
import {mapState} from "vuex";
export default {
  props: ["isHermes"],
  components: {
    PageScroller,
    Popup,
    Checker,
    CheckerItem,
    XNumber,
    ScrollView
  },
  data() {
    return {
      show: false,
      timeCheck: null,
      planCheck: null,
      ticketCount: 1,
      filmDetail: null,
      filmPrice: "-",
      filmTimeList: [],
      filmPlanList: [],
      seatList: [], // 选中排期座位详情
      maxPurchase: 4, // 最大购票数量
    };
  },
  computed:{
    ...mapState("common",['userInfo'])
  },
  methods: {
    goToBuy(){
      this.show=true
    },
    async fetchData() {
      this.loadFilmTime();
      theatreApi.getMiscConfig('ticket_max_purchase').then(res=>{
        if (res.data && res.data.length > 0) {
          this.maxPurchase = Number(res.data[0].miscVal)
        }
      },error => { console.log(error); })
    },
    // 选择日期
    changeTime: function(itemValue, itemDisabled) {
      if (itemValue.time != this.timeCheck.time) {
        this.loadFilmPlan(itemValue.time);
      }
    },
    // 选择排期
    changePlan: function(itemValue, itemDisabled) {
      if (itemValue.featureAppNo != this.planCheck.featureAppNo) {
        this.loadSeat(itemValue.featureAppNo);
      }
    },
    timeFormat(time) {
      return time.instr + " " + new Date(time.startTime * 1000).format("MM.dd")
    },
    // 加载失败提示
    toastLoadFilmError(msg) {
      this.$vux.loading.hide();
      this.$vux.toast.show({
        type: "cancel",
        text: msg
      });
    },
    // 加载营业日期
    loadFilmTime: function() {
      this.$vux.loading.show({
        text: "加载中"
      });
      let params = {};
      PlanApi.getTimes(params).then(
        success => {
          this.filmTimeList = success.data;
          if (this.filmTimeList.length > 0) {
            this.timeCheck = this.filmTimeList[0];
            this.loadFilmPlan(this.filmTimeList[0].time);
          } else {
            this.toastLoadFilmError("加载失败");
          }
        },
        error => {
          this.toastLoadFilmError("加载失败");
        }
      );
    },
    // 加载营业日排期
    loadFilmPlan: function(time) {
      this.$vux.loading.show({
        text: "加载中"
      });
      let params = {
        time: time
      };
      PlanApi.getPlans(params).then(
        success => {
          console.log(success);
          if (success.data && success.data.length > 0) {
            // 获取影片详情
            if (!this.filmDetail) {
              this.loadFilmDetail(success.data[0].filmId);
            }
            this.filmPlanList = success.data[0].planInfo;
            this.filmPrice = this.filmPlanList[0].standardPrice; // 取价格
            this.planCheck = this.filmPlanList[0];
            this.loadSeat(this.planCheck.featureAppNo);
          } else {
            this.toastLoadFilmError("加载失败");
          }
        },
        error => {
          this.toastLoadFilmError("加载失败");
        }
      );
    },
    // 加载影片详情
    loadFilmDetail: function(filmId) {
      this.$vux.loading.show({
        text: "加载影片"
      });
      FilmApi.getFilmDetail(filmId).then(
        success => {
          let filmDetail = success.data;
          filmDetail.introduction = filmDetail.introduction
            .replace("&lt;html&gt;&lt;body&gt;", "")
            .replace("&lt;/body&gt;&lt;/html&gt;", "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/\<br\s*\/\>/g, "\r\n");
          this.filmDetail = filmDetail;
        },
        error => {
          this.toastLoadFilmError("影片加载失败");
        }
      );
    },
    // 加载座位信息
    loadSeat: function(featureAppNo) {
      this.$vux.loading.show({
        text: "加载座位"
      });
      FilmApi.getSeat(featureAppNo).then(
        success => {
          this.$vux.loading.hide();
          this.checkHasOrder(success.data);
          if (success.data.seatinfos) {
            this.seatList = success.data.seatinfos.seat;
          }
        },
        error => {
          this.toastLoadFilmError("座位加载失败");
        }
      );
    },
    // 检查是否有未完成订单
    checkHasOrder: function(data) {
      if (data.hasOrder) {
        // TODO 提示有未付订单
        let context = this;
        this.$vux.confirm.show({
          title: "温馨提示",
          content: "存在未付款影票订单",
          confirmText: "支付订单",
          cancelText: "取消订单",
          onCancel() {
            // 关闭订单
            OrderApi.cancelOrder(data.hasOrder).then(
              success => {},
              error => {
                this.$vux.toast.show({
                  type: "cancel",
                  text: "订单取消失败"
                });
              }
            );
          },
          onConfirm() {

            context.$router.push({
              path: "/ConfirmOrder?orderId=" + data.hasOrder
            });
          }
        });
      }
    },
    async createOrder() {
      if (!this.seatList || this.seatList.length == 0) {
        this.$vux.toast.show({
          type: "cancel",
          text: "座位加载失败"
        });
        return;
      }
      let seat = [];
      this.seatList.forEach(row => {
        row.forEach(col => {
          if (col.SeatState == 0) {
            seat.push(col);
          }
        });
      });
      if (seat.length == 0) {
        this.$vux.toast.show({
          type: "cancel",
          text: "已售罄"
        });
        return;
      }
      if (seat.length < this.ticketCount) {
        this.$vux.toast.show({
          type: "cancel",
          text: "余票不足"
        });
        return;
      }

      let selectedSeat = seat.slice(0, this.ticketCount);
      let seatIntroduce = [],
        seatInfo = [];
      selectedSeat.forEach(e => {
        seatIntroduce.push(e.SeatRow + "排" + e.SeatCol + "座");
        seatInfo.push({ seatNo: e.SeatNo, seatPieceNo: e.seatPieceNo });
      });
      this.$vux.loading.show({
        text: "锁座中"
      });
      let res;
      try{
          res = await OrderApi.setPlanAndGoodsOrder(
            this.planCheck.featureAppNo,
            seatIntroduce.join(","),
            this.userInfo.bindmobile,
            JSON.stringify(seatInfo)
          )
      }
      catch (e)
      {
          this.$util.showRequestErro(e);
      }
      if(res&&res.data){
        this.$router.push({
          path: "Snack",
          query: { orderId: res.data.planOrderId }
        });
        this.$store.commit("coupon/setTicketCouponList", []);
        this.$store.commit("coupon/setGoodsCouponList", []);
        this.$store.commit('business/setSelectedMember',{});
      }
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>
@import "~style/base-variables";

.checker {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 15px;
}

.popBottom {
  background: url(../../assets/images/page_bg.png);
  .title {
    font-size: 16px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .body {
    background: rgba(255, 251, 244, 0.5);
  }
  .btn {
    font-size: 16px;
    text-align: center;
    line-height: 45px;
  }
  .numItem {
    margin-top:10px;
    border-top: solid @border-color 1px;
    padding-top: 10px;
    font-size: 16px;
  }
}

.bottomBtn {
  position: fixed;
  bottom: 0;
}

.imgOut{
  width: 100%;
  height: 200px;
  img{
    height: 211px;
    width: 100%;
  }
}

.titleTag {
  background-color: gray;
  color: white;
  padding: 5px 15px;
  margin-top: 10px;
}

.mainOut{
  position: relative;
  width: 100%;
  .mainBody {
    background-color: @page_bg2;
    margin: -20px 15px 20px;
    padding: 20px;
    border-radius: 5px;

    .content {
      margin-top: 10px;
      text-indent: 2em;
      text-align: left;
      width: 100%;
    }
    .divider {
      overflow: hidden;
      position: relative;
      width: 100%;
      margin-top: 10px;
      background: @page_bg2 url(../../assets/images/home/divider_line.png) center repeat-x;
      background-size: 18px 34px;
    }
    .dividerTitle {
      background: @page_bg2 url(../../assets/images/home/title_bg.png) center
      no-repeat;
      background-size: 100%100%;
      position: relative;
      z-index: 3;
      width: 128px;
      height: 34px;
      color: @color-sub;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 34px;
      margin: 10px 0px;
    }
    .titleBar {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .title {
        font-size: 16px;
      }
      .des {
        font-size: 11px;
        margin-top:5px;
        color:@font-color2
      }
      .price {
        line-height: 25px;
        color: @color-sub;
        font-size: 21px;
      }
    }
  }
}

</style>
