<template>
  <page :headerTitle="title">
    <div slot="contain" flex="dir:top" style="height: 100%;" >
      <!-- <div v-html="html" style="max-width: 100%;overflow: hidden">
      </div> -->
        <div class="detail-html" flex-box="1" ref="bodyHeight" :style="{height:iframeHeight+'px'}">
          {{iframeHeight}}
            <iframe :src="html" class="content" frameborder="0" height="100%" scrolling="auto"></iframe>
        </div>
        <div flex-box="0" class="center">
            <router-link :to="url">
              <img v-if="$route.query.redirectType>3"  class="goToBuy" :src='require("assets/images/go_to_buy.png")'>
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
    updated(){
      this.iframeHeight = this.$refs.bodyHeight.offsetHeight
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
.detail-html{border:1px solid red;}

  .content {
    width:100%;
    height:100%;
  }

  .goToBuy {margin-top: 10px;
    width: 80px;
  }
</style>

