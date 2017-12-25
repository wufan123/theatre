<template>
<page :headerTitle="`支付订单`" :footerText="`确认支付`" :footerLink="`PaySuccess`" >
  <div slot="contain">
    <div class="center last-time">支付剩余时间：15：00</div>
    <list>
      <list-item :content="`实付款`"  extra="￥200.00" ></list-item>
    </list>
    <div class="c-pay">
       <div class="pay-card">
          <group title="选择支付方式">
            <radio   :options="typeData" @on-change="change"  value="2" disabled ></radio>
          </group>
       </div>

     </div>
    <div class="info"> <p>温馨提示：</p><p>订单一旦完成购买，不退不换</p></div>
  </div>
</page>
</template>
<script>
  import {List,ListItem} from 'views/components/settingList'
    import { Group, Radio } from "vux";
export default {
  data(){
    return{
      telphone:'13800138000',
      typeData: [{
        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
        key: '1',
        value: '会员卡：余额￥20.00'
      }, {
        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
        key: '2',
        value: '微信'
      }]
    }
  },
  components:{List,ListItem, Group,Radio},
  methods:{
    change(val){
      console.log('change',val)
    }
  }
}
</script>
<style lang="less">
.pay-card{margin-bottom: 10px;
  .weui-cells__title{
        margin-bottom: 10px;
    color: #000;
  }
}
</style>

<style lang="less" scoped >

.last-time{padding:15px 0 0;}
.c-pay{padding: 15px ;background: #ffffff;
  .am-list{padding: 0}
  .c-goods{
    .am-list .am-list-item{background: none;}
  }
  .am-list-item{padding: 15px  0;margin-top: -1px;}
  .price{padding:10px 0;}
}
.info{margin: 15px;}

</style>
