<template>
  <div class="homeOut">
    <div class="index-header" flex="main:justify cross:center">
      <img :src="require('assets/images/logo.png')" class="logo">
      <div class="header-r" flex="cross:center">
        <img :src="require('assets/images/me.png')" class="header-r-icon" @click="$router.push('Me')">
        <img :src="require('assets/images/all.png')" class="header-r-icon" @click="$router.push('SessionDetail')">
      </div>
    </div>
    <!--<scroller height="-40" lock-x scrollbar-y :pulldown-config='pullDownConfig' :usePulldown='true' @on-pulldown-loading='refresh' ref="scroller">-->
    <div style="overflow-y: scroll">
      <swiper :list="banerList" auto height="251px" dots-class="custom-bottom" dots-position="center"></swiper>

      <div flex="dir:left main:center cross:center" style="justify-content: space-around" class="MenuCell">
        <div flex="dir:top main:center cross:center" v-for="(item,index) in munuList"
             @click="$router.push({ name:item.pathName, params:item.params})">
          <img :src="item.icon" flex="main:center cross:center" class="menuItem"/>
          <label>{{item.name}}</label>
        </div>
      </div>
      <list-cell  style="margin-top: 5px;" :topImg="require('assets/images/home/title_session.png')">
        <label slot="rightTop" @click="$router.push('IntroduceList')">更多</label>
        <scroll-view slot="main">
          <div flex="dir:top " v-for="i in 11" class="scrollItem"
               @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})">
            <div flex="dir:left">
              <img :src="require('assets/images/home/introduce.png')"  class="contentImg">
              <div class="rightBorder"></div>
            </div>
            <div class="bottomBorder"></div>
            <label class='contentTxt'>缘起三坊，花开七巷</label>
          </div>
        </scroll-view>
      </list-cell>
      <list-cell   :topImg="require('assets/images/home/title_session.png')">
        <scroll-view slot="main">
        <div> 

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
    require('assets/images/home/default.png'),
    require('assets/images/home/default.png'),
    require('assets/images/home/default.png')
  ]
  const banerList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  const munuList = [{name: '限时抢票', pathName: 'FlashSale', icon: require('assets/images/home/flash_sale.png')}, {
    name: '超级联合日',
    pathName: 'LocalProduct',
    params: {isHermes: true},
    icon: require('assets/images/home/local.png')
  }, {
    name: '福州特产馆', pathName: 'LocalProduct',
    icon: require('assets/images/home/hemers.png')
  }];
  export default {
    components: {
      Scroller,
      Swiper, ScrollView, ListCell
    },
    data(){
      return {
        banerList: banerList,
        pullDownConfig: {
          content: '下拉可以刷新',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '下拉可以刷新',
          upContent: '松开立即刷新',
          loadingContent: '加载中...',
          clsPrefix: 'xxs-plugin-pullup-'
        },
        munuList:munuList
      }
    },
    methods: {
      refresh(){
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)

      }
    }
  }
</script>
<style lang="less" scoped>
  .homeOut{
    background: #fff;
    .index-header {
      min-height: 50px;
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
      overflow: visible;
      margin-right: 15px;
      .bottomBorder{
        background: #c5a984;
        height:5px;
        margin-left: 7px;
      }
      .rightBorder{
        background: #c5a984;
        width:5px;
        margin-top: 7px;
      }
      .contentImg{
        height: 160px;
        width: 245px;
      }
      .contentTxt{
        text-align: center;
        margin-top: 15px;
      }
    }
    .MenuCell {
      height: 100px;
      padding: 22px;
      background:url(../../assets/images/home/menu_bg.png) no-repeat;
      background-size:100% 100%;
    }
    .menuItem{
      height: 60px;
    }
  }
</style>
