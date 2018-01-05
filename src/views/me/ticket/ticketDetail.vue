<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain" :style="{backgroundImage: 'url(' + (orderDetail.film.image) + ')'}" >
        <div class="ticket-detail" :style="`margin-top:`+(orderInfo.status!=3?`200px`:`50px`)">
          <div class="ticket" v-if="orderInfo.status==3">
            <div class="info">
              <p class="f16">{{orderDetail.film.filmName}}--{{orderInfo.status}}</p>
              <p>{{orderDetail.film.startTime}}</p>
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
              <!-- <div class="flexb f12"><label>总价</label><label>￥228.00</label></div> -->
              <!-- <div class="flexb"><label>立减券</label><label>-￥30.00</label></div> -->
              <div class="flexb f16 ">
                <label class="red" v-if="orderInfo.status==0">未支付</label>
                <label v-if="orderInfo.status==3||order.status==25">实付款</label>
                <label class="red" v-if="orderInfo.status==6||order.status==26">已取消</label>
                <label class="red" v-if="orderInfo.status==9">已退票</label>
                <label class="red">￥{{orderDetail.film.price}}</label></div>
            </div>
          </div>
          <div class="cell center"><a href="tel:0147-88469258"><div class="s-button khaki"> 联系客服</div></a></div>
          <div class="warn">
            <p class="title"></p>
            <p>本票售出不退，请至少提前30分钟凭此二维码取票入场 12月2日至12月31日，所购每份正价戏票中均包含咖啡一份，领票时即可兑换</p>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
import { Qrcode } from 'vux'
import orderApi from "api/orderApi";
  import {mapState} from "vuex";
export default {
  data(){
      return{
        orderDetail:{
          film:{},
          goods:{}
        },
        orderInfo:{},
        order:{}
      }
  },
  computed: {
      ...mapState('business',['selectTicketOrder'])
    },
  components:{Qrcode},
  methods:{
    callphone(){
      window.location.href = "tel:10086";
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
      fetchData(){
        this.orderInfo = JSON.parse(JSON.stringify(this.selectTicketOrder))
        this.getDataList()
        this.getOrderDetail()
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

