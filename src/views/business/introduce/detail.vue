<template>
  <page :headerTitle="' '">
    <div slot="contain" flex="dir:top cross:center">
      <div v-html="html">
      </div>
      <router-link :to="url">
        <img v-if="$route.query.redirectType>3" class="goToBuy" :src='require("assets/images/go_to_buy.png")'>
      </router-link>
    </div>

  </page>
</template>
<script>
  import http from 'api/apiHttp'
  export default {
    data(){
      let url='';
      switch (parseInt(this.$route.query.redirectType)) {
        case 4:
          url = `/ProductDetail?hyGoodsId=${this.$route.query.redirectId}`;
          break;
        case 5:
          url = '/SessionDetail';
          break;
        case 6:
          url = `HomePackageDetail?packageId=${this.$route.query.redirectId}`;
          break;
      }
      return {
        html: '',
        url:url
      }
    },
    methods: {
      async fetchData(){
        this.html = await  http.instance.get('https://' + this.$route.query.contentUrl)
      },
    }
  }
</script>
<style lang="less" scoped>
  img {
    width: 100%;
  }

  .content {
    margin: 10px 15px;
  }

  .goToBuy {
    width: 60px;
  }
</style>

