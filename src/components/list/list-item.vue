<template>
  <div class="am-list-item" :class="{'is-link':isLink||!!link,'twoline':isTwoLine}" @click="onClick">
    <slot></slot>
    <template v-if="!clear">
      <div class="am-list-thumb"  v-if="!!img">
        <img :src="img" />
      </div>
      <div class="am-list-content">
        <template v-if="isTwoLine">
          <div class="am-list-title">
            {{contentTitle}}
            <slot name="contentTitle"></slot>
          </div>
          <div class="am-list-brief">
            {{contentBrief}}<slot name="contentBrief"></slot>
          </div>
        </template>
        <template v-else>
          {{content}}
          <slot name="subContent"></slot>
          <slot name="content"></slot>
        </template>
      </div>
      <div class="am-list-extra" v-if="!!extra">
        {{extra}} <slot name="extra"></slot>
      </div>
      <div class="am-list-arrow" v-if="isLink||!!link">
        <span class="am-icon arrow horizontal"></span>
      </div>
    </template>
  </div>
</template>

<script>
  import { go } from '../../router'
  export default {
    data () {
      return {
        isTwoLine: false,
      }
    },
    props: {
      content: String,
      contentTitle:String,
      contentBrief:String,
      extra: [String,Number],
      isLink: Boolean,
      clear:Boolean,
      img: String,
      twoLine:Boolean,
      link: {
        type: [String, Object]
      }
    },

    mounted() {
      this.isTwoLine = this.twoLine||this.$parent.twoLine
    },
    methods: {
      onClick () {
        go(this.link, this.$router)
      }
    }
  }
</script>