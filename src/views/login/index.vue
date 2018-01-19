<template>
  <page :headerTitle="`登录`">
    <div slot="contain" class="contain login">
      <div class="form">
        <group class="form-item">
          <x-input name="mobile" type="number" placeholder="请输入手机号码" v-model="form.phone" keyboard="number" is-type="china-mobile">
            <img slot="label" style="padding-right:10px;display:block;"
                 :src="require('assets/images/me/login_phone.png')" width="24" height="24">
          </x-input>
        </group>
        <group class="form-item">
          <x-input class="weui-vcode" type="number" placeholder="请输入验证码" v-model="form.pw">
            <img slot="label" style="padding-right:10px;display:block;"
                 :src="require('assets/images/me/login_code.png')" width="24" height="24">
            <x-button slot="right" type="primary" mini @click.native="getAuthCode" :disabled="codeGapTime>0">
              {{codeGapTime ? codeGapTime + 's' : '获取验证码'}}
            </x-button>
          </x-input>
        </group>
        <div class="s-button khaki mb20" @click="login">登录</div>
        <div class="red f12" @click="$router.push('Protocol')">登录即为同意 《瑞华剧坊用户协议》</div>
      </div>
    </div>
  </page>
</template>
<script>
  import Auth from 'api/authApi'
  import TheatreApi from 'api/theatreApi'
  import {XInput, Group} from "vux";
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        form: {
          phone: '',
          pw: '',
        },
        codeGapTime: 0
      }
    },
    components: {XInput, Group},
    computed: {
      ...mapState("common", ['promotion'])
    },
    methods: {
      async getAuthCode(){
        if (!this.form.phone) {
          this.$vux.toast.show({
            text: '电话号码不能为空',
            type: 'warn'
          })
          return;
        }
        this.$vux.loading.show({
          text: '获取验证码中'
        });
        let res;
        try {
          res = await Auth.getValidateCode("firstLogin", this.form.phone)
        } catch (e) {
          this.$util.showRequestErro(e);
        }
        if (res && res.status == 0) {
          this.$vux.toast.text(res.text, 'bottom');
          this.codeGapTime = 60;
          let ct = this;
          let timer = setInterval(() => {
            if (!--ct.codeGapTime) {
              clearInterval(timer);
            }
          }, 1000);
        }
        this.$vux.loading.hide();
      },
      async login(){
        if (!this.form.phone) {
          this.$vux.toast.show({
            text: '电话号码不能为空',
            type: 'warn'
          })
          return;
        }
        if (!this.form.pw) {
          this.$vux.toast.show({
            text: '验证码不能为空',
            type: 'warn'
          })
          return;
        }

        this.$vux.loading.show({
          text: '登录中'
        });
        let res;
        try {
          res = await Auth.smsLogin(this.form.phone, this.form.pw); //smsLogin
        }
        catch (e) {
          this.$util.showRequestErro(e);
        }
        if (res && res.data) {
          //更新推广信息
          if (!this.$util.isEmptyObject(this.promotion))
            TheatreApi.scanCode({...this.promotion, toer: res.data.bindmobile});
          this.$vux.toast.text("登录成功", 'bottom');
          this.$store.commit('common/setUserInfo', res.data);
          this.$router.go(-1);
        }
        this.$vux.loading.hide();

      }
    }
  };
</script>
<style lang="less">
  @import "~style/base-variables";

  .login {
    &.contain {
      background-image: url('../../assets/images/me/login_bg.jpg');
      background-size: 100% 100%;
      height: 100%;
      position: absolute;
    }
    .form {
      padding: 110px 30px;
    }
    .form-item:first-child {
      margin: 0;
    }
    .weui-cells {
      background: rgba(0, 0, 0, 0) !important;
      font-size: 15px !important;
      &::after {
        border-bottom: 2px solid @color-sub;
      }
      &::before {
        border-top: 0px;
      }
    }
    .weui-btn_mini {
      border-radius: 0;
    }
    .s-button {
      display: block;
      padding: 10px 0;
      margin-top: 40px;
    }
  }
</style>

