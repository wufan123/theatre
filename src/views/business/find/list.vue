<template>
  <page :headerTitle="`精选 ● 攻略`" white>
    <div slot="contain" flex="dir:top" style="height: 100%;">
      <div class="tabHeader" flex-box="0">
        <tab custom-bar-width="38px">
          <tab-item selected @on-item-click="onItemClick">精选攻略</tab-item>
          <tab-item @on-item-click="onItemClick">精选视频</tab-item>
          <tab-item @on-item-click="onItemClick">精选关注</tab-item>
        </tab>
      </div>
      <div class="find-body" flex-box="1">
        <find-item v-for="(item,index) in strategyList" :key="index" v-if="currentIndex===0" :title="item.title"
                   :content="item.content" :img="item.thumbUrl" :link="item.contentUrl" :type="item.redirectType">
        </find-item>
        <find-item v-for="(item,index) in videoList" :key="index" v-if="currentIndex===1" :title="item.title"
                   :content="item.content" :img="item.thumbUrl" :link="item.contentUrl" :type="item.redirectType">
        </find-item>
        <find-item v-for="(item,index) in attentionList" :key="index" v-if="currentIndex===2" :title="item.title"
                   :content="item.content" :img="item.thumbUrl" :link="item.contentUrl" :type="item.redirectType">
        </find-item>
        <div v-if="(currentIndex===0&&strategyList.length==0)||(currentIndex===1&&videoList.length==0)||(currentIndex===2&&attentionList.length==0)" flex="dir:top main:center cross:center" style="height:480px">
          <img :src="require('assets/images/no_data.png')" class="no-data mb10" >
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  import findItem from 'views/components/findList/item.vue'
  import TheatreApi from "../../../api/theatreApi";
  export default {
    data(){
      return {
        currentIndex: 0,
        strategyList: [],
        videoList: [],
        attentionList: []
      }
    },
    components: {Tab, TabItem, findItem},
    methods: {
      onItemClick (index) {
        this.currentIndex = index
        console.log('on item click:', index)
      },
      async getStrategy(){
        let res = await  TheatreApi.getInformationList(31);
        if (res&&res.data) {
          this.strategyList = res.data.map(item=>{
              return this.$util.mapIntroduceData(item)
          });
        }
      },
      async getVideo(){
        let res = await TheatreApi.getInformationList(32);
        if (res&&res.data) {
          this.videoList = res.data.map(item=>{
            return this.$util.mapIntroduceData(item)
          });
        }
      },
      async getAttention(){
        let res = await TheatreApi.getInformationList(33);
        if (res&&res.data) {
          this.attentionList = res.data.map(item=>{
            return this.$util.mapIntroduceData(item)
          });
        }
      },
      fetchData(){
        this.getStrategy();
        this.getVideo();
        this.getAttention();
      }
    }
  }
</script>
<style lang="less" scoped>
  .tabHeader {
    width: 375px;
    font-weight: bold;
    background: url(../../../assets/images/page_bg.png) repeat;
    background-size: 68px 68px;
  }

  .no-data{width:88px;height:105px;}

  .find {
    margin-bottom: 20px;
    .find-vidio {
      width: 100%;
      height: 160px;
    }
    .find-body {
      padding: 0 15px;
      .title {
        line-height: 35px;
      }
    }
  }
</style>
