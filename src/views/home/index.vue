<template>
  <div class="homeOut" :style="{backgroundImage:`url(${require('assets/images/page_bg.png')})`}">
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
      <div flex="dir:left main:center cross:center" style="justify-content: space-around" class="menuCell">
        <div flex="dir:top main:center cross:center" v-for="(item,index) in munuList"
             @click="$router.push({ path:item.pathName, query:item.params})">
          <img :src="item.icon" flex="main:center cross:center" class="menuItem"/>
          <label>{{item.name}}</label>
        </div>
      </div>
      <list-cell  style="margin-top: 5px;" :topImg="require('assets/images/home/title_session.png')">
        <label slot="rightTop" @click="$router.push('IntroduceList')">更多</label>
        <scroll-view slot="main">
          <div flex="dir:top " v-for="i in 11" class="introduceItem"
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
        <div  :style="{backgroundImage:`url(${require('assets/images/home/session_bg.png')})`}" class="ticketItem" flex="dir:left main:center cross:center">
          <div flex="dir:top">
            <label class="title">《三坊七巷》</label>
            <label class="des">中瑞剧坊，坊巷文化影音秀</label>
            <label class="price">￥228</label>
          </div>
          <img class="button" :src="require('assets/images/home/button.png')">
        </div>
        </scroll-view>
      </list-cell>
      <list-cell   :topImg="require('assets/images/home/title_package.png')">
        <scroll-view slot="main">
          <div  :style="{backgroundImage:`url(${require('assets/images/home/package_bg.png')})`}" class="ticketItem" flex="dir:left main:center cross:center">
            <div flex="dir:top">
              <label class="title">《三坊七巷》</label>
              <label class="des">中瑞剧坊，坊巷文化影音秀</label>
              <label class="price">￥228</label>
            </div>
            <img class="button" :src="require('assets/images/home/button.png')">
          </div>
        </scroll-view>
      </list-cell>
      <list-cell   :topImg="require('assets/images/home/title_stamps.png')">
        <scroll-view slot="main">
          <div v-for="i in 7"  :style="{backgroundImage:`url(${require('assets/images/home/stamps_bg.png')})`}" class="ticketItem" flex="dir:left main:center cross:center">
            <div flex="dir:top">
              <label class="title">《三坊七巷》</label>
              <label class="des">中瑞剧坊，坊巷文化影音秀</label>
              <label class="price">￥228</label>
            </div>
            <img class="button" :src="require('assets/images/home/button.png')">
          </div>
        </scroll-view>
      </list-cell>
      <div flex="dir:left main:center">
        <img :src="require('assets/images/home/convert.png')" class="convert">
      </div>

      <list-cell  :topImg="require('assets/images/home/title_stamps.png')">
        <div slot="main" style="display: flex;flex-wrap: wrap;padding-left: 15px">
            <div flex="dir:top " v-for="i in 11" class="introduceItem" style="margin-top: 20px"
                 @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})">
              <div flex="dir:left">
                <img :src="require('assets/images/home/introduce.png')"  class="contentImgSquare">
                <div class="rightBorder"></div>
              </div>
              <div class="bottomBorder"></div>
              <label class='contentTxt'>缘起三坊，花开七巷</label>
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
  import TheatreApi from 'api/theatreApi'
  const imgList = [
    require('assets/images/home/banner_default.png')
  ]
  const banerList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  const munuList = [{
    name: '限时抢票', 
    pathName: 'FlashSale', 
    icon: require('assets/images/home/flash_sale.png')
  }, {
    name: '超级联合日',
    pathName: 'LocalProduct',
    params: {classType: 101},
    icon: require('assets/images/home/local.png')
  }, {
    name: '福州特产馆', 
    pathName: 'LocalProduct',
    params: {classType: 102},
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
      fetchData(){
        TheatreApi.getInformationList(10).then(success => {
          if (success.data && success.data.length > 0) {
            this.banerList = success.data.map((data) => ({
                url: data.contentUrl,
                img: data.thumbUrl
            }))
          } 
        }, error => {
          console.log(error)
        });
      },
      refresh(){
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";
  .homeOut{
    background:repeat;
    .convert{
      height: 31px;
      width: 135px;
      margin-top: 15px;
    }
    .index-header {
      min-height: 40px;
      padding:5px 10px;
      .logo {
        height: 30px;
      }
      .header-r-icon {
        height: 20px;
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
    .introduceItem {
      overflow: visible;
      margin-right: 15px;
      .bottomBorder{
        background:  @color-primary;
        height:5px;
        margin-left: 7px;
      }
      .rightBorder{
        background: @color-primary;
        width:5px;
        margin-top: 7px;
      }
      .contentImg{
        height: 160px;
        width: 245px;
      }
      .contentImgSquare{
        height: 160px;
        width: 160px;
      }
      .contentTxt{
        text-align: center;
        margin-top: 15px;
      }
    }
    .ticketItem{
      width: 320px;
      height: 105px;
      color: @color-primary;
      background: no-repeat center;
      background-size: contain;
      margin-left: 15px;
      position: relative;
        .title{
          font-size: 16px;
          font-weight: bold;
          margin-left: -5px;
          border-bottom: dashed @color-primary 1px;
        }
        .des{
          font-size: 14px;
        }
        .price{
          font-size: 17px;
          font-weight: bold;
        }
        .button{
          height: 25px;
          width: 45px;
          position: absolute;
          bottom: 15px;
          right: 20px;
        }

    }
    .menuCell {
      height: 100px;
      padding: 22px 22px 0px;
      background:url(../../assets/images/home/menu_bg.png) no-repeat;
      background-size:100% 100%;
    }
    .menuItem{
      height: 60px;
    }
  }
</style>
