<template>
  <page :headerTitle="`详情`">
    <div slot="contain">
      <div class="box">
        <div class="header">
          <p>坊巷文化影音秀</p>
          <p>12 月 3 日 10：00</p>
        </div>
        <div class="body">
          <p class="mb10">取票码： 99999999</p>
          <qrcode value="https://vux.li?x-page=demo_qrcode" type="canvas" :size='100' ></qrcode>
        </div>
      </div>
      
      <div class="cell mb10">
        <div class="cell-item">
            <p>订单号：8888888888</p>
            <div class="flexb">
              <label>坊巷文化影音秀</label><label>x 1</label>
            </div>
        </div>
        <div class="cell-body">
          <div class="flexb"><label>总价</label><label>￥228.00</label></div>
          <div class="flexb"><label>立减券</label><label>-￥30.00</label></div>
          <div class="flexb"><label>实付款</label><label>￥198.00</label></div>
        </div>
      </div>

      <div class="cell center mb10"> 联系客服</div>

      <div class="cell">
        <p class="center mb10">使用说明</p>
        <p>本票售出不退，请至少提前30分钟凭此二维码取票入场 12月2日至12月31日，所购每份正价戏票中均包含咖啡一份，领票时即可兑换</p>
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
  .box{margin: 30px;background: #ffffff;padding:10px 0;
    .header{border-bottom: 1px dashed #eeeeee;padding: 0px 10px 10px;}
    .body{text-align: center;padding: 15px 0 0;}
  }
  .cell{padding: 15px;background: #ffffff;
    .cell-item{padding-bottom: 10px;border-bottom: 1px solid #eee;line-height: 30px;}
    .cell-body{padding: 10px 0 0;}
  }
</style>

