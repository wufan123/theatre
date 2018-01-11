<template>
  <page :headerTitle="`推广记录`">
    <div slot="contain" class="promotion">
      <div class="me-top">
        <div class="advert">
          <i class="level" flex="main:center cross:center">V1</i>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515651331691&di=bb9609a2b962acb00530ea5a31a3275d&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-07%2F014622445.jpg">
        </div>
        <span class="bold f16">{{userInfo.userNickname}}</span>
      </div>
      <div class="time" flex="main:justify cross:center">
        <label>本月</label>
        <div class="select-data">
          <i class="pre" @click="preDate"><</i>
          <label>{{curDateTime.year}}.{{curDateTime.month}}</label>
          <i class="next" @click="nextDate">></i>
        </div>
      </div>
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前无数据' noRecordImage usePulldown height='-220'>
        <div  class="promotion-list">
          <list title="销售额（12000）元">
            <list-item  extra=" " v-for="(item,index) in dataList"  @click="orderDetail(item)">
              <div slot="subContent">{{item.toer}} </div>
              <div slot="content" class="gray f12"> {{item.successTime}}</div>
              <div slot="extra">  <p>+228.00 </p> <p>已返现</p> </div>
            </list-item>
          </list>
          <!-- <list twoLine>
            <list-item :contentTitle="item.toer" extra="">
              <div slot="contentBrief">
                <p>12 月 3 日 10：00</p>
                <p flex="main:justify"><label>时间</label><label>{{item.successTime}}</label></p>
              </div>
            </list-item>
          </list> -->
          <!-- <div class="flexb">
            <label>编码：{{item.sn}}</label>
            <label v-if="item.status==0"></label>
            <label v-if="item.status==1">创建推广</label>
            <label v-if="item.status==2">推广完成</label>
            <label v-if="item.status==3">推广成功</label>
          </div> -->
        </div>
      </page-scroller>
    </div>
  </page>
</template>
<script>
  import PageScroller from "views/components/pageScroller.vue";
  import theatreApi from "api/theatreApi";
  import {List, ListItem} from "views/components/settingList";
import {mapState} from "vuex";
  export default {
    components: {PageScroller, List, ListItem},
    data() {
      return {
        dataList: [],
        curDateTime:{
          year:2018,
          month:1
        }
      };
    },
    computed:{
    ...mapState('common',['userInfo'])
  },
    methods: {
      preDate(){
        if(this.curDateTime.month==1){
          this.curDateTime.month=12
          this.curDateTime.year--
          return;
        }
        this.curDateTime.month--
      },
      nextDate(){
        if(this.curDateTime.month==12){
          this.curDateTime.month=1
          this.curDateTime.year++
          return;
        }
        this.curDateTime.month++
      },
      async getDataList(page) {
        let res;
        try {
          res = await theatreApi.getPromotionList('13645017650');
        } catch (e) {
            this.$util.showRequestErro(e)
        }
        if (res && res.data.content) {
          if (page) {
            this.dataList = this.dataList.concat(res.data.content);
          } else {
            this.dataList = res.data.content;
          }
          res = {
            data: this.dataList,
            page: {
              number: page,
              size: 10,
              totalElements: this.dataList.length,
              totalPages: res.data.content.length > 0 ? page + 3 : page + 1
            }
          }
        }
        this.$vux.loading.hide();
        return res;
      },
      orderDetail(order){
        this.$store.commit('business/setSelectedTicketOrder', order)
        this.$router.push({name: 'TicketDetail', query: {id: order.orderCode, status: order.status}})
      },
      fetchData() {
        this.$vux.loading.show();
        let ct =this;
        setTimeout(()=>{//优化体验，查看列表时超过3秒隐藏loading
          ct.$vux.loading.hide();
        },3000);
        return this.$refs.scroller.reset();
      }
    }
  };
</script>
<style lang="less">
@import "~style/base-variables";
  .promotion{
    .me-top{display: flex;flex-direction: column;align-items: center; font-size: 13px;text-align: center;padding:20px 0;line-height: 30px;background-image:url('../../../assets/images/me/top_bg.jpg');background-size: 100% 100%;background-repeat: no-repeat;
      .advert{position: relative;border-radius: 50%;width: 70px;height: 70px;
        i.level{position: absolute;right:0px;top: 0px;border-radius: 50%;width: 20px;height:20px;font-size: 10px;background: #ccc;}
        img{border-radius: 50%;width: 60px;height: 60px;}
      }
    }
    .time{padding: 10px 10px 0;
      .select-data{display: flex;align-items: center;justify-content: center;
        i{font-size: 15px;padding: 0 15px;font-weight: bolder;}
      }
    }
    .promotion-list{background: rgba(255, 251, 244, 0.5);
      .am-list-header{padding: 0 10px;}
      .am-list-item{border-bottom: 1px solid @border-color;}
    }
  }
</style>

