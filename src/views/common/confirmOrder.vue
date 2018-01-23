<template>
  <page :headerTitle="`确认订单`" :backFunc="goBack" :footerText="`支付`" :footerFunc="lockAndPayOrder">
    <div slot="contain">
      <div class="c-order">
        <div class="c-info">
          <list twoLine>
            <div class="good-content">
              <list-item :img="orderInfo.film&&orderInfo.film.image" extra="">
                <div slot="contentTitle" flex="main:justify">
                  <div flex-box="1" class="text-ellipsis-line">{{orderInfo.film.filmName}}</div>
                  <label flex-box="0" class="o-price">￥{{orderInfo.film.price}}</label>
                </div>
                <div slot="contentBrief" flex="main:justify">
                  <label class="f12" v-if="orderInfo.film._startTime">{{orderInfo.film._startTime}}场</label>
                  <label class="f14">x {{orderInfo.film.seatCount}}</label>
                </div>
              </list-item>
            </div>
            <div v-if="orderInfo.goods&&orderInfo.goods.list">
              <list-item v-for="item in orderInfo.goods.list" :key="item.name" :img="item.goodsImg" extra="">
                <div slot="contentTitle" flex="main:justify">
                  <label class="text-ellipsis-line">{{item.name}}</label>
                  <label class="o-price">￥{{item.price}}</label>
                </div>
                <div slot="contentBrief" flex="main:justify">
                  <label></label>
                  <label class="f14">x {{item.number}}</label>
                </div>

              </list-item>
            </div>
          </list>
        </div>
        <div class="c-info" v-if="goodsCouponLists.length">
          <list>
            <list-item content="卖品优惠券" :extra="goodsCoupinLineStr" isLink
                       @click.native="selectSaleCouponClick"></list-item>
          </list>
        </div>
        <div class="c-info" v-if="filmCouponList.length">
          <list>
            <list-item content="影票优惠券" :extra="filmCoupinLineStr" isLink @click.native="selectCouponClick"></list-item>
          </list>
        </div>
        <div class="c-info" v-if="memberCardList.length>0">
          <list>
            <list-item :content="`会员卡`" :extra="useCard?useCard.cardId:'未选择'" isLink
                       @click.native="$router.push({name:'SelectMember',params:{ list:orderPayWay.memberCard }})"></list-item>
          </list>
        </div>
        <div class="price">
          <div class="flexb" flex="main:justify"><label>总价 <label class="tip" v-if="isUseCard">会员卡优惠</label>
            </label><label>￥{{orderInfo._price}}</label></div>

          <div class="flexb" flex="main:justify" v-for="(item,index) in couponListStr" :key="index">
            <label>{{item.name}}</label><label>{{item.value}}</label></div>

          <!-- <div class="flexb" v-for="(item,index) in saleCouponInfo" :key="'sale'+index">
            <label>{{item.name}}</label><label>{{item.des}}</label></div> -->
          <div class="flexb payment" flex="main:justify">
            <label>实付款</label><label>￥{{amount}}</label></div>
        </div>
      </div>
      <group>
        <x-input class="phoneInput" title="手机号" keyboard="number" is-type="china-mobile" name="mobile" ref="phone"
                 v-model="orderInfo.phone"></x-input>
      </group>
      <div class="info"><p>温馨提示：</p>
        <p>手机号用于生成订单，及发送支付短信</p></div>
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
        orderDetail: {
          orderId: "",
          orderType: "goodsAndFilm"
        },
        orderPayWay: "",
        orderInfo: {
          film: {},
          goods: {}
        },
        amount: 0, //最后总价
        selectGoodsCoupon: null,
        selectFilmCoupon: null,
        useCard: null,
        isUseCard: false,
        oldPhone: null,
        clearTime: null,
        destoryCancelOrder: true,

        goodsCouponLists: [],   //卖品优惠券列表
        goodsCoupinLineStr: '',
        filmCouponList: [],   //票券优惠券列表
        filmCoupinLineStr: '',
        memberCardList: [],   //会员卡列表
        couponListStr: [],
        selectType: null, // 选择类型
        checkOutTicket: false
      }
    },
    computed: {
      ...mapState('business', ['selectedMember']),
      ...mapState('coupon', ['ticketCouponList', 'goodsCouponList']),
      ...mapState('common', ['promotion', 'userInfo'])
    },

    methods: {
      async fetchData(){
        this.goodsCouponLists = this.goodsCouponList
        this.filmCouponList = this.ticketCouponList
        this.memberCardList = []
        this.couponListStr = []


        this.orderDetail.orderId = this.$route.query.orderId
        this.isUseCard = this.$util.isEmptyObject(this.selectedMember) ? false : true;
        this.useCard = this.selectedMember

        this.phone = this.$store.state.common.userInfo.bindmobile;
        this.oldPhone = this.phone;


        // 获取优惠券信息
        this.$vux.loading.show();
        let wayRes;
        try {
          wayRes = await StoreApi.getOrderPayWay(this.orderDetail.orderId, this.orderDetail.orderType);
        } catch (e) {
          this.$vux.toast.text(e.text);
        }
        if (wayRes && wayRes.data) {
          this.orderPayWay = wayRes.data;
          let res = wayRes.data

          if (this.orderPayWay.payTime) {
            let _this = this;
            _this.clearTime = setInterval(() => {
              if (_this.orderPayWay.payTime > 0) {
                _this.orderPayWay.payTime--
                _this.orderPayWay._payTime = parseInt(_this.orderPayWay.payTime / 60) + ":" + parseInt(_this.orderPayWay.payTime % 60)
              } else {
                //取消订单
                clearInterval(_this.clearTime)
                AlertModule.show({
                  title: '提示',
                  content: '支付超时，订单已取消，请重新购买',
                  onHide () {
                    _this.$router.push('Home')
                  }
                })
              }
            }, 1000)
          }
          this.orderPayWay._orderPrice = wayRes.data.orderPrice.toFixed(2)
          //影票优惠券判断
          console.log('!this.ticketCouponList', !this.goodsCouponList.length)
          if (!this.ticketCouponList.length && res.couponList && res.couponList.length > 0) {
            this.filmCouponList = this.orderPayWay.couponList
            this.$store.commit('coupon/setTicketCouponList', this.orderPayWay.couponList);
          }
          //卖品优惠券判断
          if (!this.goodsCouponList.length && res.saleCouponList && res.saleCouponList.length > 0) {
            this.goodsCouponLists = this.orderPayWay.saleCouponList
            this.$store.commit('coupon/setGoodsCouponList', this.orderPayWay.saleCouponList)
          }
          // 会员卡
          if (res.memberCard && res.memberCard.length > 0) {
            res.memberCard.forEach(element => {
              this.memberCardList.push(element)
            })
          }
          this.caculateCount()
        }
        // 获取订单信息
        let orderRes;
        try {
          orderRes = await OrderApi.getCinemaOrderInfo(this.orderDetail.orderId);
        } catch (e) {
//          this.$util.showRequestErro(e);
          this.$vux.toast.text(e.text);
        }
        if (orderRes && orderRes.data) {
          this.orderInfo = orderRes.data;
          this.orderInfo.film._startTime = new Date(orderRes.data.film.startTime * 1000).format('yyyy-MM-dd hh:mm:ss')
          //服务费&价格
          let seatArr = {}
          let _serviceFee = 0
          this.orderInfo.film._priceStr = ''
          this.orderInfo.film.seatInfo.forEach(e => {
            let seatPieceName = e.seatPieceName
            let seatPieceNo = e.seatPieceNo
            _serviceFee += parseFloat(e.serviceCharge)

            if (seatArr[seatPieceNo]) {
              seatArr[seatPieceNo]["count"] += 1
            } else {
              seatArr[seatPieceNo] = {};
              seatArr[seatPieceNo]["count"] = 1
              seatArr[seatPieceNo]["price"] = parseFloat(e.oldPrice).toFixed(2)
              seatArr[seatPieceNo]["name"] = seatPieceName
            }
          })
          for (let key in seatArr) {
            if (this.orderInfo.film._priceStr)
              this.orderInfo.film._priceStr += "+"
            this.orderInfo.film._priceStr += seatArr[key].name + seatArr[key].price + "*" + seatArr[key].count
          }
          // $.each(seatArr, function(i, v) { _str += i + v.price + "*" + v.count });
          this.orderInfo.film._priceStr += "(含服务费¥" + _serviceFee.toFixed(2) + ")"
          this.orderInfo.phone = this.$store.state.common.userInfo.bindmobile
          this.oldPhone = this.orderInfo.phone
          this.caculateCount()

          // this.caculateCount();
        }
        this.$vux.loading.hide();
      },
      // 计算总价
      caculateCount: function () {
        let goodsPrice = 0;
        let filmPrice = 0;
        let couponPrice = 0;

        if (this.orderInfo) {
          //初始化显示订单价格
          this.orderInfo.film.price = this.orderInfo.film.price ? this.orderInfo.film.price : 0
          this.orderInfo.film._price = parseFloat(this.orderInfo.film.price)
          //如果有使用会员卡
          if (this.isUseCard) {

            if (this.useCard.totalSettlementPrice) {
              this.orderInfo.film._price = parseFloat(this.useCard.totalSettlementPrice)
            } else {//旧版接口兼容
              this.orderInfo.film._price = parseFloat(this.useCard.settlementPrice) * parseInt(this.orderInfo.film.seatCount)
            }
          }
          this.orderInfo._price = this.orderInfo.film._price + (this.orderInfo.goods ? parseFloat(this.orderInfo.goods.price) : 0)
          goodsPrice = parseFloat(this.orderInfo.goods ? this.orderInfo.goods.price : 0)
          filmPrice = parseFloat(this.orderInfo.film._price)
        }

        this.couponListStr = []
        if (this.goodsCouponLists.length > 0) {
          let goodsCouponPrice = 0
          this.goodsCoupinLineStr = ''
          this.goodsCouponLists.forEach(item => {
            if (item.checked) {
              let amount = parseFloat(item.ticketValue)
              let couponRet = (goodsCouponPrice + amount) < goodsPrice ? amount : (goodsPrice - goodsCouponPrice)
              goodsCouponPrice += couponRet
              this.couponListStr.push({
                name: '卖品优惠',
                value: '-￥' + couponRet
              })
              if (this.goodsCoupinLineStr) this.goodsCoupinLineStr += ','
              this.goodsCoupinLineStr += item.voucherName
            }
          })
          if (!this.goodsCoupinLineStr) {
            let canUseCount = 0;
            this.goodsCouponLists.forEach(item => {
              if (item.status == 1) {
                canUseCount++;
              }
            })
            this.goodsCoupinLineStr = '共' + canUseCount + '张可用'
          }
          couponPrice += goodsCouponPrice;
        }
        if (this.filmCouponList.length > 0) {
          let voucherType;
          let filmCouponPrice = 0;
          this.filmCoupinLineStr = ''
          this.filmCouponList.forEach(item => {
            if (item.checked) {
              voucherType = item.voucherType
              if (voucherType != 0) {
                let amount = parseFloat(item.ticketValue)
                let couponRet = (filmCouponPrice + amount) < filmPrice ? amount : (filmPrice - filmCouponPrice)
                filmCouponPrice += couponRet
                this.couponListStr.push({
                  name: '影票优惠',
                  value: '-￥' + couponRet
                })
              } else {
                filmCouponPrice++;
              }
              if (this.filmCoupinLineStr) this.filmCoupinLineStr += ','
              this.filmCoupinLineStr += item.voucherName
            }
          })
          if (voucherType == 0) {
            filmPrice = 0
            this.filmCouponList.forEach(item => {
              if (item.checked) {
                filmPrice += parseFloat(item.ticketValue)
              }
            })
            this.couponListStr.push({
              name: '已兑换',
              value: filmCouponPrice + '张票'
            })
            this.filmCoupinLineStr = '已选兑换券' + filmCouponPrice + '张'
          } else {
            couponPrice += filmCouponPrice;
          }
          if (!this.filmCoupinLineStr) {
            let canUseCount = 0;
            this.filmCouponList.forEach(item => {
              if (item.status == 1) {
                canUseCount++;
              }
            })
            this.filmCoupinLineStr = '共' + canUseCount + '张可用'
          }
        }

        this.amount = (goodsPrice + filmPrice - couponPrice).toFixed(2)
        if (this.orderInfo) {
          this.orderInfo.film._price = parseFloat(this.orderInfo.film._price).toFixed(2)
          this.orderInfo._price = parseFloat(this.orderInfo._price).toFixed(2)
        }
      },
      getSelectCouponStr(){
        var couponStr = ""
        this.goodsCouponLists.forEach(item => {
          if (item.checked) {
            couponStr += item.voucherNum + ','
          }
        })
        this.filmCouponList.forEach(item => {
          if (item.checked) {
            couponStr += item.voucherNum + ','
          }
        })
        if (couponStr != "") {
          couponStr = couponStr.substr(0, couponStr.length - 1)
        }
        return couponStr
      },
      // 锁定，跳转到支付页面
      async lockAndPayOrder() {
        if (!this.$refs.phone.valid) {
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
          OrderApi.updateOrderMobile(this.phone, this.orderDetail.orderId)
        }
        this.$vux.loading.show();
        // 优惠券信息
        var couponStr = this.getSelectCouponStr()
        // 会员卡信息
        let cardId = null
        if (this.useCard) {
          cardId = this.useCard.id
        }
        let res;
        try {
          res = await  StoreApi.getOrderPayLock(this.orderDetail.orderId, this.orderDetail.orderType, cardId, couponStr);
        } catch (e) {
          this.$util.showRequestErro(e);
        }
        if (res && !this.$util.isEmptyObject(res.data)) {
          var params = {}
          params.type = this.promotion.type ? this.promotion.type : 2;
          params.sn = this.orderDetail.orderId;
          params.toer = this.userInfo.bindmobile;
          params.price = res.data.price;
          params.ticketsCnt = this.orderInfo.film.seatCount;
          //推广完成
          TheatreApi.finishPromotion(params);
          //价格为0时直接支付
          if (res.data.price == 0) {
            this.$vux.loading.show({
              text: '正在支付'
            });
            let payRes;
            try {
              payRes = await StoreApi.goodsAndFilmComfirmNewPay(this.orderDetail.orderId, this.orderDetail.orderType, "account", 0, null);
            } catch (e) {
              this.$util.showRequestErro(e);
            }
            if (payRes && payRes.status == 0) {
              this.$vux.loading.show({text: '正在出票'});
              this.checkOrderStatus()
            }

          } else {
//            if (cardId)
            // this.$vux.toast.text("会员卡余额不足", 'bottom');
            this.$store.commit("business/setPayLockInfo",
              {
                orderId: this.orderDetail.orderId,
                orderType: this.orderDetail.orderType,
                ...res.data
              });
            this.$router.push({
              name: 'PayOrder'
            })
          }
        }
        this.$vux.loading.hide();
      },
      async checkOrderStatus(){
        console.log('11111')
        let statusRes;
        try {
          statusRes = await  OrderApi.getOrderStatus(this.orderDetail.orderId);
        } catch (e) {
          this.checkOrderStatus();
          // this.$util.showRequestErro(e)
        }
        if (!statusRes.data || !statusRes.data.orderInfo || statusRes.data.orderInfo.orderStatus == 0) {
          this.checkOrderStatus();
        } else if (statusRes.data.orderInfo.orderStatus == 3) {
          this.$router.push({name: 'PaySuccess'})
        } else {
          this.$util.showRequestErro({text: '出票失败----'})
          this.$router.push({name: 'TicketList'})
        }

        // if (statusRes && statusRes.data && statusRes.data.orderInfo && statusRes.data.orderInfo && statusRes.data.orderInfo.orderStatus == '3'){
        //   this.$router.push({ name: 'PaySuccess' })
        // }else{
        //     this.$util.showRequestErro({text:'出票失败'})
        //   this.$router.push({name:'TicketList'})
        // }
      },
      // 选择优惠券
      selectCouponClick() {
        this.$router.push({
          name: 'SelectCoupon',
          query: {
            seatCount: this.orderInfo.film.seatCount
          }
        })
      },
      selectSaleCouponClick() {
        this.$router.push({
          name: 'SelectCoupon',
          query: {
            orderType: "goods"
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
      },
      getSaleCouponExtra(){
        if (this.saleCouponInfo && this.saleCouponInfo.length) {
          return this.saleCouponInfo.map(item => {
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
          return `${this.orderPayWay.saleCouponList ? this.orderPayWay.saleCouponList.length : 0}张可用`
        }
      },
      goBack(){
        var _this = this
        this.$vux.confirm.show({
          title: "温馨提示",
          content: "当前订单将被取消，确定要返回吗？",
          confirmText: "继续支付",
          cancelText: "确认返回",
          onCancel() {
            // 关闭订单
            OrderApi.cancelOrder(_this.orderDetail.orderId).then(
              success => {
                _this.$router.push('SessionDetail')
              },
              error => {
                // _this.$vux.toast.show({
                //   type: "cancel",
                //   text: "订单取消失败"
                // });
                _this.$router.push('SessionDetail')
              }
            );
          }
        });
      },
    },

    components: {List, ListItem, XInput, Group}
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";

  .o-price {
    font-size: 17px;
    color: #c4a983;
    font-weight: bold;
  }

  .tip {
    font-size: 12px;
    color: @color-active;
    border: 1px solid @color-active;
  }

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
