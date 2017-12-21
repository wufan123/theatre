<template>
  <page :headerTitle="`购买成功`">
    <div slot="contain">
      <div class="result">
        <x-button type="primary" @click.native="$router.push('/')">返回</x-button>
      </div>
      
    </div>
  </page>
</template>
<style lang="less" scoped>
  .result{margin: 60px;}
</style>

