<template>
  <page :headerTitle="`购买成功`">
    <div slot="contain" flex="dir:top cross:center">
      <img :src="require('assets/images/pay/success.png')" class="result"/>
      <img :src="require('assets/images/pay/check_order.png')" class="resultTip"/>
    </div>
  </page>
</template>
<style lang="less" scoped>
  .result{
    height: 80px;
    width: 80px;
    margin-top: 45px;
  }
  .resultTip{
    height: 31px;
    width: 175px;
    margin-top: 56px;
  }
</style>

