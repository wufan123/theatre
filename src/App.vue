<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "style/base-variables";
  @import "style/reset";
  @import "style/common";
  #app {
    height: 100%;
    > div {
      height: 100%
    }
  }
</style>
