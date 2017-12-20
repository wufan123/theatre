<template>
  <page headerTitle="超级联合日" flex-box="1" :white="true">
    <div slot="contain" style="background-color: white">
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >    
        <div v-for="(item,index) in dataList" :key="index" flex="dir:left cross:center" class="couponItem" @click="$router.push({name:'ProductDetail',params:{isHermes:isHermes}})">
          <div flex="dir:left" flex-box="1">
            <div flex="dir:left cross:center">
                <img :src="require('assets/images/all.png')" class="icon">
            </div>
            <div flex="dir:top">
              <label>永和鱼丸提货券</label>
              <div>
                <label>¥150</label>
                <label class="primeCost" v-if="isHermes">¥20</label>
              </div>
            </div>
          </div>
          <div >
              <x-button type="primary" mini>马上购买</x-button>
          </div>
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {XButton} from 'vux'
  import API from 'apis/member'
  export default {
      props:['isHermes'],
    components:{PageScroller,XButton},
    data(){
      return {
        value:'11111',
        dataList:[]
      }
    },
    methods: {
      getDataList(page){
        return API.getCinemaList(page,10).then(res =>{
//              res = {
//                data:[],
//                page:{
//                  number:0,size:10,totalElements:0,totalPages:0
//                }
//              }
          page === 0 ? this.dataList= res.data: this.dataList= this.dataList.concat(res.data);
          return res
        })
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
<style lang="less" scoped>
  @import "~style/base-variables";
  .primeCost{
    text-decoration: line-through;
  }
  .icon{
    height: 46px;
    width: 46px;
  }
  .couponItem{
    height: 60px;
    border: solid @border-color 1px;
    margin: 10px 20px;
    padding: 10px;
    border-radius: 5px;
  }
</style>
