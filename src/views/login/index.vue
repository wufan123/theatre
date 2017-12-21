<template>
  <page :headerTitle="`登录`" white >
    <div slot="contain">
        <div class="form">
          <group title="手机号" class="form-item">
            <x-input  name="mobile" placeholder="请输入手机号码" v-model="form.phone" keyboard="number" is-type="china-mobile"></x-input>
          </group>
          <group title="验证码" class="form-item">
            <x-input class="weui-vcode" placeholder="请输入验证码" v-model="form.pw">
              <x-button slot="right" type="primary" mini @click.native="getAuthCode">获取</x-button>
            </x-input>
          </group>
           <x-button type="primary" @click.native="login">确定</x-button>
        </div>
    </div>
  </page>
</template>
<script>
  import Auth from 'api/authApi'
  import { XInput, Group } from "vux";
  export default {
    data(){
      return{
        form:{
          phone:'18046053906',
          pw:'123456'
        }
      }
    },
    components: { XInput, Group },
    methods:{
        getAuthCode(){
            Auth.getValidateCode("firstLogin",this.form.phone).then((success)=>{
              this.$vux.toast.text(success.text, 'bottom');
            },(error)=>{
              this.$vux.toast.text(error.text, 'bottom');
            })
        },
      login(){
            Auth.smsLogin(this.form.phone,this.form.pw,'JC170001').then((success)=>{
              this.$vux.toast.text("登录成功", 'bottom');
              this.$router.push('Home')
            },(error)=>{
              this.$vux.toast.text(error.text, 'bottom');
            });
      }

    }
  };
</script>
