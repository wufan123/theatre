<template>
  <page :headerTitle="title">
    <div slot="contain" flex="dir:top" style="    height: 100%;" >
      <!-- <div v-html="html" style="max-width: 100%;overflow: hidden">
      </div> -->
        <div flex-box="1" ref="bodyHeight">
            <div class="conB" :style="{height:iframeHeight+'px'}">
              <iframe :src="html" class="content" frameborder="0" :style="{height:'1000px'}" ></iframe>
            </div>
        </div>
        <div flex-box="0" class="center">
            <router-link :to="url">
              <img v-if="$route.query.redirectType>3"  :style="$util.isIphoneX()?{'margin-bottom':'14px'}:{}"  class="goToBuy" :src='require("assets/images/go_to_buy.png")'>
            </router-link>
        </div>
    </div>
  </page>
</template>
<script>
  import http from 'api/apiHttp'
  export default {
    data(){
      let url = '';
      switch (parseInt(this.$route.query.redirectType)) {
        case 4:
          url = `/ProductDetail?hyGoodsId=${this.$route.query.redirectId}`;
          break;
        case 5:
          url = `HomePackageDetail?packageId=${this.$route.query.redirectId}`;
          break;
        case 6:
          url = '/SessionDetail';
          break;
      }
      return {
        html: '',
        url: url,
        iframeHeight:0,
        title:''
      }
    },
    methods: {
      async fetchData(){
        // console.log('this.bodyHeight.outerHeight()',)
        this.iframeHeight = this.$refs.bodyHeight.offsetHeight
        this.html = this.$route.query.contentUrl
        this.title =  this.$route.query.title
        // try {
        //   this.html = await  http.instance.get(this.$route.query.contentUrl)
        // }
        // catch (e) {

        //   if (e.toString().indexOf('<html') == 0){
        //     this.html = e
        //   }else{
        //     this.$util.showRequestErro({
        //       text:'资源错误'
        //     })
        //   }

        // }

      },
    }
  }
</script>
<style lang="less" scoped>
  img {
    width: 100%;
  }
  .conB{min-height:600px;-webkit-overflow-scrolling: touch;  
    overflow-y: scroll; }

  .content {
    width:100%;
    height:100%;
  }

  .goToBuy {margin-top: 10px;
    width: 80px;
  }
</style>
<style lang="less" >
iframe img{width: 100%!important;}
</style>


