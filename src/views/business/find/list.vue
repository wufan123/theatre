<template>
  <page :headerTitle="`剧坊 ● 发现`" white >
    <div slot="contain">
      <tab style="    position: fixed; width: 100%;top: 46px;">
        <tab-item selected @on-item-click="onItemClick">精选攻略</tab-item>
        <tab-item @on-item-click="onItemClick">精选视频</tab-item>
        <tab-item @on-item-click="onItemClick">精选关注</tab-item>
      </tab>
      <div style="margin-top:46px;" >
        <div class="find" v-for="item in  dataList" v-if="currentIndex===0" >
          <img class="find-vidio" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405">
          <div class="find-body">
            <p class="title text-ellipsis-line">你印象最深的出警经历是什么？</p>
            <p class="content text-ellipsis">2013年离过年还有一周时间，鄙人当班。 有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。 到了现场，两个小孩一男一女，大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净</p>
          </div>
        </div>
        <div class="find" v-for="item in  dataList" v-if="currentIndex===1" >
          <img class="find-vidio" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405">
          <div class="find-body">
            <p class="title text-ellipsis-line">你印象最深的2出警经历是什么？</p>
            <p class="content text-ellipsis">2013年离过年还有一周时间，鄙人当班。 有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。 到了现场，两个小孩一男一女，大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净</p>
          </div>
        </div>
        <div class="find" v-for="item in  dataList" v-if="currentIndex===2" >
          <img class="find-vidio" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405">
          <div class="find-body">
            <p class="title text-ellipsis-line">你印象最深的3出警经历是什么？</p>
            <p class="content text-ellipsis">2013年离过年还有一周时间，鄙人当班。 有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。 到了现场，两个小孩一男一女，大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净</p>
          </div>
        </div>
      </div>

      

    </div>
  </page>
</template>
<script>
import {Tab,TabItem} from 'vux'
export default {
  data(){
    return{
      currentIndex:0,
      dataList:[{name:'1'},{name:'2'},{name:'3'},{name:'4'}]
    }
  },
  components:{Tab,TabItem},
  methods:{
    onItemClick (index) {
      this.currentIndex = index
      console.log('on item click:', index)
    }
  }
}
</script>
<style lang="less" scoped>
.find{margin-bottom: 20px;
  .find-vidio{width: 100%;height: 160px;}
  .find-body{padding: 0 15px;
    .title{line-height: 35px;}
  }
}
</style>