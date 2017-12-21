<template>
  <div>
    <div class="index-header" flex="main:justify cross:center">
      <img :src="require('assets/images/logo.png')" class="logo">
      <div class="header-r" flex="cross:center">
        <img :src="require('assets/images/me.png')" class="header-r-icon" @click="$router.push('Test')">
        <img :src="require('assets/images/all.png')" class="header-r-icon" @click="$router.push('ConfirmOrder')">
      </div>
    </div>
    <!--<scroller height="-40" lock-x scrollbar-y :pulldown-config='pullDownConfig' :usePulldown='true' @on-pulldown-loading='refresh' ref="scroller">-->
      <div  style="overflow-y: scroll">
        <swiper :list="demo03_list" auto height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
        <div flex="dir:left main:center cross:center" style="justify-content: space-around" class="MenuCell">
          <div flex="dir:top main:center cross:center" v-for="(item,index) in [{name:'限时抢票',pathName:'FlashSale'},{name:'超级联合日',pathName:'LocalProduct',params:{isHermes:true}},{name:'福州特产馆',pathName:'LocalProduct'}]" @click="$router.push({ name:item.pathName, params:item.params})">
            <div  class="iconItemBg" flex="main:center cross:center">
              icon
            </div>
            <label>{{item.name}}</label>
          </div>
        </div>
        <list-cell title="剧坊" subtitle="介绍" style="margin-top: 10px;" >
          <label slot="rightTop" class="menuItem" @click="$router.push('IntroduceList')">更多</label>
          <scroll-view slot="main">
            <div v-for="i in 11" class="scrollItem" @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})">
              {{i}}
            </div>
          </scroll-view>
        </list-cell>
        <list-cell title="票务·" subtitle="场次票" style="margin-top: 10px" >
          <scroll-view slot="main">
            <div v-for="i in 11" class="scrollItem" @click="$router.push({name:'SessionDetail'})">
              {{i}}
            </div>
          </scroll-view>
        </list-cell>
        <list-cell title="票务" subtitle="通兑券" style="margin-top: 10px">
          <div slot="main" style="display: flex;flex-wrap: wrap">
            <div class="findItem" v-for="i in 7">
              <div slot="content" class="findItemContent">
              </div>
            </div>
          </div>
        </list-cell>
      </div>
    <!--</scroller>-->
  </div>
</template>
<script>
  import {Swiper, GroupTitle, SwiperItem, XButton, Divider, Scroller} from 'vux'
  import ScrollView from 'views/components/simpleScrollView.vue'
  import ListCell from 'views/components/home/listCell.vue'
  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ]
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  export default {
    components: {
      Scroller,
      Swiper, ScrollView, ListCell
    },
    data(){
      return {
        demo03_list: demoList,
        pullDownConfig: {
          content: '下拉可以刷新',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '下拉可以刷新',
          upContent: '松开立即刷新',
          loadingContent: '加载中...',
          clsPrefix: 'xxs-plugin-pullup-'
        }
      }
    },
    methods: {
      refresh(){
          setTimeout(()=>{
            this.$refs.scroller.donePulldown()
          },1000)

      }
    }
  }
</script>
<style lang="less">
  .index-header {    min-height: 50px;
    background: #ffffff;
    padding: 5px 10px;
    .logo {
      width: 80px;
      height: 40px;
    }
    .header-r-icon {
      width: 30px;
      margin-left: 10px;
    }
  }
  .findItemContent {
    flex: 1;
    height: 100px;
    background-color: gray;
    margin: 10px
  }
  .findItem {
    width: 50%;
    display: flex;
    justify-content: center;
    height: fit-content;
    max-width: 50%;
  }
  .scrollItem {
    width: 150px;
    height: 130px;
    background-color: gray;
    margin-right: 30px;
    border-radius: 5%;
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
