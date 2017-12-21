<template>
  <div>
    <page headerTitle="场次票" flex-box="1">
      <div v-transfer-dom>
        <popup v-model="show" height="100%" position="bottom">
          <div>
            123456
          </div>
        </popup>
      </div>
      <div slot="contain">
        <div class="goodPhoto">
          <img src=""/>
        </div>
        <div class="mainBody" flex="dir:top cross:center">
          <div flex="dir:left cross:center" class="titleBar">
            <div flex="dir:top">
              <label>
                坊巷影音文化秀</label>
              <label>
                坊巷文化影音秀场次票</label>
            </div>
            <div flex="dir:top">
              <label class="price">
                ￥5.00</label>
              <label class="primeCost">
                ￥20.00</label>
            </div>
          </div>
          <label class="titleTag">
            商品介绍
          </label>
          <div>
            永和鱼丸是福建一带的地方风味名菜，属于闽菜系。永和鱼丸店创建于1934年，是福建福州市现存最老的鱼丸品牌，2001年获得“中华老字号”称号。

            鱼丸最早出现于秦朝江浙一带。秦始皇云游江南到了福州，喜爱鱼米之乡的鲜鱼，但鱼肉剌多，吃起来极为不便，便下一道谕旨，要求随行厨子送上的鱼必须将鱼剌剔净，否则斩首。厨子前思后想不得要领，气急之下，抡起刀背猛砸砧板上的鲜鱼，没想到歪打正着，鱼肉与鱼骨竟截然离析。得来全不费功夫，这种剔骨法让厨子惊喜不已。他灵机一动，索性将鱼肉剁

            抡起刀背猛砸砧板上的鲜鱼，没想到歪打正着，鱼肉与鱼骨竟截然离析。得来全不费功夫，这种剔骨法让厨子惊喜不已。他灵机一动，索性将鱼肉剁

            抡起刀背猛砸砧板上的鲜鱼，
          </div>
        </div>
        <x-button class="no-radius bottomBtn" type="primary" @click.native="show=true">马上购买</x-button>
      </div>
    </page>
    <popup v-model="show" position="bottom">
      <div class="popBottom" flex="dir:top">
        <label>时间</label>
        <checker v-model="timeCheck" default-item-class="check-item" selected-item-class="check-item-selected" class="checker">
          <checker-item value="1">今天12.24</checker-item>
          <checker-item value="2">今天12.24</checker-item>
          <checker-item value="3">今天12.24</checker-item>
        </checker>
        <label>场次</label>
        <checker v-model="sessionTime" default-item-class="check-item" selected-item-class="check-item-selected" class="checker">
          <checker-item value="1">12:24</checker-item>
          <checker-item value="2">12:24</checker-item>
          <checker-item value="3">12:24</checker-item>
        </checker>
          <div class="numItem">
            <x-number title="数量" v-model="value"></x-number>
          </div>
        <x-button type="primary" class="no-radius">
          确认
        </x-button>
      </div>
    </popup>
  </div>


</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {Popup, Checker, CheckerItem,XNumber} from 'vux'
  import API from 'apis/member'
  import XButton from "../../../node_modules/vux/src/components/x-button/index";
  export default {
    props: ['isHermes'],
    components: {
      XButton,
      PageScroller, Popup, Checker, CheckerItem,XNumber},
    data(){
      return {
        show: true,
        timeCheck: '',
        sessionTime: '',
        value:1
      }
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";
  .numItem{
    margin-top: 20px;
    border-top: solid @border-color 1px;
    padding-top: 10px;
  }
  .checker{
    display: flex;justify-content: space-around;
    margin-top: 20px;
  }
  .check-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    width: 80px;
    text-align: center;
  }

  .check-item-selected {
    border: 1px solid green;
  }
  .popBottom {
    padding: 10px;
    background-color: white;
  }

  .bottomBtn {
    position: fixed;
    bottom: 0;
  }

  .goodPhoto {
    height: 200px;
    background-color: gray;
  }

  .titleTag {
    background-color: gray;
    color: white;
    padding: 5px 15px;
    margin-top: 10px;
  }

  .mainBody {
    background-color: white;
    margin: -20px 20px 80px;
    padding: 20px;
    border-radius: 5px;
    .titleBar {
      justify-content: space-around;
      width: 100%;
      .price {
        font-size: 22px;
      }
    }
  }
</style>
