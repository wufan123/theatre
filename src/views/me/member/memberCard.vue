<template>
  <page white :headerTitle="`剧坊会员卡`" :headerRText="`添加会员卡`" :headerRLink="`AddCard`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡'  noRecordImage usePulldown height='-46' :usePullup='false'>
       <div class="contain" v-if="dataList.length>0">
          <div v-for="(item,index) in dataList" class="card-item">
          <div flex="dir:top" class="info">
            <label class="title text-ellipsis-line">{{item.levelName}}：{{item.cardNumber}}</label>
            <div class="sum" flex="dir:left">
              <label>余额：</label>
              <label class="text-ellipsis-line">￥{{item.money}}</label>
            </div>
            <label class="validity">有效期：{{item.expireDate}}</label>
          </div>
          <div class="s-button khaki reCharge" @click="$router.push({name:'Recharge',query:{id:item.id,levelName:item.levelName,cardNumber:item.cardNumber}})">充值</div>
          <label class="delete" @click="isdeleteCard(item)" >—</label>
        </div>
       </div>
       <div class="center no-data" v-else >
          <img :src="require('assets/images/me/no_data.png')">
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
        res.data = res.data.map(item=>{
            console.log(item.expireDate);
            item.expireDate =new Date(item.expireDate*1000).format("yyyy-MM-dd");
            return item;
        })
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
      isdeleteCard(card){
        var that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否解绑该会员卡',
          onConfirm () {
            that.deleteCard(card)
          }
        })
      },
      async deleteCard(card){
          this.$vux.loading.show({
            text:'正在解绑'
          })
          let res;
          try{
              res = await CardApi.setUserUnbind(card.id,1);
          }catch (e){
              this.$util.showRequestErro(e);
          }
          if(res&&res.status==0){
              this.$vux.toast.show({
                text:'解绑成功',
                type:'success'
              })
              this.fetchData();
          }
          this.$vux.loading.hide();
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
  .no-data{
    img{width: 150px;margin-top: 160px;margin-bottom: 10px;}
  }
  .card-item {
    height: 125px;
    width: 345px;
    margin: 0 15px 15px;
    background-size: 100% 100% !important;
    background: url(../../../assets/images/me/member_card_bg.jpg);
    position: relative;
    .info {
      margin-left: 90px;
      font-size: 14px;
      width: 200px;
      .title {
        margin-top: 17px;
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
          color: @color-primary2;
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

