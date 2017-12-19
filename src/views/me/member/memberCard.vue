<template>
  <page white :headerTitle="`剧坊会员卡`" :headerRText="`添加会员卡`" :headerRLink="`AddCard`">
    <div slot="contain">
      <div v-if="dataList.length" class="card-list">
          <div class="card-item">
            <p class="center f12">金牌导游：888888</p>
            <p>余额：￥20.00</p>
          </div>
      </div>
      <div class="no-card" v-else>
          <div flex="dir:top main:center cross:center" class="icon">
            <img src="../../../assets/images/member_icon.png">
            <p>当前账户未添加会员卡</p>
          </div>
      </div>
      
    </div>
  </page>
</template>
<script>
export default {
  data(){
    return{
      dataList:[{name:'钻石会员'}]
    }
  }
}
</script>

<style lang="less" scoped>
.card-list{margin: 20px 40px;
  .card-item{border:1px solid #eee;padding:10px 20px;}
}
.no-card{margin: 0px 60px;
  .icon{height: 300px;
  img{width: 80px;height: 80px;margin-bottom: 20px;}}
}
</style>

