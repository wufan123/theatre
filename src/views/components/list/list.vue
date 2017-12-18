<template>
  <div class="am-list">
    <div class="am-list-header" v-if="!!title">{{title}}<slot name="title"></slot></div>
    <div class="am-list-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      twoLine: Boolean
    },
    mounted () {

    }
  }
</script>

<style lang="less">
@import url('./list.less');
</style>
