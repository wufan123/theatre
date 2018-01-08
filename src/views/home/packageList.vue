<template>
<page :headerTitle="`优惠券·组合购`" flex-box="1">
  <div slot="contain" class="packageListH" >
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前无数据' noRecordImage usePulldown height='-48' >
        <good-item v-for="(item,index) in dataList" :key="index" :goodsCoverImage="item.imgs"  :goodsName="item.packageName" :marketFee="item.showPrice" :channelFee="item.price"
                   flex="dir:left cross:center" class="couponItem" @click.native="$router.push({path:'HomePackageDetail',query:{'packageId':item.hyPackageId}})">

          <div class="s-button buyBtn khaki" >马上购买</div>
        </good-item>
      </page-scroller>
    </div>
</page>

</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import GoodItem from 'views/components/goodList/item.vue'
    import TheatreApi from 'api/theatreApi'
  export default {
    components:{PageScroller,GoodItem},
    data(){
      return{
        dataList:[]
      }
    },
    methods:{
      getDataList(page){
        return TheatreApi.getPackageList(200).then(success => {
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
<style lang="less">
  .packageListH{
    .primeCost{text-decoration: line-through;}
  }
</style>