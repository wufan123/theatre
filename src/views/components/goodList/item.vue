<template>
  <div flex="dir:left cross:center" class="couponItem">
    <div flex="dir:left" flex-box="3">
      <div flex="dir:left cross:center">
        <img :src="goodsCoverImage" class="goodImg">
      </div>
      <div flex="dir:top"  flex-box="1" class="content">
        <label class="title text-ellipsis-line">{{goodsName}}</label>
        <div class="info">
          <label class="price">￥{{channelFee}}</label>
          <label class="primeCost" v-if="marketFee>0">￥{{marketFee}}</label>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
    export default {
        name:'good-item',
        props:['goodsCoverImage','goodsName','channelFee','marketFee'],
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="less">
  @import "~style/base-variables.less";
  .couponItem{
    height: 100px;
    margin:0 15px 10px;
    padding: 10px;
    background: url(../../../assets/images/home/sale_bg.png) center no-repeat;
    background-size: 100%100%;
    .buyBtn{
      margin: 40px 10px 0 0;
    }
    .goodImg{
      width: 100px;
      height: 62px;
      margin-left: 10px;
    }
    .content{
      .title{
        margin-left: 5px;
        font-size: 15px;
        height: 24px;
        color: @font-color;
        width: 105px;
        overflow: hidden;
      }
      .info{
        width: 105px;
        margin-top: 10px;
        .price{
          font-size: 20px;
          color: @color-primary2;
          font-weight: bold;
        }
      }
    }
  }
</style>
