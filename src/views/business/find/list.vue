<template>
  <page :headerTitle="`剧坊 ● 发现`" white >
    <div slot="contain">
      <div class="tabHeader">
        <tab custom-bar-width="38px" >
          <tab-item selected @on-item-click="onItemClick" >精选攻略</tab-item>
          <tab-item @on-item-click="onItemClick">精选视频</tab-item>
          <tab-item @on-item-click="onItemClick">精选关注</tab-item>
        </tab>
      </div>
      <div style="margin-top:46px;" >
          <find-item   v-for="(item,index) in dataList" :key="index" v-if="currentIndex===0" :title="item.title" :content="item.content" :img="item.img">
          </find-item>
        <find-item   v-for="(item,index) in dataList" :key="index" v-if="currentIndex===1" :title="item.title" :content="item.content" :img="item.img">
        </find-item>
        <find-item   v-for="(item,index) in dataList" :key="index" v-if="currentIndex===2" :title="item.title" :content="item.content" :img="item.img">
        </find-item>
      </div>
    </div>
  </page>
</template>
<script>
import {Tab,TabItem} from 'vux'
import findItem from 'views/components/findList/item.vue'
export default {
  data(){
      let list =[]
      for(let i=0;i<7;i++)
      {
          list.push({name:i,img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405',title:'你印象最深的2出警经历是什么？',content:'2013年离过年还有一周时间，鄙人当班。 有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。 到了现场，两个小孩一男一女，大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净'})
      }
    return{
      currentIndex:0,
      dataList:list
    }
  },
  components:{Tab,TabItem,findItem},
  methods:{
    onItemClick (index) {
      this.currentIndex = index
      console.log('on item click:', index)
    }
  }
}
</script>
<style lang="less" scoped>
  .tabHeader{
    position: fixed;top: 46px; width: 375px;
    font-weight: bold;
    background: url(../../../assets/images/page_bg.png) repeat;
  }
.find{margin-bottom: 20px;
  .find-vidio{width: 100%;height: 160px;}
  .find-body{padding: 0 15px;
    .title{line-height: 35px;}
  }
}
</style>
