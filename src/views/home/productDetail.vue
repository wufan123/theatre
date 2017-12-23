<template>
  <page headerTitle="详情" flex-box="1" >
    <div slot="contain" >
      <div class="goodPhoto">
        <img src="" />
      </div>
      <div class="mainBody" flex="dir:top cross:center">
        <label class="title">
          永和鱼丸提货券</label>
        <label class="price">
          ￥5.00</label>
        <label class="primeCost" v-if="isHermes">
          ￥20.00</label>
        <label class="dividerTitle">
          商品介绍
        </label>
        <div>
          永和鱼丸是福建一带的地方风味名菜，属于闽菜系。永和鱼丸店创建于1934年，是福建福州市现存最老的鱼丸品牌，2001年获得“中华老字号”称号。

          鱼丸最早出现于秦朝江浙一带。秦始皇云游江南到了福州，喜爱鱼米之乡的鲜鱼，但鱼肉剌多，吃起来极为不便，便下一道谕旨，要求随行厨子送上的鱼必须将鱼剌剔净，否则斩首。厨子前思后想不得要领，气急之下，抡起刀背猛砸砧板上的鲜鱼，没想到歪打正着，鱼肉与鱼骨竟截然离析。得来全不费功夫，这种剔骨法让厨子惊喜不已。他灵机一动，索性将鱼肉剁

          抡起刀背猛砸砧板上的鲜鱼，没想到歪打正着，鱼肉与鱼骨竟截然离析。得来全不费功夫，这种剔骨法让厨子惊喜不已。他灵机一动，索性将鱼肉剁

          抡起刀背猛砸砧板上的鲜鱼，
        </div>
      </div>
        <x-button class="no-radius bottomBtn" type="primary"  @click.native="buy()">马上购买</x-button>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {XButton} from 'vux'
  import API from 'api/member'
  export default {
      props:['isHermes'],
    components:{PageScroller,XButton},
    data(){
      return {
        dataList:[]
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
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .bottomBtn{
    position: fixed;
    bottom: 0;
  }
  .primeCost{
    text-decoration: line-through;
  }
  .goodPhoto{
    height: 200px;
    background-color: gray;
  }
  .mainBody{
    background-color: white;
    margin: -20px 20px 80px;
    padding: 20px;
    border-radius: 5px;
    .dividerTitle{
      background: url(../../assets/images/home/title_bg.png) center no-repeat;
      background-size: 100%100%;
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
</style>
