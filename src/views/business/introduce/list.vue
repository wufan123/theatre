<template>
  <page white :headerTitle="`剧坊 ● 介绍`">
    <div slot="contain">
      <find-item   v-for="(item,index) in introduceList" :link="item.contentUrl"  :key="index" :title="item.title" :content="item.content" :img="item.thumbUrl" :type="item.redirectType">
      </find-item>
    </div>
  </page>
</template>
<script>
  import findItem from 'views/components/findList/item.vue'
  import TheatreApi from "api/theatreApi";

export default {
  components:{findItem},
  data(){
    return{
      introduceList:[]
    }
  },
  methods:{
    fetchData(){
      this.getIntroduce();
    },
    mapIntroduceData(data){
      data.contentUrl = `#/IntroduceDetail?contentUrl=${data.contentUrl}&redirectType=${data.redirectType}&redirectId=${data.redirectId}`;
      return data;
    },
    async getIntroduce(){
      let res = await TheatreApi.getInformationList(20);
      if(res)
      {
        this.introduceList = res.data.map(item=>{
            return this.mapIntroduceData(item);
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~style/base-variables.less";
.find{
  .find-vidio{width: 345px;height: 194px; margin: 23px 15px}
  .find-body{padding: 0 15px;
    .title{
      font-size: 16px;
      border-left: solid @color-sub 5px;
      font-weight: bold;
      padding-left: 7px;
      line-height: 15px;
      width: 100%;
    }
    .content{
      margin-top: 12px;
      text-indent:2em;
    }
  }
}
</style>
