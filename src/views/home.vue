<template>
  <div>
    <div class="index-header" flex="main:justify cross:center">
      <img src="../assets/images/logo.png" class="logo">
      <div class="header-r" flex="cross:center">
        <img src="../assets/images/me.png" class="header-r-icon" @click="$router.push('Me')">
        <img src="../assets/images/all.png" class="header-r-icon">
      </div>
    </div>
    <swiper :list="demo03_list" auto height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
    <div flex="dir:right main:center cross:center" style="justify-content: space-around" class="MenuCell">
      <div class="iconItemBg" flex="main:center cross:center">
        1
      </div>
      <div class="iconItemBg" flex="main:center cross:center">
        2
      </div>
      <div class="iconItemBg" flex="main:center cross:center">
        3
      </div>
    </div>
    <div class="theatreCell" flex="dir:top">
      <div class="theatreTop" flex="dir:left">
        <label class="menuItem">剧坊</label>
        <label class="menuItem">介绍</label>
        <div flex="dir:right cross:center" flex-box="1">
          <label class="menuItem" @click="$router.push({path:'/Test'})">更多</label>
        </div>
      </div>
      <scroll-view >
          <div slot="content" v-for="i in 7" class="scroll-item">
          </div>
      </scroll-view>
    </div>

  </div>
</template>
<script>
  import {Swiper, GroupTitle, SwiperItem, XButton, Divider,Scroller} from 'vux'
  import ScrollView from './components/scrollView.vue'
  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ]
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }))
  export default {
    components: {
      Swiper,ScrollView
    },
    data(){
      return {
        demo03_list: demoList
      }
    },
    methods: {}
  }
</script>
<style lang="less">
  .index-header{
    background: #ffffff;
    padding: 5px 10px;
    .logo{width: 100px;height: 60px; }
    .header-r-icon{width: 30px;margin-left: 10px;}
  }
  
  .scroll{
    display: -webkit-box;
    overflow-x: scroll;
    height: fit-content;
    padding: 0 10px;
    -webkit-overflow-scrolling:touch;
  }
  .scroll-item{
    width: 200px;
    height: 150px;
    background-color: gray;
    margin-right: 30px;
    border-radius: 5%;
  }
  .theatreTop {
    margin: 10px 0;
    .menuItem{
      margin: 0 10px;
    }
  }
  .theatreCell {
    min-height: 200px;
    height: fit-content;
    background-color: white;
    margin-top: 10px;
  }

  .MenuCell {
    height: 100px;
    background-color: white;
  }

  .iconItemBg {
    height: 49px;
    width: 49px;
    background-color: #9ed99d;
    border-radius: 50%;
  }

</style>
