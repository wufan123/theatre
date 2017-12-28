<template>
  <div  flex="dir:left cross:center" class="couponItem">
    <div flex="dir:top" :style="{backgroundImage:`url(${require('assets/images/home/card_body.png')})`}" class="left">
      <slot name="right"></slot>
    </div>
    <div flex="dir:top" class="right" :style="{backgroundImage:type?`url(${require('assets/images/home/flash_sale_right_2.png')})`:`url(${require('assets/images/home/flash_sale_right_1.png')})`}">
      <slot name="left"></slot>
    </div>
  </div>
</template>
<script>
    export default {
        props:['type'],
        name:'coupon-item',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="less" scoped>
  .couponItem {
    height: 90px;
    margin: 0px 15px 15px;
    border-radius: 5px;
    .right {
      height: 100%;
      width: 75px;
      background: center no-repeat;
      background-size: 100%100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .left {
      height: 100%;
      flex: 1;
      background: center no-repeat;
      background-size: 100%100%;
      display: flex;
      justify-content: center;
      padding-left: 25px;
    }
  }
</style>
