<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="contain">
        <img class="ticket-detail-bg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514201893800&di=18c5972c1283256906ae1bc527574b88&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1ad5ad6eddc451dac844bcf9bcfd5266d0163275.jpg">
      <div class="ticket-detail">
        <div class="ticket">
          <div class="info">
            <p class="f16">坊巷文化影音秀</p>
            <p>12 月 3 日 10：00</p>
          </div>
          <div class="body">
            <p class="mb10">取票码： 99999999</p>
            <qrcode value="https://vux.li?x-page=demo_qrcode" type="canvas" :size='120' ></qrcode>
          </div>
      </div>
      
      <div class="cell mb10">
        <div class="cell-item">
            <p class="f16">订单号：8888888888</p>
            <div class="flexb">
              <label>坊巷文化影音秀</label><label>x 1</label>
            </div>
        </div>
        <div class="cell-body">
          <div class="flexb f12"><label>总价</label><label>￥228.00</label></div>
          <div class="flexb"><label>立减券</label><label>-￥30.00</label></div>
          <div class="flexb f16"><label>实付款</label><label>￥198.00</label></div>
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
export default {
  data(){
      return{
      }
  },
  components:{Qrcode},
  methods:{
      fetchData(){
      }
  }
}
</script>

<style lang="less" scoped>
  .ticket-detail-bg{position: absolute;z-index: 0;width: 100%;height: 250px;}
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

