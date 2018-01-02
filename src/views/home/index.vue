<template>
  <div class="homeOut" :style="{backgroundImage:`url(${require('assets/images/page_bg.png')})`}">
    <div class="index-header" flex="main:justify cross:center">
      <img :src="require('assets/images/logo.png')" class="logo">
      <div class="header-r" flex="cross:center">
        <img :src="require('assets/images/me.png')" class="header-r-icon" @click="$router.push('Me')">
        <img :src="require('assets/images/all.png')" class="header-r-icon" @click="$router.push('FindList')">
      </div>
    </div>
    <!--<scroller height="-40" lock-x scrollbar-y :pulldown-config='pullDownConfig' :usePulldown='true' @on-pulldown-loading='refresh' ref="scroller">-->
    <div style="overflow-y: scroll">
      <!--广告-->
      <swiper :list="banerList" auto height="251px" dots-class="custom-bottom" dots-position="center"></swiper>
      <!--菜单-->
      <div flex="dir:left main:center cross:center" style="justify-content: space-around" class="menuCell">
        <div flex="dir:top main:center cross:center" v-for="(item,index) in munuList"
             @click="$router.push({ path:item.pathName, query:item.params})">
          <img :src="item.icon" flex="main:center cross:center" class="menuItem"/>
          <label>{{item.name}}</label>
        </div>
      </div>
      <!--介绍-->
      <list-cell style="margin-top: 5px;" :topImg="require('assets/images/home/title_introduce.png')"
                 v-show="introduceList&&introduceList.length>0">
        <label slot="rightTop" @click="$router.push('IntroduceList')">更多</label>
        <scroll-view slot="main">

            <div flex="dir:top " v-for="(item,index) in introduceList" class="introduceItem" :key="index"
            >
              <a :href="item.contentUrl">
              <div flex="dir:left">
                <img :src="item.thumbUrl" class="contentImg">
                <div class="rightBorder"></div>
              </div>
              <div class="bottomBorder"></div>
              <label class='contentTxt text-ellipsis-line'>{{item.title}}</label>
              </a>
            </div>

        </scroll-view>
      </list-cell>
      <!--场次票-->
      <list-cell :topImg="require('assets/images/home/title_session.png')">
        <scroll-view slot="main">
          <div @click="$router.push('sessionDetail')"
               :style="{backgroundImage:`url(${require('assets/images/home/session_bg.png')})`}" class="ticketItem">
            <div flex="dir:top" class="info">
              <label class="title">《三坊七巷》</label>
              <label class="des f12">中瑞剧坊，坊巷文化影音秀</label>
              <label class="price">￥288</label>
            </div>
            <div class="s-button buy">购买</div>
          </div>
        </scroll-view>
      </list-cell>
      <!--套票-->
      <list-cell :topImg="require('assets/images/home/title_package.png')" v-show="packageList&&stampsList.length>0">
        <scroll-view slot="main">
          <div v-for="(item,index) in packageList" :key="index"
               :style="{backgroundImage:`url(${require('assets/images/home/package_bg.png')})`}" class="ticketItem">
            <div flex="dir:top" class="info">
              <label class="title ">《{{item.packageName}}》</label>
              <label class="des f12">{{item.detail}}</label>
              <label class="price">￥{{item.price}}</label>
            </div>
            <router-link :to="`/packageDetail?packageId=${item.hyPackageId}`">
              <div class="s-button buy">购买</div>
            </router-link>
          </div>
        </scroll-view>
      </list-cell>
      <!--通兑券-->
      <!--<list-cell :topImg="require('assets/images/home/title_stamps.png')" v-show="stampsList&&stampsList.length>0">
        <scroll-view slot="main">
          <div v-for="(item,index) in stampsList" :key="index" :style="{backgroundImage:`url(${require('assets/images/home/stamps_bg.png')})`}"
               class="ticketItem">
            <div flex="dir:top" class="info">
              <label class="title">《{{item.packageName}}》</label>
              <label class="des f12">{{item.detail}}</label>
              <label class="price">￥{{item.price}}</label>
            </div>
            <router-link :to="`/packageDetail?packageId=${item.hyPackageId}`">
              <div class="s-button buy">购买</div>
            </router-link>
          </div>
        </scroll-view>
      </list-cell>-->
      <!--兑换票券-->
      <div flex="dir:left main:center">
        <router-link to="/sessionDetail">
          <img :src="require('assets/images/home/convert.png')" class="convert">
        </router-link>
      </div>
      <!-- 探索-->
      <list-cell :topImg="require('assets/images/home/title_stamps.png')" v-show="findList&&findList.length>0">
        <div slot="main" style="display: flex;flex-wrap: wrap;padding-left: 15px">
          <div flex="dir:top " v-for="(item,index) in findList" style="margin-top: 20px" class="findItem"
               @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})">
            <router-link :to="'http://'+item.contentUrl">
            <div flex="dir:left">
              <img :src="item.thumbUrl" class="contentImgSquare">
              <div class="rightBorder"></div>
            </div>
            <div class="bottomBorder"></div>
            <label class='contentTxt'>{{item.title}}</label>
            </router-link>
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
    name: '限时抢',
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
        munuList: munuList,
        introduceList: [],
        packageList: [],
        stampsList: [],
        findList: [],
      }
    },
    methods: {
      async getBanner(){
        let res = await TheatreApi.getInformationList(10);
        if (res) {
          this.banerList = res.data.map((data) => ({
            url: data.contentUrl,
            img: data.thumbUrl
          }))
        }
      },
      async getIntroduce(){
        let res = await TheatreApi.getInformationList(20);
        if (res) {
          this.introduceList = res.data
        }
      },
      async getFind(){
        let res = await  TheatreApi.getInformationList(30);
        if (res) {
          this.findList = res.data;
        }
      },
      async getPackage(){
        let res = await TheatreApi.getPackageList(200)
        if (res) {
          this.packageList = res.data;
        }
      },
      async getStamps(){
        let res = await TheatreApi.getPackageList(201)
        console.log(res)
        if (res) {
          this.stampsList = res.data;
        }
      },
      fetchData(){
        // banner
        this.getBanner();
        // 介绍
        this.getIntroduce();
        // 发现列表
        this.getFind();
        // 套票
        this.getPackage();
        // 通兑券
        this.getStamps();

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
  @import "~style/style.less";

  .homeOut {
    background: repeat;
    background-size: 68px 68px;
    label {
      .text-ellipsis-line();
    }
    .convert {
      height: 31px;
      width: 135px;
      margin-top: 15px;
    }
    .index-header {
      min-height: 40px;
      padding: 5px 10px;
      .logo {
        height: 40px;
      }
      .header-r-icon {
        height: 20px;
        margin-right: 10px;
        margin-left: 20px;
      }
    }
    .findItem {
      width: 165px;
      margin-right: 15px;
      text-align: center;
      .contentImgSquare {
        width: 160px;
        height: 160px;
      }
    }

    .bottomBorder {
      background: @color-primary;
      height: 5px;
      margin-left: 7px;
    }
    .rightBorder {
      background: @color-primary;
      width: 5px;
      margin-top: 7px;
    }
    .introduceItem {
      overflow: visible;
      margin-right: 15px;
      width: 255px;
      .contentImg {
        height: 166px;
        width: 250px;
      }
      .contentTxt {
        text-align: center;
        margin-top: 15px;
      }
    }
    .ticketItem {
      width: 302px;
      height: 102px;
      color: @color-primary;
      background: no-repeat center;
      background-size: contain;
      margin-left: 15px;
      position: relative;
      .info {
        margin: 15px 20px 0px 70px;
        width: 185px;
      }
      .title {
        margin-bottom: 5px;
        font-weight: bolder;
        font-size: 16px;
        margin-left: -5px;
      }
      .price {
        font-size: 17px;
        font-weight: bold;
        width: 175px;
      }
      .buy {
        position: absolute;
        bottom: 15px;
        right: 20px;
      }

    }
    .menuCell {
      height: 100px;
      padding: 22px 22px 0px;
      background: url(../../assets/images/home/menu_bg.png) no-repeat;
      background-size: 100% 100%;
      label {
        text-align: center;
        width: 70px;
      }
    }
    .menuItem {
      height: 55px;
      width: 55px;
    }
  }
</style>
