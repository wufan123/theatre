<template>
  <div flex="dir:left cross:center" class="goodItem">
      <div flex="dir:left cross:center">
        <img :src="goodsCoverImage" class="goodImg">
      </div>
      <div flex="dir:top" class="content">
        <p class="title text-ellipsis-line">{{goodsName}}</p>
        <div class="info">
          <label class="price">￥{{channelFee}}</label>
          <label class="primeCost" v-if="marketFee>0">￥{{marketFee}}</label>
        </div>
      </div>
      <slot></slot>
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
<style lang="less" >
  @import "~style/base-variables.less";
  .goodItem{
    height: 100px;
    margin:10px 15px 10px;
    padding: 10px;
    background: url(../../../assets/images/home/sale_bg.png) center no-repeat;
    background-size: 100% 100%;
    .buyBtn{
      position:absolute;right:30px;bottom:55px;
    }
    .goodImg{
      width: 101px;
      height: 68px;
      margin-left: 10px;
    }
    .content{margin-left: 10px;overflow: hidden;
      .title{
        margin-left: 5px;
        font-size: 15px;
        height: 24px;
        color: @font-color;
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
