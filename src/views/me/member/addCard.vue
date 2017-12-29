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
              <x-input type="text" placeholder="请输入会员卡号" v-model="form.cardPw"></x-input>
              </group>
           </div>
           <x-button type="primary" @click.native="confirm">确定</x-button>
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
      CardApi.setUserBind(this.form.cardNo, this.form.cardPw).then(success => {
        this.$vux.toast.text("添加成功", 'bottom');
        this.$router.go(-1) 
      }, error => {
        this.$vux.toast.text("添加失败", 'bottom');
      })
    }
  }
};
</script>
<style lang="less" scoped>

</style>

