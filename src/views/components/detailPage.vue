<template>
  <page headerTitle="详情" flex-box="1">
    <div slot="contain">
      <div class="ImgOut">
        <img :src="data.goodsImg" />
      </div>
      <div class="mainOut">
        <div class="mainBody" flex="dir:top cross:center">
          <label class="title mb10 bold">
            {{data.goodsName}}</label>
          <label class="price">
            ￥{{data.price}}</label>
          <label class="primeCost" v-if="isHermes">
            ￥{{data.showPrice}}</label>
          <div flex="main:center cross:center" class="divider">
            <label class="dividerTitle">
              商品介绍
            </label>
            <div class="dividerLine"></div>
          </div>
          <div class="content">
            {{data.detail}}
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <x-button class="no-radius bottomBtn" type="primary" :style="$util.isIphoneX()?{'margin-bottom':'14px'}:{}" @click.native="click">马上购买</x-button>
    </div>
  </page>
</template>
<script>
import PageScroller from "views/components/pageScroller.vue";
import { XButton } from "vux";
export default {
  name: "detail-page",
  props: {
    data: {
      type: Object,
      default: {}
    },
    click: Function,
    isHermes: Boolean
  },
  components: { PageScroller, XButton },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less">
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
    // position: absolute;
    z-index: 0;
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
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .dividerLine {
      border-bottom: dotted @color-sub 1px;
      top: 27px;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 2;
    }
    .dividerTitle {
      background: @page_bg2 url(../../assets/images/home/title_bg.png) center
        no-repeat;
      background-size: 100%100%;
      z-index: 3;
      width: 128px;
      position: relative;
      height: 34px;
      color: @color-sub;
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
