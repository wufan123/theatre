<template>
  <div class="page">
    <div v-if="headerTitle">
      <x-header class="header" :left-options="{showBack:!isShowBack, backText: '',preventGoBack:!!backFunc}"  @on-click-back="onClickL">{{headerTitle}}
        <a slot="right" v-if="headerRText" @click="onClickR">{{headerRText}}</a>
        <slot slot="right" name="rightTop"></slot>
      </x-header>
    </div>
    <div class="contain" ref="contain">
      <slot name="contain"></slot>
    </div>
    <div class="footer" :style="{height:footerText?'42px':'0'}">
      <x-button v-if="footerText"  type="primary no-radius" action-type="button" @click.native="onClick">{{footerText}} </x-button>
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
      isShowBack:{
        type:Boolean,
        default:false
      },
      headerRLink: {
        type: [String, Object]
      },
      footerLink: {
        type: [String, Object]
      },
      footerFunc: {
        type: Function
      },
      backFunc: {
        type: Function,
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
      onClickL(){
        if(this.backFunc) {
            this.backFunc();
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
    display: flex;overflow: hidden;justify-content:space-between;
    flex-direction: column;background-image: url(../../assets/images/page_bg.png);background-size:68px 68px;background-repeat:repeat;
  }
  .header {
    background: @color-sub !important;
  }
  .contain {
    position: relative;
    flex: 1;
    overflow-y: auto;
  }

  .footer {
    .btn{
      width: 100%;height: 42px;
    }
  }
</style>

