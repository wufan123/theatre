<template>
  <page white :headerTitle="`添加会员卡`">
    <div slot="contain">
        <div class="form" >
           <div class="form-item">
              <group title="会员卡号" class="form-item">
                <x-input type="text" placeholder="请输入会员卡号" v-model="form.cardNo"></x-input>
              </group>
           </div>
           <div class="form-item">
              <group title="会员卡密码" class="form-item">
              <x-input type="password" placeholder="请输入会员卡密码" v-model="form.cardPw"></x-input>
              </group>
           </div>
           <img :src="require('assets/images/me/comfirm_btn.png')" @click="confirm" class="comfirm-btn">
        </div>
    </div>
  </page>
</template>
<script>
import CardApi from 'api/cardApi'
import { XInput, Group } from "vux";
export default {
  data(){
    return{
      form:{
        cardNo:'',
        cardPw:''
      }
    }
  },
  components: { XInput, Group },
  methods: {
    async confirm() {
      if(!this.form.cardNo){
       this.$vux.toast.text("请输入会员卡号");
        return
      }
      if(!this.form.cardPw){
       this.$vux.toast.text("请输入会员卡密码");
        return
      }
      this.$vux.loading.show({text:'正在添加'});
      let res ;
      try {
          res = await CardApi.setUserBind(this.form.cardNo, this.form.cardPw);
      }catch (e){
          console.log(e);
          this.$util.showRequestErro(e);
      }
      if(res&&res.status==0)
      {
        this.$vux.toast.show({
          text:'添加成功',
          type:'success'
        });
        this.$router.go(-1)
      }
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>

</style>

