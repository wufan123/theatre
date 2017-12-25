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
          <div flex="dir:left cross:center" style="width: 100%">
            <div class="divider"></div>
            <label class="dividerTitle">
              商品介绍
            </label>
            <div class="divider"></div>
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
  import PageScroller from 'views/components/PageScroller.vue'
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
      background-color: white;
      margin: -20px 20px 80px;
      padding: 20px;
      border-radius: 5px;
      width: 295px;
      .content{
        text-indent: 2em;
      }
      .divider{
        border-bottom: dashed @color-sub 1px;
        height: 1px;
        width: 100%;
        margin: 0 5px;
      }
      .dividerTitle{
        background: url(../../assets/images/home/title_bg.png) center no-repeat;
        background-size: 100%100%;
        width: 256px;
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
