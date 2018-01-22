<template>
  <div flex="dir:left cross:center" class="goodItem">
      <div flex="dir:left cross:center">
        <img :src="goodsCoverImage" class="goodImg">
      </div>
      <div flex="dir:top" class="content">
        <p class="title text-ellipsis-line">{{goodsName}}</p>
        <div class="info">
          <label class="price">￥{{channelFee}}</label>
          <label class="primeCost " v-if="marketFee>0">￥{{marketFee}}</label>
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
    margin:10px 15px 10px;position: relative;
    background: url(../../../assets/images/home/sale_bg.jpg) center no-repeat;
    background-size: 100% 100%;
    .primeCost{color: #878787;text-decoration: line-through}
    .buyBtn{
      position:absolute;right:20px;bottom:20px;
    }
    .goodImg{
      width: 101px;
      height: 68px;
      margin-left: 15px;
    }
    .content{margin-left: 10px;overflow: hidden;margin-right: 10px;border:1px solid red;  flex: 1;
      .title{
        margin-left: 5px;
        font-size: 15px;
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
