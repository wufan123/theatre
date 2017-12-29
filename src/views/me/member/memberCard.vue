<template>
  <page white :headerTitle="`剧坊会员卡`" :headerRText="`添加会员卡`" :headerRLink="`AddCard`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage usePulldown height='-46'>
       <div class="contain">
          <div v-for="(item,index) in dataList" class="card-item">
          <div flex="dir:top" class="info">
            <label class="title text-ellipsis-line">{{item.levelName+item.cardNumber}}</label>
            <div class="sum" flex="dir:left">
              <label>余额：</label>
              <label class="text-ellipsis-line">￥200000000000.00</label>
            </div>
            <label class="validity">有效期：2018-10-11</label>
          </div>
          <div class="s-button khaki reCharge" @click="$router.push('Recharge')">充值</div>
          <label class="delete">—</label>
        </div>
       </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from 'views/components/pageScroller.vue'
  import CardApi from 'api/cardApi'
  import {List, ListItem} from 'views/components/settingList'

  export default {
    components: {PageScroller, List, ListItem},
    data(){
      return {
        dataList: []
      }
    },
    methods: {
      async getDataList(page){
        let res = await CardApi.getCardInfo();
        page === 0 ? this.dataList = res.data : this.dataList = this.dataList.concat(res.data);
        return {
          ...res, page: {
            number: 0, size: 10, totalElements: 3, totalPages: 0
          }
        }
        /*return  CardApi.getCardInfo().then(res => {
         res = {
         data: [{name: '1111', id: '111111'}, {name: '2222', id: '22222'}, {name: '3333', id: '3333'}],
         page: {
         number: 0, size: 10, totalElements: 3, totalPages: 0
         }
         }

         //this.dataList = this.dataList.concat(res.data)
         return res
         })*/
      },
      recharge(){

      },
      fetchData(){
        return this.$refs.scroller.reset()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~style/base-variables.less";
  .contain{padding-top: 15px;}
  .card-item {
    height: 125px;
    width: 345px;
    margin: 0 15px 15px;
    background-size: 100% 100% !important;
    background: url(../../../assets/images/me/member_card_bg.png);
    position: relative;
    .info {
      margin-left: 90px;
      font-size: 14px;
      width: 200px;
      .title {
        margin-top: 20px;
        color: @color-sub;
        font-size: 12px;
        height: 19px;
      }
      .sum {
        margin-top: 15px;
        :first-child{
          line-height: 32px;
          width: 60px;
        }
        :nth-child(2) {
          font-size: 20px;
          color: @color-primary;
        }
      }
    }
    .reCharge {
      position: absolute;
      bottom: 25px;
      right: 25px;
    }
    .delete {
      font-weight: bold;
      color: white;
      background: @color-active;
      border-radius: 50%;
      display: inline-flex;
      height: 18px;
      width: 18px;
      position: absolute;
      top: 20px;
      right: 25px;
      justify-content: center;
      align-items: center;
    }
  }
</style>

