<template>
  <div>
    <page :headerTitle="`来点小吃`" flex-box="1" :white="true">
      <div slot="contain" style="background-color: white">
        <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >
          <div v-for="(item,index) in 10" :key="index" flex="dir:left cross:center" class="couponItem" @click="listItemClick">
            <div class="foodImg">
              <img>
            </div>
            <div flex="dir:top" flex-box="1">
              <label>永和鱼丸提货券</label>
              <label>¥150</label>
            </div>
            <div flex="dir:left">
              <x-number v-show="value>0" v-model="value" width="30px" style="padding: 0"></x-number>
              <a v-show="!value>0" @click="value++" class="addIcon">+</a>
            </div>
          </div>
        </page-scroller>
      </div>
    </page>
    <x-button class="no-radius bottomBtn" type="primary" @click.native="$router.push('ConfirmOrder')">不选了直接下单购票</x-button>
  </div>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {XNumber} from 'vux'
  export default {
    components:{PageScroller,XNumber},
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
  .bottomBtn {
    position: fixed;
    bottom: 0;
  }
  .addIcon{
    font-size: 25px;
    color: #3cc51f;
    margin-right: 5px;
  }
  .foodImg{
    width: 50px;
    height: 50px;
    background-color: @base-bg-color;
    margin-right: 10px;
  }
  .couponItem{
    height: 60px;
    border: solid @border-color 1px;
    margin: 10px 20px;
    padding: 10px;
    border-radius: 5px;
  }
</style>

