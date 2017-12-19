<template>
    <page :headerTitle="`优惠券`">
      <img src="../../../assets/images/scan.png" slot="rightTop" class="icon"/>
      <div slot="contain">
        <div flex="dir:left">
          <x-input  v-model="value"></x-input><XButton  class="commonButton" >添加</XButton>
        </div>
        123
      </div>
    </page>
</template>
<script>
   import {XInput,XButton} from 'vux'
    export default {
      components:{XInput,XButton},
      data(){
            return { value:'11111'}
        },
        methods: {

        }
    }
</script>
<style lang="less">
  .icon{
    height: 22px;
    width: 22px;
  }
  .commonButton{
    width: 100px;
  }
</style>
