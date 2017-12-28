<template>
  <div class="page">
    <div>
      <div v-if="headerTitle">
        <x-header class="header" :left-options="{backText: ''}">{{headerTitle}}
          <a slot="right" v-if="headerRText" @click="onClickR">{{headerRText}}</a>
          <slot slot="right" name="rightTop"></slot>
        </x-header>
      </div>
    </div>
    <div class="contain" ref="contain">
      <slot name="contain"></slot>
    </div>
    <div class="footer">
      <x-button v-if="footerText" flex-box="0" type="primary no-radius" action-type="button" @click.native="onClick">{{footerText}}
      </x-button>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      headerTitle: String,
      footerText: String,
      white: Boolean,
      headerRText: String,
      headerRLink: {
        type: [String, Object]
      },
      footerLink: {
        type: [String, Object]
      },
      footerFunc: {
        type: Function
      },
      contain: String,
    },
    methods: {
      onClick () {
        if (this.footerLink) {
          go(this.footerLink, this.$router)
        } else if (this.footerFunc) {
          this.footerFunc()
        }
      },
      onClickR () {
        go(this.headerRLink, this.$router)
      }
    }
  }
  function go(url, $router) {
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
  @import "~style/base-variables.less";
  .page {
    display: flex;
    flex-direction: column;background: url(../../assets/images/page_bg.png) repeat;
  }
  .header {
    flex: 0;
    background: @color-sub !important;
  }

  .contain {
    overflow: auto;
    flex: 1;
    
    background-size: 68px 68px;
  }

  .footer {
    flex: 0;
  }
</style>

