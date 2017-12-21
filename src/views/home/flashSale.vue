<template>
  <page :headerTitle="`限时抢`" flex-box="1" :white="true">
    <div slot="contain" style="background-color: white">
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >
        <div v-for="(item,index) in dataList" :key="index" flex="dir:left cross:center" class="couponItem" @click="listItemClick">
          <div flex="dir:top" flex-box="1">
            <label>¥150</label>
            <label>有效期:2017-12-11</label>
          </div>
          <div flex="dir:top">
            <label>立即抢</label>
            <label>已抢光20%</label>
          </div>
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
    export default {
      components:{PageScroller},
      data(){
        return {
          value:'11111',
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
  .couponItem{
    height: 60px;
    border: solid @border-color 1px;
    margin: 10px 20px;
    padding: 10px;
    border-radius: 5px;
  }
</style>
