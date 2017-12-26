<template>
  <div>
    <page :headerTitle="`来点小吃`" flex-box="1" :white="true">
      <div slot="contain">
        <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >
          <good-item v-for="i in 7" :goodsName="'鱼丸'" :channelFee="'00'" class="snackItem">
            <div flex="dir:left" class="num">
              <x-number v-show="value>0" v-model="value" style="padding: 0"></x-number>
              <a v-show="!value>0" @click="value++" class="vux-number-selector vux-number-selector-plus"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg></a>
            </div>
          </good-item>
        </page-scroller>
      </div>
    </page>
    <x-button class="no-radius bottomBtn" type="primary" @click.native="$router.push('ConfirmOrder')">不选了直接下单购票</x-button>
  </div>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import GoodItem from 'views/components/goodList/item.vue'
  import {XNumber} from 'vux'
  export default {
    components:{PageScroller,XNumber,GoodItem},
    data(){
      return {
        value:1,
        dataList:[]
      }
    },
    methods: {
      getDataList(page){
        /* return API.getCinemaList(page,10).then(res =>{
         page === 0 ? this.dataList= res.data: this.dataList= this.dataList.concat(res.data);
         return res
         })*/
      },
      fetchData(){
        return this.$refs.scroller.reset()
      },
      listItemClick(){
        this.$vux.toast.text('请到我的优惠券中查看', 'bottom');
      }
    }
  }
</script>
<style lang="less">
  @import "~style/base-variables";
  .snackItem{
    position: relative;
    .vux-number-selector{
      border:solid @color-active 1px!important;
    }
    .vux-number-input{
      background:@color-sub!important;
      color: white;
    }
    .num{
      position: absolute;
      bottom: 30px;
      right: 10px;
    }
  }
</style>

