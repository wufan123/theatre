<template>
  <div class="listCell"  flex="dir:top">
    <div class="listTop"  v-bind:style="topStyle" flex="dir:left ">
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
      props: ['title', 'subtitle',"topImg"],
        data(){
            return {
              topStyle:{backgroundImage:`url(${this.topImg})`}
            }
        },
        methods: {}
    }
</script>
<style lang="less">
  .listTop {
    background: no-repeat center;
    background-size: contain;
    height: 50px;
    padding: 12px;
  }
  .listCell {
    min-height: 180px;
    height: fit-content;
  }
</style>
