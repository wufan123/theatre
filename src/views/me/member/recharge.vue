<template>
  <page :headerTitle="`充值`" >
    <div slot="contain">
      <div class="recharge">
          <p class="title">金牌导游：888888888</p>
          <div class="recharge-b" flex="main:justify">
            <i class="icon subtract">-</i>
           <input class="input" type="text" placeholder="请输入会员卡号" >
            <i class="icon add">+</i>  
          </div>
          <img :src="require('assets/images/me/comfirm_btn.png')" @click="confirm" class="comfirm-btn">
      </div>
    </div>
  </page>
</template>
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
