<template>
  <div class="page">
    <div class="header">
      <div v-if="headerTitle">
          <x-header class="white" :left-options="{backText: ''}" >{{headerTitle}}</x-header>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="contain">
        <slot name="contain"></slot>
    </div>
    <div class="footer" v-if="footerText">
      <x-button flex-box="0" type="warn no-radius" action-type="button" @click.native="onClick" >{{footerText}}</x-button>
    </div>
  </div>
</template>
<script>
  import {XButton} from 'vux'
  
export default {
  props:{
    headerTitle:String,
    footerText:String,
    footerLink:{
        type: [String, Object]
    },
    contain:String
  },
  components: {XButton},
  methods: {
    onClick () {
      console.log('onClick')
      go(this.footerLink, this.$router)
    }
  }
}
function go (url, $router) {
    if (/^javas/.test(url) || !url) return
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
    if (useRouter) {
      $router.push(url)
    } else {
      window.location.href = url
    }
  }
</script>

<style lang="less">
.page{display: flex;flex-direction: column;}
  .header{flex: 0}
  .contain{overflow: auto;flex: 1;}
  .footer{flex: 0}
</style>

