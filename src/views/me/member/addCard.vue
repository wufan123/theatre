<template>
  <page white :headerTitle="`添加会员卡`">
    <div slot="contain">
        <div class="add" >
           <div class="form-item">
              <p>会员卡号</p>
              <input type="text" style="display:none" >
              <input type="text" placeholder="请输入会员卡号" class="input" >
           </div>
           <div class="form-item">
             <p>会员卡密码</p>
             <input type="password" placeholder="请输入会员卡密码" class="input" >
           </div>
           <x-button type="primary">确定</x-button>
        </div>
    </div>
  </page>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.add {margin:  60px;
  .form-item{margin-bottom: 20px;
    &:last-of-type{margin-bottom: 60px;}}
}
</style>

