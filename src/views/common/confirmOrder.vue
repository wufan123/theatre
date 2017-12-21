<template>
<page :headerTitle="`确认订单`" :footerText="`支付`" :footerLink="`/`" >
  <div slot="contain">
    <div class="c-order">
      <div class="c-goods">
          <list twoLine>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`" 
            :contentTitle="`坊巷文化影音秀`"   extra="￥228.00" :contentBrief="`x 1`"  ></list-item>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`" 
            :contentTitle="`永和鱼丸`"   extra="￥10.00" :contentBrief="`x 1`"  ></list-item>
          </list>
        </div>
         <list>
            <list-item :content="`优惠券`"  extra="4张可用" isLink></list-item>
         </list>
         <list>
            <list-item :content="`会员卡`"  extra="未选择" isLink></list-item>
         </list>
         <div class="price">
            <div class="flexb"><label>总价</label><label>￥233.00</label> </div>
            <div class="flexb"><label>实付款</label><label>￥233.00</label> </div>
         </div>
     </div>
     <group>
      <x-input title="手机号" keyboard="number" is-type="china-mobile" name="mobile" v-model="telphone"></x-input>
    </group>
    <div class="info">
      <p>温馨提示：</p>
      <p>手机号用于生成订单，及发送支付短信</p>
    </div>
  </div>
</page>
</template>
<script>
  import {List,ListItem} from 'views/components/list'
    import { XInput, Group } from "vux";
export default {
  data(){
    return{
      telphone:13800138000
    }
  },
  components:{List,ListItem, XInput, Group}
}
</script>
<style lang="less">
.c-order .am-list .am-list-item.twoline .am-list-thumb img{width: 50px;height: 70px;}
</style>

<style lang="less" scoped >
.c-order{padding:0 15px ;background: #ffffff;
  .am-list{padding: 0}
  .c-goods{
    
    .am-list .am-list-item{background: none;}
  }
  .am-list-item{padding: 15px  0;margin-top: -1px;}
  .price{padding:10px 0;}
}
.info{margin: 15px;}

</style>
