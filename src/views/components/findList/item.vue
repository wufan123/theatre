<template>
  <div class="find">
    <img class="find-vidio"
         :src="img">
    <div class="find-body">
      <p class="title text-ellipsis-line">{{title}}</p>
      <p class="content text-ellipsis">
        {{content}}</p>
    </div>
  </div>
</template>
<script>

  export default {
    name: "find-item",
    props: ['img', 'title', 'content'],
    data(){
      return {}
    }
  }
</script>

<style lang="less" scoped>
  @import "~style/base-variables.less";

  .find {
    .find-vidio {
      width: 345px;
      height: 194px;
      margin: 23px 15px
    }
    .find-body {
      padding: 0 15px;
      .title {
        font-size: 16px;
        border-left: solid @color-sub 5px;
        font-weight: bold;
        padding-left: 7px;
        line-height: 15px;
        width: 100%;
      }
      .content {
        margin-top: 12px;
        text-indent: 2em;
      }
    }
  }
</style>

