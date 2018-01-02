<template>
  <page :headerTitle="`充值`" >
    <div slot="contain">
      <div class="recharge">
          <p class="title">金牌导游：888888888</p>
          <div class="recharge-b" flex="main:justify">
            <i class="icon subtract" @click="subtract">-</i>
           <input class="input" type="text" placeholder="请输入会员卡号" v-model="amount" >
            <i class="icon add" @click="add">+</i>  
          </div>
          <img :src="require('assets/images/me/comfirm_btn.png')" @click="confirm" class="comfirm-btn">
      </div>
    </div>
  </page>
</template>
<script>
  import CardApi from 'api/cardApi'
    export default {
    data(){
      return {
        amount: ''
      }
    },
    methods:{
      subtract(){
        this.amount = Number(this.amount) -100
        if(this.amount<=0){
          this.amount = ''
        }
      },
      add(){
        this.amount = Number(this.amount)+100
        if(this.amount>1000000){
          this.amount = 1000000
        }
      },
      confirm(){
        if(!this.$util.isNumberBy100(this.amount)){
          this.$vux.toast.text("请输入整百金额", 'middle');
          return
        }
        return CardApi.recharge(this.amount,this.$route.query.id,'weixinpay',).then(res=>{
          this.$vux.toast.text("充值成功", 'middle');
          this.$router.go(-1)
        },error=>{
          if(error.text){
           this.$vux.toast.text(error.text, 'middle'); 
          }else{
            this.$vux.toast.text("充值失败", 'middle');
          }
        })
      }
    }
    }
</script>
<style lang="less" scoped>
  @import "~style/base-variables.less";
  .recharge{text-align: center;margin:60px ;overflow: hidden;
    .title{color:@color-sub;font-size: 15px;margin-bottom: 20px}
    .recharge-b{margin-bottom: 20px;
      .input{text-align: center;width: 160px;padding: 0 10px;border-radius: 4px;border: 1px solid @color-sub; box-sizing: border-box;background: none;}
      .icon{color:@color-sub ;line-height: 10px;padding: 10px 12px;font-size: 20px; border-radius: 4px;border: 1px solid @color-sub;box-sizing: border-box;
        &:active{background: @color-sub;color: #ffffff;}
      }
    }
  }
</style>
