<template>
  <page white :headerTitle="`剧坊会员卡`" :headerRText="`添加会员卡`" :headerRLink="`AddCard`">
    <div slot="contain">
      <page-scroller :api='getDataList' ref='scroller' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-46' >

        <div v-for="(item,index) in dataList" class="card-list">
          <div class="card-item">
            <p class="center f12 mb20">金牌导游：888888</p>
            <p class="mb20">余额：￥20.00</p>
            <div flex="main:justify">
              <label>有效期：2018-10-11</label>
              <x-button mini type="primary" style="margin:0">充值</x-button>
            </div>
          </div>
        </div>

        </page-scroller>

    </div>
  </page>
</template>
<script>
import PageScroller from '../../components/PageScroller.vue'
import API from '../../../apis/member'
  import {List,ListItem} from '@/views/components/list'
export default {
  components:{PageScroller,List,ListItem},
  data(){
    return{
      dataList:[]
    }
  },
  methods:{
    getDataList(page){
      return API.getCinemaList(page,10).then(res =>{
        // res = {
        //   data:[],
        //   page:{
        //     number:0,size:10,totalElements:0,totalPages:0
        //   }
        // }
        this.dataList = this.dataList.concat(res.data)
        return res
      })
    },
    fetchData(){
      return this.$refs.scroller.reset()
    }
  }
}
</script>

<style lang="less" scoped>
.card-list{padding: 20px 40px;
  .card-item{border:1px solid #eee;padding:10px 20px;}
}
.no-card{margin: 0px 60px;
  .icon{height: 300px;
  img{width: 80px;height: 80px;margin-bottom: 20px;}}
}
</style>

