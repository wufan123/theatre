<template>
  <div>
    <page headerTitle="场次票" flex-box="1">
      <div v-transfer-dom>
        <popup v-model="show" height="100%" position="bottom">
          <div>
            123456
          </div>
        </popup>
      </div>
      <div slot="contain">
        <div class="goodPhoto">
          <img src=""/>
        </div>
        <div class="mainBody" flex="dir:top cross:center">
          <div flex="dir:left cross:center" class="titleBar">
            <div flex="dir:top">
              <label class="title">
                {{filmDetail == null ? '坊巷文化影音秀' : filmDetail.filmName}}</label>
              <label class='des'>
                {{filmDetail == null ? '坊巷文化影音秀' : filmDetail.filmName}}场次票</label>
            </div>
            <div flex="dir:top cross:start">
              <label class="price">￥{{filmPrice}}</label>
              <label class="des">满200立减30元</label>
            </div>
          </div>
          <div flex="dir:left cross:center" style="width: 100%">
            <div class="divider"></div>
            <label class="dividerTitle">
              商品介绍
            </label>
            <div class="divider"></div>
          </div>
          <div>
            {{filmDetail ? filmDetail.introduction : ''}}
          </div>
        </div>
        <x-button class="no-radius bottomBtn" type="primary" @click.native="show=true">马上购买</x-button>
      </div>
    </page>
    <popup v-model="show" position="bottom">
      <div class="popBottom" flex="dir:top">
        <div flex="dir:top" class="body">
          <label class="title">时间</label>
          <checker v-model="timeCheck" default-item-class="check-item"  selected-item-class="check-item-selected"
                   class="checker" radio-required>
            <checker-item :value="filmTime" v-for="(filmTime, index) in filmTimeList" :key="index"
                          @on-item-click="changeTime">{{filmTime.dtime}}
            </checker-item>
          </checker>
          <label class="title">场次</label>
          <checker v-model="planCheck" default-item-class="check-item" selected-item-class="check-item-selected"
                   class="checker" radio-required>
            <checker-item :value="filmPlan" v-for="(filmPlan, index) in filmPlanList" :key="index"
                          @on-item-click="changePlan">{{filmPlan.startTime}}
            </checker-item>
          </checker>
          <div class="numItem">
            <x-number title="购买数量" v-model="value"></x-number>
          </div>
        </div>
        <div class="btn" @click="$router.push({name:'Snack'})">
          确认
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {Popup, Checker, CheckerItem, XNumber} from 'vux'
  import FilmApi from "api/filmApi"
  import PlanApi from "api/planApi"
  import OrderApi from "api/orderApi"
  export default {
    props: ['isHermes'],
    components: {
      PageScroller, Popup, Checker, CheckerItem, XNumber
    },
    data(){
      return {
        show: false,
        timeCheck: null,
        planCheck: null,
        value: 1,
        filmDetail: null,
        filmPrice: '-',
        filmTimeList: [],
        filmPlanList: [],
        seatList: null, // 选中排期座位详情
      }
    },
    methods: {
      async fetchData() {
        this.loadFilmTime()
      },
      // 选择日期
      changeTime: function (itemValue, itemDisabled) {
        if (itemValue.time != this.timeCheck.time) {
          this.loadFilmPlan(itemValue.time)
        }
      },
      // 选择排期
      changePlan: function (itemValue, itemDisabled) {
        if (itemValue.featureAppNo != this.planCheck.featureAppNo) {
          this.loadSeat(itemValue.featureAppNo)
        }
      },
      // 加载失败提示
      toastLoadFilmError(msg) {
        this.$vux.loading.hide()
        this.$vux.toast.show({
          type: 'cancel',
          text: msg
        })
      },
      // 加载营业日期
      loadFilmTime: function () {
        this.$vux.loading.show({
          text: '加载中'
        })
        let params = {}
        PlanApi.getTimes(params).then(success => {
          this.filmTimeList = success.data;
          if (this.filmTimeList.length > 0) {
            this.timeCheck = this.filmTimeList[0]
            this.loadFilmPlan(this.filmTimeList[0].time);
          } else {
            this.toastLoadFilmError('加载失败');
          }
        }, error => {
          this.toastLoadFilmError('加载失败');
        })
      },
      // 加载营业日排期
      loadFilmPlan: function (time) {
        this.$vux.loading.show({
          text: '加载中'
        })
        let params = {
          time: time
        }
        PlanApi.getPlans(params).then(success => {
          console.log(success)
          if (success.data && success.data.length > 0) {
            // 获取影片详情
            if (!this.filmDetail) {
              this.loadFilmDetail(success.data[0].filmId)
            }
            this.filmPlanList = success.data[0].planInfo;
            this.filmPrice = this.filmPlanList[0].standardPrice // 取价格
            this.planCheck = this.filmPlanList[0]
            this.loadSeat(this.planCheck.featureAppNo);
          } else {
            this.toastLoadFilmError('加载失败');
          }
        }, error => {
          this.toastLoadFilmError('加载失败');
        })
      },
      // 加载影片详情
      loadFilmDetail: function (filmId) {
        this.$vux.loading.show({
          text: '加载影片'
        })
        FilmApi.getFilmDetail(filmId).then(success => {
          let filmDetail = success.data
          filmDetail.introduction = filmDetail.introduction.replace('&lt;html&gt;&lt;body&gt;', '')
            .replace('&lt;/body&gt;&lt;/html&gt;', '')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/\<br\s*\/\>/g, "\r\n")
          this.filmDetail = filmDetail
        }, error => {
          this.toastLoadFilmError('影片加载失败');
        })
      },
      // 加载座位信息
      loadSeat: function (featureAppNo) {
        this.$vux.loading.show({
          text: '加载座位'
        })
        let context = this
        FilmApi.getSeat(featureAppNo).then(success => {
          this.$vux.loading.hide()
          this.checkHasOrder(success.data)
          if (success.data.seatinfos) {
            this.seatList = success.data.seatinfos.seat;
          }
        }, error => {
          this.toastLoadFilmError('座位加载失败');
        })
      },
      // 检查是否有未完成订单
      checkHasOrder: function (data) {
        if (data.hasOrder) {
          // TODO 提示有未付订单
          this.$vux.confirm.show({
            title: '温馨提示',
            content: '存在未付款影票订单',
            confirmText: '支付订单',
            cancelText: '取消订单',
            onCancel () {
              // 关闭订单
              OrderApi.cancelOrder(data.hasOrder).then(success => {

              }, error => {

              })
            },
            onConfirm () {
              context.$router.push({path: '/ConfirmOrder?orderId=' + data.hasOrder})
            }
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";



  .checker {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .popBottom {
    background: url(../../assets/images/page_bg.png);
    .title{
      font-size: 16px;
      margin-top: 23px;
      margin-left: 15px;
    }
    .body{
      background: rgba(255,251,244,.5);
    }
    .btn{
      font-size: 16px;
      text-align: center;
      line-height: 45px;
    }
    .numItem {
      margin-top: 20px;
      border-top: solid @border-color 1px;
      padding-top: 10px;
      font-size: 16px;
    }
  }

  .bottomBtn {
    position: fixed;
    bottom: 0;
  }

  .goodPhoto {
    height: 200px;
    background-color: gray;
  }

  .titleTag {
    background-color: gray;
    color: white;
    padding: 5px 15px;
    margin-top: 10px;
  }

  .mainBody {
    background-color: white;
    margin: -20px 20px 80px;
    padding: 20px;
    border-radius: 5px;
    .divider {
      border-bottom: dashed @color-sub 1px;
      height: 1px;
      width: 100%;
      margin: 0 5px;
    }
    .dividerTitle {
      background: url(../../assets/images/home/title_bg.png) center no-repeat;
      background-size: 100% 100%;
      width: 256px;
      height: 34px;
      color: @color-sub;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 34px;
      margin: 10px 0px;
    }
    .titleBar {
      justify-content: space-around;
      width: 100%;
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .des {
        font-size: 11px;
      }
      .price {
        line-height: 25px;
        color: @color-sub;
        font-size: 21px;
      }
    }
  }
</style>
