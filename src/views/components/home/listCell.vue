<template>
  <div class="listCell" flex="dir:top" style="">
    <div class="listTop" flex="dir:left">
      <label class="menuItem">{{title}}</label>
      <label class="menuItem">{{subtitle}}</label>
      <div flex="dir:right cross:center" flex-box="1">
        <slot name="rightTop"></slot>
      </div>
    </div>
    <slot name="main"></slot>
  </div>
</template>
<script>
    export default {
      name: 'list-cell',
      props: ['title', 'subtitle'],
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="less">
  .listTop {
    margin: 10px 0;
    .menuItem {
      margin: 0 10px;
    }
  }
  .listCell {
    min-height: 200px;
    height: fit-content;
    background-color: white;
  }
</style>
