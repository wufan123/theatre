<template>
  <page white :headerTitle="`剧坊 ● 介绍`">
    <div slot="contain">
      <find-item   v-for="(item,index) in dataList" :key="index" :title="item.title" :content="item.content" :img="item.img">
      </find-item>
    </div>
  </page>
</template>
<script>
  import findItem from 'views/components/findList/item.vue'
export default {
  components:{findItem},
  data(){
    let list =[]
    for(let i=0;i<7;i++)
    {
      list.push({name:i,img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405',title:'你印象最深的2出警经历是什么？',content:'2013年离过年还有一周时间，鄙人当班。 有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。 到了现场，两个小孩一男一女，大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净'})
    }
    return{
      dataList:list
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
