<template>
  <page :headerTitle="title" white>
    <div slot="contain">
      <div class="content">
        2013年离过年还有一周时间，鄙人当班。有人报警说是麦当劳儿童娱乐区里有两个小孩子从下午玩到晚上十点还没有家长管，麦当劳要关门了，喊我们去看看。我就去了。到了现场，两个小孩一男一女，
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513769571579&di=5cb37015d63d5365d46313d76e87557f&imgtype=0&src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM0013C1CggSBFbWkAuATI6JAABqQKCIeXY254.jpg%3Fwidth%3D720%26height%3D405">
        大概只有三四岁。问父母是谁，讲不清楚。两个小孩穿的干干净净，一人一个小书包。我打开一看，就明白怎么回事了。书包里是一套换洗衣服，还有保暖内衣。我问小朋友你们爸爸妈妈呢？小孩子一边玩一边很开心的说，爸爸妈妈叫我们在这等，等有穿警服来的人才可以跟着走，不然不能走。。。（大概是这个意思）

      </div>
    </div>
  </page>
</template>
<script>
export default {
  data(){
    return{
      title:''
    }
  },
  methods:{
    fetchData(){
      this.title = this.$route.query.name;
      console.log('0000',this.$route.query.name)
    },
  }
}
</script>
<style lang="less" scoped>
  img{width: 100%;}
  .content{margin: 10px 15px;}
</style>

