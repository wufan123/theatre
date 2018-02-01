<template>
  <page :headerTitle="`推广记录`" isShowBack>
    <div slot="contain" class="promotion">
      <div class="me-top">
        <div class="advert">
          <i class="level" flex="main:center cross:center">V1</i>
          <img :src="require('assets/images/me/advert.png')">
        </div>
        <span class="bold f16">{{userInfo.userNickname}}</span>
      </div>
      <div class="time" flex="main:justify cross:center">
        <!-- <label>本月</label> -->
        <div class="select-data">
          <i class="icon pre" @click="preDate" ><</i>
          <datetime format="YYYY-MM" v-model="curDateTime" @on-change="confirmDate" ></datetime>
            <i class="icon next" @click="nextDate" >></i>
          <!--
          <label @click="showPopup=true">{{curDateTime.year}}.{{curDateTime.month}}</label>
          <i class="icon next" @click="nextDate">></i> -->
        </div>
      </div>
      <page-scroller :api='getDataList' ref='scroller' :initQuery="false" noRecordText='当前无数据' noRecordImage usePulldown height='-128'>
        <div  class="promotion-list">
          <list title="" v-for="(item,index) in dataList"  :key="index">
            <list-item  extra=" "  @click="orderDetail(item)">
              <div slot="subContent">{{item.toer}} </div>
              <div slot="content" class="gray f12"> {{new Date(item.successTime).format('yyyy-MM-dd hh:mm:ss')}}</div>
              <div slot="extra">  <p class="red">￥{{item.price}} </p> <p class="f12">{{item.orderStatusDesp}}</p> </div>
            </list-item>
          </list>
        </div>

      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from "views/components/pageScroller.vue";
  import AuthApi from 'api/authApi'
  import theatreApi from "api/theatreApi";
  import { Datetime,Popup } from 'vux'
  import {mapState} from "vuex";
  import {List, ListItem} from "views/components/settingList";
  export default {
    components: {PageScroller, List, ListItem,Popup,Datetime},
    data() {
      return {
        showPopup:false,
        dataList: [],
        value1:'2018-01',
        curDateTime:'2018-01',
      };
    },
    computed:{
      ...mapState('common',['userInfo'])
    },
    methods: {
      preDate(){
          var curDate = this.curDateTime.split("-")
          var year =curDate[0]
          var month = curDate[1]
          month--;
          if(month<1){
            year--
            month = '12'
          }
          if(month<10){
            month = `0${month}`
          }
        this.curDateTime = `${year}-${month}`
      },
      nextDate(){
        var curDate = this.curDateTime.split("-")
          var year =curDate[0]
          var month = curDate[1]
          month++;
          if(month>12){
            year++
            month = '1'
          }
          if(month<10){
            month = `0${month}`
          }
        this.curDateTime = `${year}-${month}`
      },
      confirmDate(){
        this.getDataList(1)
      },
      getUserInfo(){
        return AuthApi.getUserInfo().then(success => {
          this.$store.commit('common/setUserInfo', success.data)
          this.$set(this.userInfo,success.data);
          this.getDataList(1)
        }, error => {})
      },
      getDataList(page) {
        var days = this.$util.mGetDate(new Date(this.curDateTime).getFullYear(),new Date(this.curDateTime).getMonth()+1)
        var promoterPhone = this.userInfo.bindmobile
        var startTime =`${this.curDateTime}-01 00:00:00`//       '2018-01-01 00:00:00'  // `${this.curDateTime.year}-${this.curDateTime.month}-01 00:00:00`
        var endTime =`${this.curDateTime}-${days} 23:59:59`// '2018-01-31 23:59:59' //`${this.curDateTime.year}-${this.curDateTime.month}-30 23:59:59`
        return theatreApi.getPromotionList(promoterPhone,startTime,endTime).then(res=>{
            if (res && res.data.content) {
              if (page>1) {
                this.dataList = this.dataList.concat(res.data.content);
              } else {
                this.dataList = res.data.content;
              }
              res = {
                data: this.dataList,
                page: {
                  number: page,
                  totalElements: this.dataList.length,
                }
              }
          }
          this.$vux.loading.hide();
          return res;
        },e=>{this.$util.showRequestErro(e)})
      },
      orderDetail(order){
        this.$store.commit('business/setSelectedTicketOrder', order)
        this.$router.push({name: 'TicketDetail', query: {id: order.orderCode, status: order.status}})
      },
      fetchData() {
        this.curDateTime = new Date().format('yyyy-MM')
        this.getUserInfo()
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
@import "~style/base-variables";
  .promotion{
    .no-record{height: 350px!important;}
    .me-top{display: flex;flex-direction: column;align-items: center; font-size: 13px;text-align: center;padding:20px 0;line-height: 30px;background-image:url('../../../assets/images/me/top_bg.jpg');background-size: 100% 100%;background-repeat: no-repeat;
      .advert{position: relative;border-radius: 50%;width: 70px;height: 70px;
        i.level{position: absolute;right:0px;top: 0px;border-radius: 50%;width: 20px;height:20px;font-size: 10px;background: #ccc;}
        img{border-radius: 50%;width: 60px;height: 60px;}
      }
    }
    .time{padding: 10px 10px ;justify-content: flex-end;
      .select-data{display: flex;align-items: center;justify-content: center;
      .vux-datetime{    padding: 0 10px; font-size: 16px;line-height: 25px;}
      .vux-cell-value{color: black;position: relative;top: 0;}
      i.icon{
      display: block;
      padding:0 10px;
      width: 12px;
      height: 18px;
      overflow: hidden;
      &:before{
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        margin-left: 0;
        border: 2px solid #c6ac88;
        border-top: 0 none;
        border-left: 0 none
      }
      &.pre:before{
        margin-top: 2px;
        margin-left: 2px;
        -webkit-transform: rotate(135deg)
      }
      &.next:before{
        margin-top: 2px;
        -webkit-transform: rotate(315deg)
      }
      }
        // i{font-size: 15px;padding: 0 15px;font-weight: bolder;}
      }
    }
    .promotion-list{background: rgba(255, 251, 244, 0.5);
      .am-list-header{padding: 0 10px;}
      .am-list-item{border-bottom: 1px solid @border-color;}
    }
  }
</style>

