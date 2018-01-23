<template>
  <div class="homeOut" :style="{backgroundImage:`url(${require('assets/images/page_bg.png')})`}" flex="dir:top">
    <div class="index-header" flex="main:justify cross:center"  flex-box="0">
      <img :src="require('assets/images/logo.png')" class="logo">
      <div class="header-r" flex="cross:center">
        <img :src="require('assets/images/me.png')" class="header-r-icon" @click="goToMe">
        <!-- <img :src="require('assets/images/all.png')" class="header-r-icon" @click="$router.push('FindList')"> -->
      </div>
    </div>
    <!--<scroller height="-40" lock-x scrollbar-y :pulldown-config='pullDownConfig' :usePulldown='true' @on-pulldown-loading='refresh' ref="scroller">-->
    <div flex-box="1" class="scroll">
      <!--广告-->
      <swiper :list="banerList" auto height="251px" dots-class="custom-bottom" dots-position="center"></swiper>
      <!--菜单-->
      <div flex="dir:left main:justify cross:center" class="menuCell">
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
      </list-cell>
      <!--场次票-->
      <list-cell :topImg="require('assets/images/home/title_session.png')">
        <div slot="main" class="center">
          <img :src="require('assets/images/home/home_ccp.jpg')" @click="$router.push('sessionDetail')"
               class="home-cell-img">
        </div>
      </list-cell>
      <!--组合券-->
      <list-cell :topImg="require('assets/images/home/title_zhq.png')">
        <div slot="main" class="center">
          <img :src="require('assets/images/home/home_zhg.jpg')" @click="$router.push({path:'HomePackageList'})"
               class="home-cell-img">
        </div>
      </list-cell>
      <!--兑换票券-->
      <div flex="dir:left main:center">
        <router-link to="/SessionDetail">
          <img :src="require('assets/images/home/convert.png')" class="convert">
        </router-link>
      </div>
      <!-- 探索-->
      <list-cell :topImg="require('assets/images/home/title_stamps.png')" v-show="findList&&findList.length>0">
        <label slot="rightTop" @click="$router.push('FindList')">更多</label>
        <div slot="main" style="padding-left: 15px" flex="main:justify">
          <div flex="dir:top " v-for="(item,index) in findList.slice(0,2)" class="findItem"
          >
            <!-- @click="$router.push({name:'IntroduceDetail',query:{name:'你印象最深的出警经历是什么？'}})" -->
            <router-link :to="item.contentUrl">
              <div flex="dir:left" class="findContent">
                <img :src="item.thumbUrl" class="contentImgSquare">
                <div class="rightBorder"></div>
                <div class="findPlayIcon" flex="dir:top main:center cross:center" v-if="item.redirectType==3">
                  <img :src='require("assets/images/home/video_play.png")'/>
                </div>
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
  import {mapState} from "vuex";
  const imgList = [
    require('assets/images/home/banner_default.jpg')
  ]
  const banerList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  const munuList = [{
    name: '限时抢券',
    pathName: 'FlashSale',
    icon: require('assets/images/home/flash_sale.png')
  },
    {
      name: '超级特价',
      pathName: 'LocalProduct',
      params: {classType: 102},
      icon: require('assets/images/home/hemers.png')
    },
    {
      name: '福州特产馆',
      pathName: 'LocalProduct',
      params: {classType: 101},
      icon: require('assets/images/home/local.png')
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
        stampsList: [],
        findList: [],
      }
    },
    computed: {
      ...mapState('common', ['userInfo'])
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
      async getBanner(){
        let res = await TheatreApi.getInformationList(10);
        if (res) {

          this.banerList = res.data.map((data) => {
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
            if (!data.redirectType) {
              data.contentUrl = 'www.baidu.com'
            }
            return {
              url: data.contentUrl,
              img: data.thumbUrl
            }
          })
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
      storePromotion(){
        let promoter = this.$util.getQueryString('promoter');
        if (promoter) {
          let promotion = {
            promoter: promoter,
            type: this.$util.getQueryString('type')
          }
          this.$store.commit('common/setPromotion', promotion);
          if (!this.$util.isEmptyObject(this.userInfo)) {
            TheatreApi.scanCode({...promotion, toer: this.userInfo.bindmobile});
          }
        }
      },
      fetchData(){

        console.log(this.$route.query)
        let recommendId = this.$route.query.recommendId ? this.$route.query.recommendId : ''
        this.$store.commit('common/setRecommendId', recommendId)
        console.log('recommendId', recommendId, this)
        this.storePromotion();
        // banner
        this.getBanner();
        // 介绍
        this.getIntroduce();
        // 发现列表
        this.getFind();
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
  @import "~style/common.less";
  .box1 {
  height:  205px;
  padding-left:15px;
  position: relative;
  width: 550px;display:flex;
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
        margin-right: 10px;
        margin-left: 20px;
      }
    }
    .findItem {
      width: 165px;
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
      padding: 22px 0 0px;
      margin: 0 30px;
      background: url(../../assets/images/home/menu_bg.png) no-repeat;
      background-size: 100% 100%;

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
