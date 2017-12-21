<template>
  <page :headerTitle="`场次票`" >
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-46' >
        <div v-for="(item,index) in dataList" class="ticket-list mt10" @click="$router.push('TicketDetail')">
          <list twoLine >
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
            :contentTitle="`坊巷文化影音秀`"   extra=""  >
            <div slot="contentBrief">
              <p class="bold">12 月 3 日 10：00</p>
              <p>1张</p>
            </div>
              </list-item>
          </list>
          <div class="flexb">
            <label>总价：198元</label>
            <label>支付完成</label>
          </div>
        </div>
        </page-scroller>
    </div>
  </page>
</template>
<script>
import PageScroller from 'views/components/PageScroller.vue'
import API from 'api/member'
  import {List,ListItem} from 'views/components/list'

export default {
  components:{PageScroller,List,ListItem},
  data(){
    return{
      dataList:[]
    }
  },
  methods:{
    getDataList(page){
      return API.getCinemaList(page,5).then(res =>{
        // res = {
        //   data:[{name:'1111',id:'111111'},{name:'2222',id:'22222'},{name:'3333',id:'3333'}],
        //   page:{
        //     number:0,size:10,totalElements:3,totalPages:0
        //   }
        // }
        page == 0 ? this.dataList= res.data : this.dataList= this.dataList.concat(res.data)
        //this.dataList = this.dataList.concat(res.data)
        return res
      })
    },
    fetchData(){
      return this.$refs.scroller.reset()
    }
  }
}
</script>
<style lang="less">
.ticket-list{padding:0 15px 15px;background: #ffffff;
  .am-list .am-list-item:first-child:last-child{background-size: 0 0, 0 0, 100% 0px, 100% 1px;padding:0 0 10px 0;}
  .am-list .am-list-item.twoline .am-list-thumb img{width: 50px;height: 80px;}
  .am-list .am-list-item .am-list-content{height: 80px;}
}
</style>

