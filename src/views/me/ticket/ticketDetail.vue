<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain" :style="{backgroundImage: 'url(' + (orderDetail.film.image) + ')'}" >
        <div class="ticket-detail" :style="`margin-top:`+(orderInfo.status!=3?`200px`:`50px`)">
          <div class="ticket" v-if="orderInfo.status==3">
            <div class="info">
              <p class="f16">{{orderDetail.film.filmName}}</p>
              <p>{{new Date(orderDetail.film.startTime*1000).format('yyyy年MM月dd日 hh:mm:ss')}}</p>
            </div>
            <div class="body">
              <p v-for="item in orderInfo.ticketing" class="mb10 red" >{{item.key}}：{{item.value}}</p>
              <!-- <p class="mb10">取票码： 999999999</p> -->
              <qrcode value="https://vux.li?x-page=demo_qrcode" type="canvas" :size='120' ></qrcode>
            </div>
          </div>
          <div class="cell">
             <div class="cell-body">订单号： {{orderInfo.orderCode}}</div>
            <div class="cell-body">下单时间： {{new Date(order.orderTime*1000).format('yyyy年MM月dd日 hh:mm:ss')}}</div>
            <div class="cell-item flexb"><label>{{orderDetail.film.filmName}}</label><label>x {{orderDetail.film.seatCount}}</label></div>

            <div v-if="orderDetail.goods" class="cell-item">
                <div  class="flexb" v-for="item in orderDetail.goods.list">
                  <label>{{item.name}}</label><label>x {{item.number}}</label>
                </div>
            </div>
            <div class="cell-body">
              <div class="flexb f12"><label>总价</label><label>￥{{orderPayInfo.totalPrice}}</label></div>
              <div class="flexb" v-if="getIsPayed(orderInfo.status) == 1" v-for="item in orderPayInfo.payInfo"><label>{{item.name}}</label><label>{{item.money}}</label></div>
              <div class="flexb f16 ">
                <label class="red" v-if="getStatus(orderInfo.status) == 0">待付款</label>
                <label class="red" v-if="getStatus(orderInfo.status) == 3">取消付款</label>
                <label class="red" v-else-if="getStatus(orderInfo.status) == 2">已退票</label>
                <label v-else>实付款</label>
                <label class="red" v-if="getIsPayed(orderInfo.status) == 0">￥{{orderPayInfo.totalPrice}}</label>
                <label class="red" v-else>￥{{orderPayInfo.realPrice}}</label>

              </div>
            </div>
          </div>
          <div class="cell center"><div class="s-button khaki" @click="callphone"> 联系客服</div></div>
          <div class="warn" v-if="ruleConfig">
            <p class="title"></p>
            <p>{{ruleConfig}}</p>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
import { Qrcode } from 'vux'
import orderApi from "api/orderApi";
import theatreApi from "api/theatreApi";
import {mapState} from "vuex";
export default {
  data(){
      return{
        orderDetail:{
          film:{},
          goods:{}
        },
        orderInfo:{},
        orderPayInfo:{},
        order:{},
        ruleConfig:{},
        servicePhone:'4000-125-000'
      }
  },
  computed: {
      ...mapState('business',['selectTicketOrder'])
    },
  components:{Qrcode},
  methods:{
    callphone(){
      console.log('tel',this.servicePhone)
      window.location.href ='tel:'+this.servicePhone+'';
    },
      getOrderDetail(){
        return orderApi.getFilmOrderInfo(this.orderInfo.orderCode).then(res=>{
          this.order = res.data
        },error => { console.log(error); })
      },
      getDataList(){
        return orderApi.getCinemaOrderInfo(this.orderInfo.orderCode).then(res=>{
          console.log('res',res.data)
          this.orderDetail = res.data
        },error => { console.log(error); })
      },
      getPayInfo(){
        return orderApi.getOrderPayInfo(this.orderInfo.orderCode,0).then(res=>{
          this.orderPayInfo = res.data
        },error => { console.log(error); })
      },
      getmiscConfig(){
        return theatreApi.getMiscConfig('show_order_info').then(res=>{
          if (res.data && res.data.length > 0) {
            this.ruleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      },
      fetchData(){
        this.orderInfo = JSON.parse(JSON.stringify(this.selectTicketOrder))
        this.getDataList()
        this.getOrderDetail()
        this.getPayInfo()
        this.getmiscConfig()
      },
      getStatus (status) {
        if (status==0) {
          return 0; // 未支付
        } else if (status==9) {
          return 2; // 已退款
        } else if(status==6||status==26) {
          return 3; // 已取消
        } else {
          return 1; // 已支付
        }
      },
      getIsPayed (status) {
        if (status==0||status==6||status==26) {
          return 0;
        } else {
          return 1;
        }
      }
  }
}
</script>

<style lang="less" scoped>
  .contain{background-size: 100% 200px;background-repeat: no-repeat;background-position: top;}
  .ticket-detail{position: relative;z-index: 1;margin: 75px 30px 0 30px;
    .ticket{
      .info{line-height: 30px; padding: 10px 20px;background-image: url('../../../assets/images/me/ticket_detail_bg.png');background-size: 100% 100%;}
      .body{text-align: center;padding: 30px 0 ;background-image: url('../../../assets/images/me/ticket_detail_bg2.png');background-size: 100% 100%;}
    }
  }
  .cell{padding: 15px 0;
    .s-button{padding: 4px 10px;}
    .cell-item{padding: 8px 0;border-bottom: 1px solid #c6ac88;line-height: 30px;}
    .cell-body{padding: 10px  0;}
  }
  .warn{margin-bottom: 30px;
    .title{margin: 10px 0;width:100%;height: 46px;background-image: url('../../../assets/images/me/use_sm_title_bg.png');background-size: 100% 100%;background-repeat: no-repeat;}
  }
</style>

