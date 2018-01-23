<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain" style="background-image:url('http://p0bd8izdn.bkt.clouddn.com/ruihua/xcx/images/detail_bg.png')">
        <div class="ticket-detail">
          <div class="ticket">
            <div class="info">
              <p class="f16">{{!$util.isEmptyObject(orderDetail)&&orderDetail.details[0].goodsName}}</p>
              <!-- <p>{{new Date(orderDetail.downTime*1000).format('yyyy年MM月dd日 hh:mm:ss')}}</p> -->
            </div>
            <div class="body">
              <p v-for="item in orderDetail.ticketing" class="mb10 red" >{{item.key}}：{{item.value}}</p>
              <!-- <p class="mb10">取票码： 999999999</p> -->
              <qrcode :value="orderDetail.qrCode" type="canvas" :size='120' ></qrcode>
            </div>
          </div>
          <div class="cell mb10">
            <div class="cell-body">下单时间：{{new Date(orderDetail.downTime*1000).format('yyyy年MM月dd日 hh:mm:ss')}}</div>
            <div v-if="orderDetail.details" class="cell-item">
                <div flex="main:justify"   v-for="item in orderDetail.details">
                  <label>{{item.goodsName}}</label><label>x {{item.number}}</label>
                </div>
            </div>
            <div class="cell-body">
              <div class="flexb f12" flex="main:justify"><label>总价</label><label>￥{{orderPayInfo.totalPrice}}</label></div>
              <div class="flexb" flex="main:justify" v-for="item in orderPayInfo.payInfo"><label>{{item.name}}</label><label>-￥{{item.money}}</label></div>
              <div class="flexb f16" flex="main:justify"><label>实付款</label><label>￥{{orderPayInfo.realPrice}}</label></div>
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
import storeApi from "api/storeApi";
import orderApi from "api/orderApi";
import theatreApi from "api/theatreApi";
export default {
  data(){
      return{
        orderDetail:{},
        orderInfo:{},
        orderPayInfo:{},
        ruleConfig:null,
        servicePhone:'4000-125-000'
      }
  },
  components:{Qrcode},
  methods:{
    callphone(){
      window.location.href ='tel:'+this.servicePhone+'';
    },
      getDataList(){
        return storeApi.getGoodsOrderDetail(this.orderInfo.id).then(res=>{
          console.log('res',res.data)
          this.orderDetail = res.data
          this.getPayInfo()
        },error => { console.log(error); })
      },
      getPayInfo(){
        return orderApi.getOrderPayInfo(this.orderDetail.orderId,2).then(res=>{
          this.orderPayInfo = res.data
        },error => { console.log(error); })
      },
      getmiscConfig(){
        return theatreApi.getMiscConfig('goods_order_info').then(res=>{
          if (res.data && res.data.length > 0) {
            this.ruleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      },
      fetchData(){
        this.orderInfo = this.$route.query
        this.getDataList()
        this.getmiscConfig()
      }
  }
}
</script>

<style lang="less" scoped>
  .contain{background-size: 100% 200px;background-repeat: no-repeat;background-position: top;}
  .ticket-detail{position: relative;z-index: 1;margin: 50px 30px 0 30px;
    .ticket{
      .info{line-height: 30px; padding: 10px 20px;background-image: url('../../../assets/images/me/ticket_detail_bg.png');background-size: 100% 100%;}
      .body{text-align: center;padding: 30px 0 ;background-image: url('../../../assets/images/me/ticket_detail_bg2.png');background-size: 100% 100%;}
    }
  }
  .cell{padding: 15px 0;
    .s-button{padding: 4px 10px;}
    .cell-item{padding: 8px 0;border-bottom: 1px solid #c6ac88;line-height: 30px;}
    .cell-body{padding: 10px 0;}
  }
  .warn{margin-bottom: 30px;
    .title{margin: 10px 0;width:100%;height: 46px;background-image: url('../../../assets/images/me/use_sm_title_bg.png');background-size: 100% 100%;background-repeat: no-repeat;}
  }
</style>

