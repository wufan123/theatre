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
            <!--<div v-if="orderInfo&&orderInfo.goods&&orderInfo.goods.list">-->
            <!--<list-item v-for="item in orderInfo.goods.list" :key="item.name" :img="item.goodsImg"-->
            <!--:contentTitle="item.name" :extra="`￥${item.price}`"-->
            <!--:contentBrief="`x ${item.number}`"></list-item>-->
            <!--</div>-->
          </list>
        </div>
        <div class="c-info" v-if="orderInfo.isShowCoupon==1&&orderInfo.isUseCouponNum!==0">
          <list>
            <list-item :content="`优惠券`"
                       :extra="selectedCoupon?selectedCoupon.voucherName:`${orderInfo.isUseCouponNum}张可用`" isLink
                       @click.native="selectCouponClick()"></list-item>
          </list>
        </div>
        <!--<div class="c-info">
        <list>
        <list-item :content="`会员卡`" extra="未选择" isLink :link="`MemberCard`"></list-item>
        </list>
        </div>-->
        <div class="price">
          <div class="flexb" flex="main:justify"><label>总价</label><label>￥{{orderInfo.price}}</label></div>
          <div class="flexb" flex="main:justify" v-for="(item,index) in selectCouponList" :key="index">
            <label>{{item.name}}</label><label>{{item.value}}</label></div>
          <div class="flexb payment" flex="main:justify"><label>实付款</label><label>￥{{orderInfo._price}}</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile" ref="phone"
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
    props: ['goodInfo'],
    data(){
      return {
        phone: '',
        goodsId: this.$route.query.goodsId,
        orderId: this.$route.query.orderId,
        orderType: 'goods',
        orderInfo: {
          price:0
        }, // 订单信息
        selectedCoupon: undefined,
        oldPhone: null, // 保存旧手机号，判断是否有修改
        selectCouponList: [], // 已选优惠券信息
      }
    },
    computed: {
      ...mapState('common/', ['userInfo']),
    },
    methods: {
      async fetchData(){
        this.phone = this.userInfo.bindmobile;
        this.oldPhone = this.phone;
        let res = await StoreApi.getGoodsDetail(this.goodsId);
        if (res && res.data) {
          this.orderInfo = res.data.goodInfo
        }
        let ress = await StoreApi.getOrderPayWay(this.$route.query.orderId, 'goods');
        if (ress && ress.data) {
          this.$set(this.orderInfo, 'isUseCouponNum', ress.data.saleCouponList.length);
          this.orderInfo.isShowCoupon = ress.data.isShowCoupon
          // 不存在优惠券列表才置入，注：重新创建订单必须清空缓存的优惠券列表
          if (!this.$store.state.coupon.goodsCouponList) {
            this.$store.commit('coupon/setGoodsCouponList', ress.data.saleCouponList)
          }
          // 展示已选中的优惠券
          this.selectCouponList = []
          this.orderInfo._price = this.orderInfo.price
          this.$store.state.coupon.goodsCouponList.forEach(item => {
            if (item.checked) {
              this.selectedCoupon = item;
              let couponValue = parseFloat(item.ticketValue)
              let useValue = this.orderInfo._price < couponValue ? this.orderInfo._price : couponValue
              this.orderInfo._price -= useValue;
              this.selectCouponList.push({
                name: '卖品优惠',
                value: '-￥' + useValue,
                voucherNum: item.voucherNum
              })
            }
          })
        }
      },
      // 锁定，跳转到支付页面
      async lockAndPayOrder () {
        if (!this.$refs.phone.valid) {
          this.$vux.toast.show({  type: 'cancel',   text: '请输入正确的手机号' })
          return
        }
        if (this.phone == '') {
          this.$vux.toast.show({ type: 'cancel', text: '手机号不能为空' })
          return
        }
        
        if (this.oldPhone !== this.phone) {
          OrderApi.updateOrderMobile(this.phone,this.orderId)
        }
        // 优惠券信息
        var couponStr = ''
        this.selectCouponList.forEach(item => {
          if (couponStr) {
            couponStr += ','
          }
          couponStr += item.voucherNum
        })
        // 会员卡信息
        var cardId = this.selectCard ? this.selectCard.id : null;
        this.$vux.loading.show();
        let res;
        try {
          res = await  StoreApi.getOrderPayLock(this.orderId, this.orderType, cardId, couponStr);
        } catch (err) {
          this.$util.showRequestErro(err);
        }
        if(res&&!this.$util.isEmptyObject(res.data))
        {
          if (res.data.price == 0) {
            this.$vux.loading.show({
              text:'正在支付'
            })
            let payRes;
            try {
              payRes = await StoreApi.goodsAndFilmComfirmNewPay(this.orderId, this.orderType, "account", 0, null);
            } catch (e) {
                this.$util.showRequestErro(e);
            }
            if (payRes && payRes.status == 0) {
              this.$router.push({
                name: 'PaySuccess',
                query:{
                  orderType:'goods'
                }
              })
            }
          }
          else{
            this.$store.commit("business/setPayLockInfo",
              {
                orderId: this.orderId,
                orderType: this.orderType,
                ...res.data
              });
            this.$router.push({
              name: 'PayOrder'
            })
          }
        }
        this.$vux.loading.hide();

      },

      // 选择优惠券
      selectCouponClick() {
        this.$router.push({
          name: 'SelectCoupon', query: {
            orderType: this.orderType
          }
        })
      }
    },
    components: {List, ListItem, XInput, Group}
  }
</script>
<style lang="less">
  .c-order .am-list-thumb img {
    border: 1px solid #c4a983;
    box-sizing: border-box;
  }
</style>
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
      &.is-link {
        padding: 0;
      }
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
