<template>
  <page :headerTitle="`登录`">
    <div slot="contain" class="contain login">
        <div class="form">
          <group class="form-item">
            <x-input  name="mobile" placeholder="请输入手机号码" v-model="form.phone" keyboard="number" is-type="china-mobile">
              <img slot="label" style="padding-right:10px;display:block;" :src="require('assets/images/me/login_phone.png')" width="24" height="24">
            </x-input>
          </group>
          <group class="form-item">
            <x-input class="weui-vcode" placeholder="请输入验证码" v-model="form.pw">
              <img slot="label" style="padding-right:10px;display:block;" :src="require('assets/images/me/login_code.png')" width="24" height="24">
              <x-button slot="right" type="primary" mini @click.native="getAuthCode">获取</x-button>
            </x-input>
          </group>
          <div class="s-button khaki" @click="login">登录</div>
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
            Auth.login(this.form.phone,this.form.pw).then((success)=>{
              this.$vux.toast.text("登录成功", 'bottom');
              this.$store.commit('common/setUserInfo', success.data)
              this.$router.push('Home')
            },(error)=>{
              this.$vux.toast.text(error.text, 'bottom');
            });
      }

    }
  };
</script>
<style lang="less">
  @import "~style/base-variables";
  .login{
    &.contain{background-image: url('../../assets/images/me/login_bg.jpg');background-size: 100%100%;height: 100%;}
    .form{padding: 110px 30px;}
    .form-item:first-child{margin:0;}
    .weui-cells{background: rgba(0, 0, 0, 0) !important;font-size: 15px!important;
      &::after{border-bottom: 2px solid @color-sub;}
      &::before{border-top: 0px;}
    }
    .weui-btn_mini{border-radius: 0; }
    .s-button{display:block;padding:10px 0;margin-top:40px;}
  }
</style>

