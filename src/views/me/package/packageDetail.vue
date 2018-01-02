<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain" :style="{backgroundImage: 'url(' +backgroundStr+ ')'}" >
        <div class="ticket-detail">
          <div class="ticket">
            <div class="info">
              <p class="f16">{{film.name}}</p>
            </div>
            <div class="body">
              <p class="mb10 red" >取票码：{{orderInfo.convcode}}</p>
              <!-- <p class="mb10">取票码： 999999999</p> -->
              <qrcode :value="orderInfo.convcode" type="canvas" :size='120' ></qrcode>
            </div>
          </div>
          <div class="cell">
            <div  class="cell-item">
                <div class="flexb mb10" >
                  <label>订单号:{{orderInfo.orderId}}</label>
                </div>
                <div class="flexb" v-for="item in film.detail" >
                  <label>{{item.name}}</label><label>x {{item.number}}</label>
                </div>
            </div>
            <div class="cell-body">
              <!-- <div class="flexb f12"><label>总价</label><label>￥228.00</label></div> -->
              <!-- <div class="flexb"><label>立减券</label><label>-￥30.00</label></div> -->
              <div class="flexb f16"><label>实付款</label><label>￥{{orderInfo.price}}</label></div>
            </div>
          </div>
          <div class="cell center"><div class="s-button khaki"> 联系客服</div></div>
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
export default {
  data(){
      return{
        orderInfo:{},
        order:[],
        film:{},
        backgroundStr:''
      }
  },
  components:{Qrcode},
  methods:{
      fetchData(){
        console.log('88888', this.$route.query)
        this.orderInfo = this.$route.query
        this.order = this.orderInfo.data
        console.log('this.order', this.order)
        this.film = this.orderInfo.data[0]
        this.backgroundStr = this.film.detail[0].img

      }
  }
}
</script>

<style lang="less" scoped>
  .contain{background-size: 100% 300px;background-repeat: no-repeat;background-position: top;}
  .ticket-detail{position: relative;z-index: 1;margin: 75px 30px 0 30px;
    .ticket{
      .info{line-height: 30px; padding: 10px 20px;background-image: url('../../../assets/images/me/ticket_detail_bg.png');background-size: 100% 100%;}
      .body{text-align: center;padding: 30px 0 ;background-image: url('../../../assets/images/me/ticket_detail_bg2.png');background-size: 100% 100%;}
    }
  }
  .cell{padding: 15px;
    .s-button{padding: 4px 10px;}
    .cell-item{padding-bottom: 10px;border-bottom: 1px solid #c6ac88;line-height: 30px;}
    .cell-body{padding: 10px 0 0;}
  }
  .warn{margin-bottom: 30px;
    .title{margin: 10px 0;width:100%;height: 46px;background-image: url('../../../assets/images/me/use_sm_title_bg.png');background-size: 100% 100%;background-repeat: no-repeat;}
  }
</style>

