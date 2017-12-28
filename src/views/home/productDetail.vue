<template>
  <page headerTitle="详情" flex-box="1" >
    <div slot="contain" >
      <div class="ImgOut" >
        <img  :src="data.goodsImg" />
      </div>
      <div class="mainOut" >
        <div class="mainBody" flex="dir:top cross:center">
          <label class="title">
            {{data.goodsName}}</label>
          <label class="price">
            ￥{{data.price}}</label>
          <label class="primeCost" v-if="isHermes">
            ￥{{data.showPrice}}</label>
          <div flex="main:center cross:center" class="divider">
            <label class="dividerTitle">
              商品介绍
            </label>
            <div class="dividerLine"></div>
          </div>
          <div class="content">
            {{data.detail}}
          </div>
        </div>
      </div>
      <x-button class="no-radius bottomBtn" type="primary"  @click.native="buy()">马上购买</x-button>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import StoreApi from 'api/storeApi'
  import {XButton} from 'vux'
  export default {
      props:['isHermes'],
    components:{PageScroller,XButton},
    data(){
      return {
        data:[]
      }
    },
    methods: {
      buy(){
        this.$vux.confirm.show({
          title: 'Title',
          content: 'Content',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            console.log('plugin confirm')
          }
        })
      },
      async fetchData(){
         let res = await StoreApi.getGoodsDetail(this.$route.query.hyGoodsId)
          if(res&&res.data)
          {
              this.data =res.data.goodInfo
          }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .primeCost{
    text-decoration: line-through;
  }
  .ImgOut{
    width: 100%;
    height: 200px;
    img{
      height: 200px;
      width: 100%;
    }
  }
  .mainOut{
    position: relative;
    width: 100%;
    .mainBody{
      position: absolute;
      z-index: 100;
      background-color: @page_bg2;
      margin: -20px 20px 80px;
      padding: 20px;
      border-radius: 5px;
      width: 295px;
      .content{margin-top: 20px;
        text-indent: 2em;text-align:left;width: 100%;
      }
      .divider{position: relative;width: 100%;}
      .dividerLine{
        border-bottom: dotted @color-sub 1px;
        position: absolute;width: 100%;z-index: 2;
      }
      .dividerTitle{
        background: @page_bg2 url(../../assets/images/home/title_bg.png) center no-repeat;
        background-size: 100%100%;z-index: 3;
        width: 128px;
        height: 34px;
        color: @color-sub;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 34px;
        margin: 10px 0px;
      }
      .title{
        font-size: 20px;
        color: @font-color;
      }
      .price{
        color: @color-sub;
        font-size: 21px;

      }
    }
  }
</style>
