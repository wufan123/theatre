<template>
  <page :headerTitle="`确认订单`" :footerText="`支付`" :footerFunc="lockAndPayOrder">
    <div slot="contain">
      <div class="c-order">
        <div class="c-info">
          <list twoLine>
            <div v-if="orderInfo&&orderInfo.film" class="good-content">
              <list-item :img="orderInfo.film.image" :contentTitle="orderInfo.film.filmName"
                         :extra="`￥${orderInfo.film.price}`"
                         :contentBrief="`x ${orderInfo.film.seatCount}`"></list-item>
            </div>
            <div v-if="orderInfo&&orderInfo.goods&&orderInfo.goods.list">
              <list-item v-for="item in orderInfo.goods.list" :key="item.name" :img="item.goodsImg"
                         :contentTitle="item.name" :extra="`￥${item.price}`"
                         :contentBrief="`x ${item.number}`"></list-item>
            </div>
          </list>
        </div>
        <div class="c-info" v-if="orderPayWay.couponList&&orderPayWay.couponList.length">
          <list>
            <list-item :content="`优惠券`" :extra="getCouponExtra()" isLink
                       @click.native="selectCouponClick"></list-item>
          </list>
        </div>
        <div class="c-info" v-if="orderPayWay.memberCard&&orderPayWay.memberCard.length">
          <list>
            <list-item :content="`会员卡`" :extra="selectedMember.cardId?selectedMember.cardId:'未选择'" isLink
                       @click.native="$router.push({name:'SelectMember',params:{
                list:orderPayWay.memberCard
            }})"></list-item>
          </list>
        </div>
        <div class="price">
          <div class="flexb"><label>总价</label><label>￥{{orderInfo._price}}</label></div>
          <div class="flexb" v-for="(item,index) in couponInfo" :key="index">
            <label>{{item.name}}</label><label>{{item.des}}</label></div>
          <div class="flexb payment"><label>实付款</label><label>￥{{orderInfo.price}}</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile"
             ref="phone"   v-model="phone"></x-input>
      </group>
      <div class="info">
        <p>温馨提{{phone}}示：</p>
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
  import TheatreApi from 'api/theatreApi'
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        phone: '',
        orderId: this.$route.query.orderId,
        orderType: 'goodsAndFilm',
        orderInfo: {}, // 订单信息
        orderPayWay: {}, // 优惠券信息
        selectCard: null, // 选择的会员卡
        selectedCoupon: null,
        oldPhone: null, // 保存旧手机号，判断是否有修改
        couponInfo: [],
        selectedCouponList: []
      }
    },
    computed: {
      ...mapState('business', ['selectedMember']),
      ...mapState('coupon', ['ticketCouponList']),
      ...mapState('common', ['promotion','userInfo'])
    },
    methods: {
      async fetchData(){
        this.phone = this.$store.state.common.userInfo.bindmobile;
        this.oldPhone = this.phone;
        // 获取优惠券信息
        let wayRes;
        try {
          wayRes = await StoreApi.getOrderPayWay(this.orderId, this.orderType);
        } catch (e) {
          console.log(e);
        }
        if (wayRes && wayRes.data) {
          this.orderPayWay = wayRes.data;
          if (!this.ticketCouponList || !this.ticketCouponList.length)
            this.$store.commit('coupon/setTicketCouponList', this.orderPayWay.couponList)
        }
        // 获取订单信息
        let orderRes;
        try {
          orderRes = await OrderApi.getCinemaOrderInfo(this.orderId);
        } catch (e) {
          console.log(e);
        }
        if (orderRes && orderRes.data) {

          this.orderInfo = orderRes.data;
          this.caculateCount();
        }
      },
      // 计算总价
      caculateCount: function () {
        //初始化显示订单价格
        this.orderInfo.film._price = parseFloat(this.orderInfo.film.price);
        // TODO 如果有使用会员卡
        // if (this.selectCard) {
        //     this.orderInfo.film._price = parseFloat(this.selectCard.settlementPrice) * parseInt(this.orderInfo.film.seatCount)
        // }
        // 原始总价
        this.orderInfo._price = this.orderInfo.film._price + (parseFloat(this.orderInfo.goods ? this.orderInfo.goods.price : 0))
        this.orderInfo.price = this.orderInfo._price;
        // 计算优惠券
        let selectedList = this.ticketCouponList.filter(item => {
          if (item.checked) {
            return item;
          }
        });
        selectedList.forEach(item => {
          switch (item.ticketType) {
            case 'reduce':
              this.orderInfo.price -= item.ticketValue;
              this.couponInfo.push({
                name: item.voucherName,
                num: item.voucherNum,
                des: `-￥${item.ticketValue}`
              });
              break;
            case 'exchange':
              if (this.orderInfo.price > this.orderInfo.film.price) {
                this.orderInfo.price -= this.orderInfo.film.price
              } else {
                this.orderInfo.price = 0;
              }
              this.couponInfo.push({
                name: item.voucherName,
                num: item.voucherNum,
                des: '1张票'
              });
              break;
          }
        });
      },
      // 锁定，跳转到支付页面
      async lockAndPayOrder() {
        console.log('this.$refs.input01.valid',)
        if(!this.$refs.phone.valid){
          this.$vux.toast.show({
            type: 'cancel',
            text: '请输入正确的手机号'
          })
          return
        }
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
        let couponStr="";
        if(this.couponInfo&&this.couponInfo.length)
        {
          couponStr= this.couponInfo.map(item => {
            return item.num
          }).reduce((pre, item) => {
            let acc = '';
            if (pre) {
              acc += `,${item}`
            } else {
              acc += item
            }
            return acc;
          })
        }

        // 会员卡信息
        let cardId = this.selectedMember.id;

        this.$vux.loading.show();
        let res;
        try {
          res = await  StoreApi.getOrderPayLock(this.orderId, this.orderType, cardId, couponStr);
        } catch (e) {
          this.$util.showRequestErro(e);
        }
        if(res&&!this.$util.isEmptyObject(res.data)) {
          console.log('res.data',res.data)
          var params ={ }
          params.type = this.promotion.type?this.promotion.type:2;
          params.sn = this.orderId;
          params.toer = this.userInfo.bindmobile;
          params.price = res.data.price;
          params.ticketsCnt = this.orderInfo.film.seatCount
            //推广完成
          TheatreApi.finishPromotion(params);
          //价格为0时直接支付
          if (res.data.price == 0) {
            this.$vux.loading.show({
              text:'正在支付'
            });
            let payRes;
            try {
              payRes = await StoreApi.goodsAndFilmComfirmNewPay(this.orderId, this.orderType, "account", 0, null);
            } catch (e) {
              this.$util.showRequestErro(e);
            }
            if (payRes && payRes.status == 0) {
              this.$router.push({
                name: 'PaySuccess'
              })
            }
          }
          else {
            if (cardId)
              this.$vux.toast.text("会员卡余额不足", 'bottom');
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
          name: 'SelectCoupon',
          query:{
            seatCount:this.orderInfo.film.seatCount
          }
        })
      },
      //显示已选择的优惠券
      getCouponExtra(){
        if (this.couponInfo && this.couponInfo.length) {
          return this.couponInfo.map(item => {
            return item.name
          }).reduce((pre, item) => {
            if (pre) {
              pre += `,${item}`
            } else {
              pre += item;
            }
            return pre
          })
        } else {
          return `${this.orderPayWay.canUseCouponNum ? this.orderPayWay.canUseCouponNum : 0}张可用`
        }
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
      padding: 5px 0;
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
  }

</style>
