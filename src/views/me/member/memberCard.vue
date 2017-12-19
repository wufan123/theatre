<template>
  <Page :footerText="`我是footer`" :footerLink="`/`" :header-title="`剧坊会员卡`">
    <div slot="contain">
      <div style="height:2000px;">asdfasdfasdf</div>
      
    </div>
  </Page>
</template>
<script>
import Page from '../../components/page.vue'
export default {
  components:{Page}
}
</script>

<style lang="less" scoped>
// .page{background: #ffffff;}
</style>

