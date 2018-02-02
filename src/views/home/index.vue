<template>
  <div class="homeOut" :style="{backgroundImage:`url(${require('assets/images/page_bg.png')})`}" flex="dir:top">
    <div class="index-header" flex="main:justify cross:center" flex-box="0">
      <img :src="require('assets/images/logo.png')" class="logo">
      <div class="header-r" flex="cross:center">
        <img :src="require('assets/images/me.png')" class="header-r-icon" @click="goToMe">
        <!-- <img :src="require('assets/images/all.png')" class="header-r-icon" @click="$router.push('FindList')"> -->
      </div>
    </div>
    <scroller lock-x scrollbar-y>
    <div flex-box="1" class="scroll">
      <div class="tip" v-if="tip.title">
        <marquee direction="left" behavior="scroll" scrollamount="6" scrolldelay="0" loop="-1" hspace="10" vspace="10">
          <router-link :to="tip.click? tip.url:''">{{tip.title}}</router-link>
        </marquee>
      </div>
      
      <!--广告-->
      <swiper :list="banerList" auto height="175px" dots-class="custom-bottom" dots-position="center"></swiper>
      <!--菜单-->
      <div flex="dir:left main:justify cross:center" class="menuCell">
        <p class="top-bg"></p>
        <div flex="dir:top main:center cross:center" v-for="(item,index) in munuList"
             @click="$router.push({ path:item.pathName, query:item.params})">
          <img :src="item.icon" flex="main:center cross:center" class="menuItem"/>
          <label>{{item.name}}</label>
        </div>
      </div>
      
       <div class="go-buy yyx">
        <div class="detail">
          <span class="title-img"></span>
          <p class="f13">《三坊七巷》</p>
          <p class="f11">中瑞剧坊-方向文化影音秀</p>
          <img class="btn" @click="$router.push('SessionDetail')" >
        </div>
      </div>

      <div class="go-buy zhq">
        <div class="detail">
          <span class="title-img"></span>
          <!-- <p class="f13 red">票券一张+鱼丸礼品券</p>
          <p class="f11">中瑞剧坊-三坊七巷组合券</p> -->
          <img class="btn" @click="$router.push({path:'HomePackageList'})" >
        </div>
      </div>
      
      <!--介绍-->
       <!-- <list-cell style="margin-top: 5px;" :topImg="require('assets/images/home/title_introduce.png')"
                 v-show="introduceList&&introduceList.length>0">
        <label slot="rightTop" @click="$router.push('IntroduceList')">更多</label>
        <div slot="main">
          <scroller lock-y :scrollbar-x=false>
            <div class="box1">
              <div v-for="(item,index) in introduceList.slice(0,2)" class="introduceItem" :key="index">
                <router-link :to="item.redirectType? item.contentUrl:''">
                  <div flex="dir:left" class="introduceContent">
                    <img :src="item.thumbUrl" class="contentImg">
                    <div class="rightBorder"></div>
                    <div class="introducePlayIcon" flex="dir:top main:center cross:center" v-if="item.redirectType==3">
                      <img :src='require("assets/images/home/video_play.png")'/>
                    </div>
                  </div>
                  <div class="bottomBorder"></div>
                  <label class='contentTxt text-ellipsis-line'>{{item.title}}</label>
                  
                </router-link>
              </div>
            </div>
          </scroller>
        </div>
      </list-cell>  -->
      <!--场次票-->
      <!-- <list-cell :topImg="require('assets/images/home/title_session.png')">
        <div slot="main" class="center">
          <img :src="require('assets/images/home/home_ccp.jpg')" @click="$router.push('sessionDetail')"
               class="home-cell-img">
        </div>
      </list-cell> -->
      <!--组合券-->
      <!-- <list-cell :topImg="require('assets/images/home/title_zhq.png')">
        <div slot="main" class="center">
          <img :src="require('assets/images/home/home_zhg.jpg')" @click="$router.push({path:'HomePackageList'})"
               class="home-cell-img">
        </div>
      </list-cell> -->
      <!--兑换票券-->
      <div flex="dir:left main:center">
        <router-link to="SessionDetail">
          <img :src="require('assets/images/home/convert.png')" class="convert">
        </router-link>
      </div>
      <!-- 探索-->

      <list-cell :topImg="require('assets/images/home/title_stamps.png')" v-show="findList&&findList.length>0">
        <label slot="rightTop" @click="$router.push('FindList')">更多</label>

        <div slot="main" style="padding-left: 15px;padding-right: 15px" flex="main:justify">
          <div flex="dir:top " v-for="(item,index) in findList.slice(0,2)" class="findItem"
          >

            <!-- @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})" -->
            <router-link :to="item.redirectType? item.contentUrl:''">
              <div flex="dir:left" class="findContent">
                <img :src="item.thumbUrl" class="contentImgSquare">
                <div class="rightBorder"></div>
                <div class="findPlayIcon" flex="dir:top main:center cross:center" v-if="item.redirectType==3">
                  <img :src='require("assets/images/home/video_play.png")'/>
                </div>
              </div>
              <div class="bottomBorder"></div>
              <label class='contentTxt'>{{item.title}}</label>
              <div style="height:20px;"></div>
            </router-link>
          </div>

        </div>
      </list-cell>
    </div>
    </scroller>

  </div>
</template>
<script>
  import {
    Swiper,
    GroupTitle,
    SwiperItem,
    XButton,
    Divider,
    Scroller
  } from "vux";
  import ScrollView from "views/components/simpleScrollView.vue";
  import ListCell from "views/components/home/listCell.vue";
  import TheatreApi from "api/theatreApi";
  import {mapState} from "vuex";
  const imgList = [require("assets/images/home/banner_default.jpg")];
  const banerList = imgList.map((one, index) => ({
    url: "javascript:",
    img: one
  }));
  const munuList = [
    {
      name: "马上购票",
      pathName: "SessionDetail",
      icon: require("assets/images/home/flash_buy.png")
    },
    {
      name: "3D咖啡",
      pathName: "LocalProduct",
      params: {classType: 102},
      icon: require("assets/images/home/zkrk.png")
    },
    {
      name: "福州特产",
      pathName: "LocalProduct",
      params: {classType: 101},
      icon: require("assets/images/home/local.png")
    }
  ];
  export default {
    components: {
      Scroller,
      Swiper,
      ScrollView,
      ListCell
    },
    data() {
      return {
        banerList: banerList,
        tip:{},
        munuList: munuList,
        introduceList: [],
        stampsList: [],
        findList: []
      };
    },
    computed: {
      ...mapState("common", ["userInfo"])
    },
    methods: {
      goToMe(){
        console.log('this.userInfo', this.userInfo.userId)
        if (this.userInfo.userId) {
          this.$router.push('Me')
        } else {
          this.$router.push('Login')
        }
      },
      contentUrl(arr){
        return arr.map((data) => {
            switch (parseInt(data.redirectType)) {
              case 1:
              case 2:
              case 3:
                //此处需特殊处理，加#
                data.contentUrl = `#/IntroduceDetail?contentUrl=${data.contentUrl}&title=${data.title}&redirectType=${data.redirectType}&redirectId=${data.redirectId}`;
                break;
              case 4:
                data.contentUrl = `/ProductDetail?hyGoodsId=${data.redirectId}`;
                break;
              case 6:
                data.contentUrl = '/SessionDetail';
                break;
              case 5:
                data.contentUrl = `/HomePackageDetail?packageId=${data.redirectId}`;
                break;
            }
            return {
              title:data.title,
              url: data.contentUrl,
              img: data.thumbUrl,
              click:data.click
            }
          })
      },
      async geTip(){
        let res = await TheatreApi.getInformationList(40);
        if (res) {
          this.tip = this.contentUrl(res.data)[0]
          console.log('this.tip',this.tip)
        }
      },
      async getBanner(){
        let res = await TheatreApi.getInformationList(10);
        if (res) {
          this.banerList = this.contentUrl(res.data)
        }
      },
      async getIntroduce(){
        let res = await TheatreApi.getInformationList(20);
        if (res) {
          this.introduceList = res.data.map((data) => {
            return this.$util.mapIntroduceData(data);
          })
        }
      },
      async getFind(){
        let res = await  TheatreApi.getInformationList(30);
        if (res) {
          this.findList = res.data.map((data) => {
            return this.$util.mapIntroduceData(data);
          })
        }
      },
      async getStamps(){
        let res = await TheatreApi.getPackageList(201)
        if (res) {
          this.stampsList = res.data;
        }
      },
      refresh(){
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)

      },
      fetchData() {
        console.log(this.$route.query);
        let recommendId = this.$route.query.recommendId
          ? this.$route.query.recommendId
          : "";
        if (recommendId) {
          this.$store.commit("common/setRecommendId", recommendId);
        }
        this.geTip()
        // banner
        this.getBanner();
        // 介绍
        this.getIntroduce();
        // 发现列表
        this.getFind();
        // 通兑券
        this.getStamps();
      },
      refresh() {
        setTimeout(() => {
          this.$refs.scroller.donePulldown();
        }, 1000);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";
  @import "~style/style.less";
  @import "~style/common.less";

  .box1 {
    height: 205px;
    padding-left: 15px;
    position: relative;
    width: 550px;
    display: flex;
  }

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
        height: 22px;
        padding: 9px 10px;
        margin-right: 10px;
        margin-left: 20px;
      }
    }
    .go-buy{height: 225px; background-position: left;  display: flex; 
      .detail{width: 140px; display: flex; flex-direction: column;justify-content: center;
        span{margin-bottom: 10px;height: 41px;}
        img{width: 114px;height:25px;margin-top: 10px;cursor: pointer;}
        .btn{width: 114px;height: 25px;}
      }
      &.yyx{margin: 10px 25px 10px 0px;justify-content: flex-end;background:url('../../assets/images/home/yyx_img.png') no-repeat;background-size:345px 225px;
        .detail span{background:url('../../assets/images/home/yyx_title.png') no-repeat;background-size:101px 41px;}
        .detail .btn{background: url('../../assets/images/home/go_buy_btn.png') no-repeat;background-size:114px 25px;}
      }
      &.zhq{margin: 10px 0px 10px 25px;justify-content: flex-start;background:url('../../assets/images/home/zhq_img.png') no-repeat;background-size:345px 225px;
        .detail span{background:url('../../assets/images/home/zhq_title.png') no-repeat;background-size:101px 41px;}
        .detail .btn{background: url('../../assets/images/home/thzh_btn.png') no-repeat;background-size:114px 25px;}
      }
    }
    .tip{height: 30px;background: url('../../assets/images/home/tip_bg.jpg') no-repeat;background-size:100% 30px;display: flex;justify-content: center;align-items: center;
      padding: 0 0 0 40px;
      a{color: #ffffff;}}
    .findItem {
      width: 165px;
      text-align: center;
      .contentImgSquare {
        width: 160px;
        height: 160px;
      }
      .contentTxt{margin-top: 10px;}
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
      padding:30px 0px 0px;
      margin: 0 0px;
      position: relative;justify-content: space-around;
      background: url(../../assets/images/home/menu_bg.png) no-repeat;
      background-size: 100% 100%;
      .top-bg{background: url(../../assets/images/home/home_wy_bg.png) repeat-x;width: 100%;
        background-size: 15px 18px;height: 18px;position: absolute;top: 0;z-index: 1;
      }
      label {
        text-align: center;
        width: 70px;
      }
    }
    .menuItem {
      height: 61px;
      width: 77px;
    }
    .introduceContent {
      position: relative;
      .introducePlayIcon {
        position: absolute;
        top: 0;
        left: 0;
        height: 166px;
        width: 250px;
        img {
          width: 60px;
        }
      }
    }
    .findContent {
      position: relative;
      .findPlayIcon {
        position: absolute;
        top: 0;
        left: 0;
        height: 160px;
        width: 160px;
        img {
          width: 60px;
        }
      }
    }
  }

  .home-cell-img {
    width: 345px;
    margin: 0 auto;
  }
</style>
