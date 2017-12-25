<template>
  <page :headerTitle="classType==101?'超级联合日':'福州特产馆'" flex-box="1" >
    <div slot="contain" >
      <page-scroller :api='getDataList' ref='scroller'  noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-48' >
        <div v-for="(item,index) in 8" :key="index" flex="dir:left cross:center" class="couponItem" @click="$router.push({path:'ProductDetail'})">
          <div flex="dir:left" flex-box="3">
            <div flex="dir:left cross:center" >
                <img :src="require('assets/images/home/local_default.png')" class="goodImg">
            </div>
            <div flex="dir:top"  flex-box="1" class="content">
              <label class="title">永和鱼丸提货券</label>
              <div class="info">
                <label class="price">¥150</label>
                <label class="primeCost" v-if="classType==101">¥20</label>
              </div>
            </div>
          </div>
          <label class="txtBtn buyBtn" >马上购买</label>
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/PageScroller.vue'
  import {XButton} from 'vux'
  import TheatreApi from 'api/theatreApi'
  import StoreApi from 'api/storeApi'
  export default {
    components:{PageScroller,XButton},
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
          console.log(success)
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
    color: @font-color-sub;
  }
  .icon{
    height: 46px;
    width: 46px;
  }
  .couponItem{
    height: 100px;
    margin: 15px 10px;
    padding: 10px;
    background: url(../../assets/images/home/sale_bg.png) center no-repeat;
    background-size: 100%100%;
    .buyBtn{
        margin: 40px 20px 0 0;
    }
    .goodImg{
      width: 100px;
      height: 62px;
      margin-left: 10px;
    }
    .content{
      align-items: center;

      .title{
        text-align: center;
        font-size: 15px;
        height: 24px;
        font-weight: bold;
        color: @font-color;
        width: 105px;
        overflow: hidden;
      }
      .info{
        width: 105px;
        margin-top: 10px;
        .price{
          font-size: 20px;
          color: @color-primary;
          font-weight: bold;
        }
      }
    }
  }
</style>
