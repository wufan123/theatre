<template>
  <div class="page">
    <div class="header">
      <div v-if="headerTitle">
          <x-header class="white" :left-options="{backText: ''}" >{{headerTitle}}
            <a slot="right" v-if="headerRText"  @click="onClickR"  >{{headerRText}}</a>
            <slot slot="right" name="rightTop"></slot>
          </x-header>
      </div>
    </div>
    <div class="contain" :class="{white:white}">
        <slot name="contain"></slot>
    </div>
    <div class="footer" v-if="footerText">
      <x-button flex-box="0" type="warn no-radius" action-type="button" @click.native="onClick" >{{footerText}}</x-button>
    </div>
  </div>
</template>
<script>

export default {
  props:{
    headerTitle:String,
    footerText:String,
    white: Boolean,
    headerRText:String,
    headerRLink:{
      type: [String, Object]
    },
    footerLink:{
        type: [String, Object]
    },
    contain:String
  },
  methods: {
    onClick () {
      go(this.footerLink, this.$router)
    },
    onClickR () {
      go(this.headerRLink, this.$router)
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
  .white{background: #ffffff;}
  .footer{flex: 0}
</style>

