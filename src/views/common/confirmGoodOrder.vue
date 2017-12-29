<template>
  <page :headerTitle="`确认卖品订单`" :footerText="`支付`" :footerFunc="lockAndPayOrder">
    <div slot="contain">
      <div class="c-order">
        <div class="c-info">
          <list twoLine>
            <div v-if="orderInfo" class="good-content">
              <list-item :img="orderInfo.goodsImg" :contentTitle="orderInfo.goodsName"
                         :extra="`￥${orderInfo.price}`"
                         :contentBrief="`x 1`"></list-item>
            </div>
            <div v-if="orderInfo&&orderInfo.goods&&orderInfo.goods.list">
              <list-item v-for="item in orderInfo.goods.list" :key="item.name" :img="item.goodsImg"
                         :contentTitle="item.name" :extra="`￥${item.price}`"
                         :contentBrief="`x ${item.number}`"></list-item>
            </div>
          </list>
        </div>
        <div class="c-info">
          <list>
            <list-item :content="`优惠券`" extra="4张可用" isLink :link="`CouponList`"></list-item>
          </list>
        </div>
        <div class="c-info">
          <list>
            <list-item :content="`会员卡`" extra="未选择" isLink :link="`MemberCard`"></list-item>
          </list>
        </div>
        <div class="price">
          <div class="flexb"><label>总价</label><label>￥{{orderInfo._price}}</label></div>
          <div class="flexb payment"><label>实付款</label><label>￥{{orderInfo._price}}</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile"
                 v-model="phone"></x-input>
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
  import StoreApi from 'api/storeApi'
  import {mapState} from "vuex";
  export default {
    props:['goodInfo'],
    data(){
      return {
        phone: '',
        goodsId: this.$route.query.goodsId,
        orderType: 'goodsAndFilm',
        orderInfo: {}, // 订单信息
        orderPayWay: {}, // 优惠券信息
        selectCard: null, // 选择的会员卡
        oldPhone: null, // 保存旧手机号，判断是否有修改
      }
    },
    computed: {
      ...mapState('common/', ['userInfo'])
    },
    methods: {
      async fetchData(){
        this.phone = this.userInfo.bindmobile;
        this.oldPhone = this.phone;
        // 获取订单信息
        console.log(this.goodInfo);
        let res = await StoreApi.getGoodsOrderDetail(this.goodsId);
        if(res&&res.data){
            this.orderInfo = res.data.goodInfo
        }
      },
      // 计算总价
      caculateCount: function () {
        //初始化显示订单价格
        this.orderInfo.film._price = parseFloat(this.orderInfo.film.price)
        // TODO 如果有使用会员卡
        // if (this.selectCard) {
        //     this.orderInfo.film._price = parseFloat(this.selectCard.settlementPrice) * parseInt(this.orderInfo.film.seatCount)
        // }
        // 原始总价
        this.orderInfo._price = this.orderInfo.film._price + (parseFloat(this.orderInfo.goods ? this.orderInfo.goods.price : 0))

        // TODO 计算优惠券

      },
      // 锁定，跳转到支付页面
      lockAndPayOrder: function () {
        if (this.phone === '') {
          this.$vux.toast.show({
            type: 'cancel',
            text: '手机号不能为空'
          })
          return
        }
        if (this.oldPhone !== this.phone) {
          OrderApi.updateOrderMobile(this.phone)
        }
        // 优惠券信息
        var couponStr = ''
        // 会员卡信息
        var cardId = this.selectCard ? this.selectCard.id : null

        this.$vux.loading.show({
          text: '加载中'
        })
        StoreApi.getOrderPayLock(this.goodsId, this.orderType, cardId, couponStr).then(success => {
          this.$vux.loading.hide()
          if (success && success.price == 0) {
            // TODO 不需要实际支付，直接调用支付接口

          } else {
            this.$router.push({
              name: 'PayOrder', params: {
                goodsId: this.goodsId,
                orderType: this.orderType,
                payLockInfo: success
              }
            })
          }
        }, error => {
          this.$vux.loading.hide()
        })
      }
    },
    components: {List, ListItem, XInput, Group}
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";
  .c-order {
    padding: 0 15px;
    background: @base-bg-color;
    .c-info {
      border-bottom: dashed @border-color 1px;
    }
    .am-list-item {
      padding: 15px 0;
      margin-top: -1px;
    }
    .price {
      padding: 15px 0;
      font-size: 14px;
      color: @font-color-sub;
      .payment {
        :first-child {
          color: @font-color;
          font-size: 15px;
        }
        :nth-child(2) {
          font-size: 17px;
          color: @color-primary;
          font-weight: bold;
        }
      }
    }
  }

  .info {
    margin: 15px;
    font-size: 16px;
  }

</style>
