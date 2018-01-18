<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain" style="backgroundImage: url('http://p0bd8izdn.bkt.clouddn.com/ruihua/xcx/images/detail_bg.png')" >
        <div class="ticket-detail">
          <!-- <div class="ticket">
            <div class="info">
              <p class="f16">{{film.name}}</p>
            </div>
            <div class="body">
              <p class="mb10 red" >取票码：{{orderInfo.convcode}}</p>
              <p class="mb10">取票码： 999999999</p> 
              <qrcode :value="orderInfo.convcode" type="canvas" :size='120' ></qrcode>
            </div>
          </div> -->
          <div class="cell">
            <div class="cell-body" >订单号：{{orderInfo.orderId}}</div>
            <div class="cell-body" v-if="orderInfo.convcode" >取票码：{{orderInfo.convcode}}</div>
            <div class="cell-body" >下单时间：{{ new Date(orderInfo.downTime*1000).format('yyyy年MM月dd日 hh:mm:ss') }}</div>
            <div  class="cell-item" v-for="item in film.detail">
                <div class="flexb" >
                  <label>{{item.name}}</label><label>x {{item.number}}</label>
                </div>
            </div>
            <div class="cell-body">
              <!-- <div class="flexb f12"><label>总价</label><label>￥228.00</label></div> -->
              <!-- <div class="flexb"><label>立减券</label><label>-￥30.00</label></div> -->
              <div class="flexb f16"><label>实付款</label><label>￥{{orderInfo.price}}</label></div>
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
  import {mapState} from "vuex";
import orderApi from "api/orderApi";
import theatreApi from "api/theatreApi";
export default {
  data(){
      return{
        orderInfo:{},
        order:[],
        film:{},
        ruleConfig:{},
        servicePhone:'4000-125-000'
      }
  },
  computed: {
      ...mapState('business',['selectPackageOrder'])
    },
  components:{Qrcode},
  methods:{
    callphone(){
      window.location.href ='tel:'+this.servicePhone+'';
    },
      fetchData(){
        this.orderInfo = JSON.parse(JSON.stringify(this.selectPackageOrder))
        this.order = this.orderInfo.data
        console.log('this.order', this.order)
        this.film = this.orderInfo.data[0]
        this.getmiscConfig()
      },
      getmiscConfig(){
        return theatreApi.getMiscConfig('package_order_info').then(res=>{
          if (res.data && res.data.length > 0) {
            this.ruleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      }
  }
}
</script>

<style lang="less" scoped>
  .contain{background-size: 100% 200px;background-repeat: no-repeat;background-position: top;}
  .ticket-detail{position: relative;z-index: 1;margin: 200px 30px 0 30px;
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

