<template>
  <page :headerTitle="`购买成功`" :backFunc="backHome">
    <div slot="contain" flex="dir:top cross:center">
      <img :src="require('assets/images/pay/success.png')" class="result"/>
      <router-link :to="getLinkPath()">
        <img :src="require('assets/images/pay/check_order.png')" class="resultTip"/>
      </router-link>
    </div>
  </page>
</template>
<script>
  export default{
    methods: {
      getLinkPath(){
        switch (this.$route.query.orderType) {
          case 'goods':
            return '/LocalProductList';
          default:
            return '/TicketList'
        }
      },
      backHome(){
        this.$router.push('Home')
      }
    }
  }
</script>
<style lang="less" scoped>
  .result {
    height: 80px;
    width: 80px;
    margin-top: 45px;
  }

  .resultTip {
    height: 31px;
    width: 175px;
    margin-top: 56px;
  }
</style>

