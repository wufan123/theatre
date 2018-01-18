<template>
  <page headerTitle="选择会员卡">
    <div slot="contain" v-for="(item,index) in list" class="card-item">
      <div flex="dir:top" class="info">
        <label class="title text-ellipsis-line">{{item.accLevelName + item.cardId}}</label>
        <div class="sum" flex="dir:left">
          <label>余额：</label>
          <label class="text-ellipsis-line">￥{{item.accBalance}}</label>
        </div>
        <label class="validity">有效期：{{new Date(item.expirationTime*1000).format('yyyy年MM月dd日')}}</label>
      </div>
      <div class="s-button khaki reCharge" @click="selectMember(item)">选择</div>
    </div>
  </page>
</template>
<script>
  export default {
    props: ['list'],
    data(){
      return {
        item: {}
      }
    },
    methods: {
      selectMember(item){
        this.$store.commit("business/setSelectedMember", item);
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";

  .card-item {
    height: 125px;
    width: 345px;
    margin: 0 15px 15px;
    background-size: 100% 100% !important;
    background: url(../../assets/images/me/member_card_bg.jpg);
    position: relative;
    .info {
      margin-left: 90px;
      font-size: 14px;
      width: 200px;
      .title {
        margin-top: 20px;
        color: @color-sub;
        font-size: 12px;
        height: 19px;
      }
      .sum {
        margin-top: 15px;
        :first-child {
          line-height: 32px;
          width: 60px;
        }
        :nth-child(2) {
          font-size: 20px;
          color: @color-primary2;
        }
      }
    }
    .reCharge {
      position: absolute;
      bottom: 25px;
      right: 25px;
    }
    .delete {
      font-weight: bold;
      color: white;
      background: @color-active;
      border-radius: 50%;
      display: inline-flex;
      height: 18px;
      width: 18px;
      position: absolute;
      top: 20px;
      right: 25px;
      justify-content: center;
      align-items: center;
    }
  }
</style>
