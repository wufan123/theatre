<template>
  <page :headerTitle="classType==101?'超级联合日':'福州特产馆'" flex-box="1" >
    <div slot="contain" >
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >
        <good-item v-for="(item,index) in dataList" :key="index" :goodsCoverImage="item.goodsCoverImage"  :goodsName="item.goodsName" :channelFee="item.channelFee"
                   flex="dir:left cross:center" class="couponItem" @click="$router.push({path:'ProductDetail',query:{
            hyGoodsId:item.hyGoodsId
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
        value:'11111',
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
  .list {
  padding-top: 15px;
}
  .primeCost{
    text-decoration: line-through;
    color: @font-color-sub;
  }
  .icon{
    height: 46px;
    width: 46px;
  }
  .couponItem{
    height: 100px;
    margin:0 15px 10px;
    padding: 10px;
    background: url(../../assets/images/home/sale_bg.png) center no-repeat;
    background-size: 100%100%;
    .buyBtn{
        margin: 40px 10px 0 0;
    }
    .goodImg{
      width: 100px;
      height: 62px;
      margin-left: 10px;
    }
    .content{
      align-items: center;
      .title{
        margin-left: 5px;
        font-size: 15px;
        height: 24px;
        color: @font-color;
        width: 105px;
        overflow: hidden;
      }
      .info{
        width: 105px;
        margin-top: 10px;
        .price{
          font-size: 20px;
          color: @color-primary2;
          font-weight: bold;
        }
      }
    }
  }
</style>
