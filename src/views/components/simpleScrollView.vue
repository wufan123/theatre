<template>
  <div class="scroll">
    <slot ></slot>
  </div>
</template>
<script>
  export default {
      name:'scroll-view',
    data(){
      return {}
    },
    methods: {

    }
  }
</script>
<style lang="less">
  .scroll {
    display: -webkit-box;
    overflow-x: scroll;
    height: fit-content;
    padding: 0 10px;
    -webkit-overflow-scrolling: touch;
  }
</style>
