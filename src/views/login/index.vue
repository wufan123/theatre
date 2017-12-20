<template>
  <page :headerTitle="`登录`" white >
    <div slot="contain">
        <div class="form">
          <group title="手机号" class="form-item">
            <x-input  name="mobile" placeholder="请输入手机号码" v-model="form.phone" keyboard="number" is-type="china-mobile"></x-input>
          </group>
          <group title="验证码" class="form-item">
            <x-input class="weui-vcode" placeholder="请输入验证码" v-model="form.pw">
              <x-button slot="right" type="primary" mini>获取</x-button>
            </x-input>
          </group>
           <x-button type="primary">确定</x-button>
        </div>
    </div>
  </page>
</template>
<script>
  import { XInput, Group } from "vux";
  export default {
    data(){
      return{
        form:{
          phone:'13046521325',
          pw:'123456'
        }
      }
    },
    components: { XInput, Group }
  };
</script>
