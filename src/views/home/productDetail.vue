<template>
  <detail-page :data="data" :click="buy" :isHermes="$route.query.classType==102?true:false">

  </detail-page>
</template>
<script>
import PageScroller from "views/components/pageScroller.vue";
import { XButton } from "vux";
import DetailPage from "views/components/detailPage";
import { mapState } from "vuex";
import StoreApi from "api/storeApi";
export default {
  props: ["isHermes"],
  components: { PageScroller, XButton, DetailPage },
  data() {
    return {
      data: {}
    };
  },
  computed: {
    ...mapState("common/", ["userInfo"])
  },
  methods: {
    async buy() {
      this.$vux.loading.show();
      let goodsId = this.data.goodsId;
      let res;
      try {
        res = await StoreApi.createGoodsOrder(
          this.userInfo.bindmobile,
          `${goodsId}:1`
        );
      } catch (e) {
        this.$util.showRequestErro({
          text: "卖品已下架"
        });
      }
      if (res && res.data) {
        let orderId = res.data;
        // 清空优惠券缓存
        this.$store.commit("coupon/setGoodsCouponList", null);
        this.$router.push({
          name: "ConfirmGoodOrder",
          query: {
            goodsId,
            orderId
          }
        });
      }
      this.$vux.loading.hide();
    },
    async fetchData() {
      let res = await StoreApi.getGoodsDetail(this.$route.query.hyGoodsId);
      if (res && res.data) {
        this.data = res.data.goodInfo;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~style/base-variables";

.primeCost {
  text-decoration: line-through;
}

.ImgOut {
  width: 100%;
  height: 250px;
  img {
    height: 250px;
    width: 100%;
  }
}

.mainOut {
  position: relative;
  width: 100%;
  .mainBody {
    position: absolute;
    z-index: 100;
    background-color: @page_bg2;
    margin: -40px auto 20px;
    padding: 20px;
    width: 295px;
    .content {
      margin-top: 20px;
      text-indent: 2em;
      text-align: left;
      width: 100%;
    }
    .divider {
      overflow: hidden;
      position: relative;
      width: 100%;
    }
    .dividerLine {
      top: 27px;
      left: 0;
      border-bottom: dotted @color-sub 1px;
      position: absolute;
      width: 100%;
      z-index: 2;
    }
    .dividerTitle {
      background: @page_bg2 url(../../assets/images/home/title_bg.png) center
        no-repeat;
      background-size: 100% 100%;
      z-index: 3;
      width: 128px;
      height: 34px;
      color: @color-sub;
      position: relative;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 34px;
      margin: 10px 0px;
    }
    .title {
      font-size: 20px;
      color: @font-color;
    }
    .price {
      color: @color-sub;
      font-size: 21px;
    }
  }
}
</style>
