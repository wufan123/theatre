<template>
  <page :headerTitle="classType==101?'超级特价':'福州特产馆'" flex-box="1" >
    <div slot="contain" >
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前无数据' noRecordImage usePulldown height='-48'  :usePullup="false">
        <good-item v-for="(item,index) in dataList" :key="index" :goodsCoverImage="item.goodsCoverImage"  :goodsName="item.goodsName" :channelFee="item.channelFee+item.accessFee"
               :marketFee="classType==102?item.marketFee:''"    flex="dir:left cross:center" class="couponItem" @click.native="$router.push({path:'ProductDetail',query:{
            hyGoodsId:item.hyGoodsId,classType:$route.query.classType
        }})">
          <div class="s-button buyBtn khaki" >马上购买</div>
        </good-item>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import {XButton} from 'vux'
  import TheatreApi from 'api/theatreApi'
  import GoodItem from 'views/components/goodList/item.vue'
  import StoreApi from 'api/storeApi'
  export default {
    components:{PageScroller,XButton,GoodItem},
    data(){
      return {
        dataList:[],
        classType: this.$route.query.classType
      }
    },
    methods: {
      getDataList(page){
        return TheatreApi.getGoodsList(this.classType).then(success => {
          this.dataList= success.data
          let res = {
            data:success.data,
            page:{
              number:0,size:success.data.length,totalElements:success.data.length,totalPages:1
            }
          }
          return res
        }, error => {
          console.log(error)
        })
      },
      fetchData(){
        return this.$refs.scroller.reset()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~style/base-variables";

</style>
