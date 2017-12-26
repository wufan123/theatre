<template>
  <page :headerTitle="`确认订单`" :footerText="`支付`" :footerLink="`PayOrder`">
    <div slot="contain">
      <div class="c-order">
        <div class="c-goods">
          <list twoLine>
            <div v-if="orderInfo&&orderInfo.film">
              <list-item :img="orderInfo.film.image" :contentTitle="orderInfo.film.filmName" :extra="`￥${orderInfo.film.price}`" :contentBrief="`x ${orderInfo.film.seatCount}`"></list-item>
            </div>
            <div v-if="orderInfo&&orderInfo.goods&&orderInfo.goods.list">
              <list-item v-for="item in orderInfo.goods.list" :key="item.name" :img="item.goodsImg" :contentTitle="item.name" :extra="`￥${item.price}`" :contentBrief="`x ${item.number}`"></list-item>
            </div>
          </list>
        </div>
        <list>
          <list-item :content="`优惠券`" extra="4张可用" isLink :link="`CouponList`"></list-item>
        </list>
        <list>
          <list-item :content="`会员卡`" extra="未选择" isLink :link="`MemberCard`"></list-item>
        </list>
        <div class="price">
          <div class="flexb"><label>总价</label><label>￥233.00</label></div>
          <div class="flexb"><label>实付款</label><label>￥233.00</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile" v-model="mobilePhone"></x-input>
      </group>
      <div class="info">
        <p>温馨提示：</p>
        <p>手机号用于生成订单，及发送支付短信</p>
      </div>
    </div>
  </page>
</template>
<script>
  import {List, ListItem} from 'views/components/settingList'
  import {XInput, Group} from "vux";
  import OrderApi from 'api/orderApi'
  export default {
    data(){
      return {
        mobilePhone: '',
        orderId: this.$route.query.orderId,
        orderInfo: {}
      }
    },
    methods: {
      fetchData(){
        this.mobilePhone = this.$store.state.common.userInfo.bindmobile
        OrderApi.getCinemaOrderInfo(this.orderId).then(success => {
          this.orderInfo = success.data
        }, error => {
          
        })
      }
    },
    components: {List, ListItem, XInput, Group}
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";
  .c-order{
    padding: 0 15px;
    background: @base-bg-color;
    .am-list {
      padding: 0
    }
    .c-goods {
    }
    .am-list-item {
      padding: 15px 0;
      margin-top: -1px;
    }
    .price {
      padding: 10px 0;
    }
  }
  .info {
    margin: 15px;
  }

</style>
