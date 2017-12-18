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
      <div class="theatreCell" flex="dir:top">
        <div class="theatreTop" flex="dir:left">
            <label>剧坊</label>
            <label>介绍</label>
           <label>更多</label>
        </div>
      </div>
    </div>
</template>
<script>
    import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
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
        Swiper
      },
        data(){
            return {
              demo03_list:demoList
            }
        },
        methods: {

        }
    }
</script>
<style lang="less">
  .theatreTop{

  }
  .theatreCell{
    height: 200px;
    background-color: white;
    margin-top: 10px;
  }
  .MenuCell {
    height: 100px;
    background-color: white;
  }
  .iconItemBg {
    height:49px;
    width: 49px;
    background-color: #9ed99d;
    border-radius: 50%;
  }

</style>
