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
              <x-input type="text" placeholder="请输入会员卡密码" v-model="form.cardPw"></x-input>
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
    confirm: function() {
      if(!this.form.cardNo){
        this.$vux.toast.text("请输入会员卡号", 'middle');
        return
      }
      if(!this.form.cardPw){
        this.$vux.toast.text("请输入会员卡密码", 'middle');
        return
      }
      CardApi.setUserBind(this.form.cardNo, this.form.cardPw).then(success => {
        this.$vux.toast.text("添加成功", 'middle');
        this.$router.go(-1)
      }, error => {
        if(error.text){
         this.$vux.toast.text(error.text, 'middle'); 
        }else{
          this.$vux.toast.text("添加失败", 'middle');
        }
        
      })
    }
  }
};
</script>
<style lang="less" scoped>

</style>

