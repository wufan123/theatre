<template>
  <page headerTitle="选择会员卡">
    <div slot="contain" v-for="(item,index) in list" class="card-item">
      <div flex="dir:top" class="info">
        <label class="title text-ellipsis-line">{{item.accLevelName + item.cardId}}</label>
        <div class="sum" flex="dir:left">
          <label>余额：</label>
          <label class="text-ellipsis-line">￥{{item.accBalance}}</label>
        </div>
        <label class="validity" v-if="item.expirationTime==1" >状态：已过期 </label>
        <label class="validity" v-else>状态：正常  </label>
      </div>
      <div v-if="item.expirationTime!=1">
        <div v-if="!$util.isEmptyObject(selectedMember)" class="s-button khaki reCharge" @click="calncalSelect(item)">取消</div>
        <div class="s-button khaki reCharge" @click="selectMember(item)" v-else>选择</div>
      </div>

    </div>
  </page>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    props: ['list'],
    data(){
      return {
        item: {}
      }
    },
    computed: {
      ...mapState('business', ['selectedMember'])
    },
    methods: {
      selectMember(item){
        this.$store.commit("business/setSelectedMember", item);
        this.$router.go(-1);
      },
      calncalSelect(item){
          this.$store.commit("business/setSelectedMember", {});
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
    margin:15px 15px 0px;
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
