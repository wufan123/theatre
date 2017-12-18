<template>
    <div>
      <x-header :left-options="{showBack: false}">主页</x-header>
      <swiper :list="demo03_list" auto height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
      <div flex="dir:right main:center cross:center">
        <label>
          1
        </label>
        <label>
          2
        </label>
        <label>
          3
        </label>
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
</style>
