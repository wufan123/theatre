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
              <label>
                {{filmDetail==null?'坊巷文化影音秀':filmDetail.filmName}}</label>
              <label>
                {{filmDetail==null?'坊巷文化影音秀':filmDetail.filmName}}场次票</label>
            </div>
            <div flex="dir:top">
              <label class="price">
                ￥{{filmPrice}}</label>
              <label class="primeCost">
                ￥20.00</label>
            </div>
          </div>
          <label class="titleTag">
            商品介绍
          </label>
          <div>
            {{filmDetail?filmDetail.introduction:''}}
          </div>
        </div>
        <x-button class="no-radius bottomBtn" type="primary" @click.native="show=true">马上购买</x-button>
      </div>
    </page>
    <popup v-model="show" position="bottom">
      <div class="popBottom" flex="dir:top">
        <label>时间</label>
        <checker v-model="timeCheck" default-item-class="check-item" selected-item-class="check-item-selected" class="checker" radio-required>
          <checker-item :value="filmTime" v-for="(filmTime, index) in filmTimeList" :key="index" @on-item-click="changeTime">{{filmTime.dtime}}</checker-item>
        </checker>
        <label>场次</label>
        <checker v-model="planCheck" default-item-class="check-item" selected-item-class="check-item-selected" class="checker" radio-required>
          <checker-item :value="filmPlan" v-for="(filmPlan, index) in filmPlanList" :key="index">{{filmPlan.startTime}}</checker-item>
        </checker>
          <div class="numItem">
            <x-number title="数量" v-model="value"></x-number>
          </div>
        <x-button type="primary" class="no-radius" @click.native="$router.push({name:'Snack'})">
          确认
        </x-button>
      </div>
    </popup>
  </div>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {Popup, Checker, CheckerItem,XNumber} from 'vux'
  import FilmApi from "api/filmApi"
  import PlanApi from "api/planApi"
  export default {
    props: ['isHermes'],
    components: {
      PageScroller, Popup, Checker, CheckerItem,XNumber},
    data(){
      return {
        show: false,
        timeCheck: null,
        planCheck: null,
        value:1,
        filmDetail: null,
        filmPrice: '-',
        filmTimeList: [],
        filmPlanList: []
      }
    },
    methods: {
      async fetchData() {
        this.loadFilmDetail()
      },
      changeTime: function(itemValue, itemDisabled) {
        if (itemValue.time != this.timeCheck.time) {
          this.loadFilmPlan(itemValue.time)
        }
      },
      // 加载影片详情
      loadFilmDetail: function() {
        FilmApi.getMove(1).then(success => {
          let filmList = success.data;
          if (filmList.length > 0) {
            FilmApi.getFilmDetail(filmList[0].id).then(success => {
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
              this.loadFilmTime()
            }, error => {

            })
          } else {
            console.log(success)
          }
        }, error => {
          console.log(error)
        })
      },
      loadFilmTime: function() {
        let params = {
            filmNo: this.filmDetail.filmNo
        }
        PlanApi.getTimes(params).then(success => {
          this.filmTimeList = success.data;
          if (this.filmTimeList.length > 0) {
              this.timeCheck = this.filmTimeList[0]
              this.loadFilmPlan(this.filmTimeList[0].time);
          }
        }, error => {
          console.log(error)
        })
      },
      loadFilmPlan: function(time) {
        let params = {
            filmNo: this.filmDetail.filmNo,
            time: time
        }
        PlanApi.getPlans(params).then(success => {
          if (success.data.planInfo) {
            this.filmPlanList = success.data.planInfo;
            this.filmPrice = this.filmPlanList[0].standardPrice // 取价格
            this.planCheck = this.filmPlanList[0]
          }
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .numItem{
    margin-top: 20px;
    border-top: solid @border-color 1px;
    padding-top: 10px;
  }
  .checker{
    display: flex;justify-content: space-around;
    margin-top: 20px;
  }
  .check-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    width: 80px;
    text-align: center;
  }

  .check-item-selected {
    border: 1px solid green;
  }
  .popBottom {
    padding: 10px;
    background-color: white;
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
    .titleBar {
      justify-content: space-around;
      width: 100%;
      .price {
        font-size: 22px;
      }
    }
  }
</style>
