<template>
  <div>
    <x-header :left-options="{showBack: false}">主页</x-header>
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
    <!--<div class="theatreCell" flex="dir:top">
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
    </div>-->
    <list-cell title="剧坊" subtitle="介绍" style="margin-top: 10px">
      <label slot="rightTop" class="menuItem" @click="$router.push({path:'/Test'})">更多</label>
      <scroll-view slot="main">
        <div slot="content" v-for="i in 11" class="scrollItem">
          {{i}}
        </div>
      </scroll-view>
    </list-cell>
    <list-cell title="票务" subtitle="场次票" style="margin-top: 10px">
      <scroll-view slot="main">
        <div slot="content" v-for="i in 11" class="scrollItem">
          {{i}}
        </div>
      </scroll-view>
    </list-cell>
    <list-cell title="票务" subtitle="通兑券">
      <scroll-view slot="main">
        <div slot="content" v-for="i in 11" class="scrollItem">
          {{i}}
        </div>
      </scroll-view>
    </list-cell>
    <list-cell title="票务" subtitle="通兑券" style="margin-top: 10px">
      <div slot="main" style="display: flex;flex-wrap: wrap" >
        <div class="findItem" v-for="i in 7" ><div slot="content" class="findItemContent"> 
        </div></div>
      </div>
    </list-cell>

  </div>
</template>
<script>
  import {Swiper, GroupTitle, SwiperItem, XButton, Divider, Scroller} from 'vux'
  import ScrollView from './components/scrollView.vue'
  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ]
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  let listCell = {
    name: 'list-cell',
    template: `<div class="listCell" flex="dir:top">
      <div class="listTop" flex="dir:left">
        <label class="menuItem">{{title}}</label>
        <label class="menuItem">{{subtitle}}</label>
        <div flex="dir:right cross:center" flex-box="1">
          <slot name="rightTop"></slot>
        </div>
      </div>
          <slot name="main"></slot>
    </div>`,
    props: ['title', 'subtitle']
  }
  export default {
    components: {
      Swiper, ScrollView, listCell
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
  .findItemContent{
    flex: 1;height:100px;background-color: gray;margin: 10px
  }
  .findItem{
    width: 50%;display: flex;justify-content:center;height: fit-content;max-width: 50%;
  }
  .scroll {
    display: -webkit-box;
    overflow-x: scroll;
    height: fit-content;
    padding: 0 10px;
    -webkit-overflow-scrolling: touch;
  }

  .scrollItem {
    width: 150px;
    height: 130px;
    background-color: gray;
    margin-right: 30px;
    border-radius: 5%;
  }

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
