<template>
  <router-link :to="type?link:''">
  <div class="find">
    <img class="find-vidio"
         :src="img">
    <div class="find-body">
      <p class="title text-ellipsis-line">{{title}}</p>
      <p class="content text-ellipsis">
        {{content}}</p>
    </div>
    <div class="playIcon" flex="dir:top main:center cross:center" v-if="type==3">
      <img :src='require("assets/images/home/video_play.png")'/>
    </div>
  </div>
  </router-link>
</template>
<script>

  export default {
    name: "find-item",
    props: ['img', 'title', 'content','link','type'],
    data(){
      return {}
    }
  }
</script>

<style lang="less" scoped>
  @import "~style/base-variables.less";

  .find {
    position: relative;
    .playIcon{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 240px;
      img{
        width: 60px;
      }
    }
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

