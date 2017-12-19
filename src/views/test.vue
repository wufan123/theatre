<template>
<page :footerText="`我是footer`" :footerLink="`/`" :header-title="`剧坊会员卡`">
    <div slot="contain">
     <page-scroller :api='getDataList' ref='scroller' :init-query='true' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-92' >
          
       <list  :title="`我是标题`"  v-for="(item,index) in dataList" >
          <list-item   is-link :content="`我是标题`" >
              <div slot="subContent">我是副标题</div>
            </list-item>
        </list>

        </page-scroller>
    </div>
  </page>
</template>
<script>
  import {List,ListItem} from '@/views/components/list'
  import PageScroller from './components/PageScroller.vue'
  import API from '../apis/member'
export default {
  data(){
    return {
      dataList:[]
    }
  },
  components: {List,ListItem,PageScroller},
  methods:{
    getDataList(page){
      return API.getCinemaList(page,5).then(res =>{
        // res = {
        //   data:[],
        //   page:{
        //     number:0,size:10,totalElements:0,totalPages:0
        //   }
        // }
        this.dataList = this.dataList.concat(res.data)
        return res
      })
    }
  },
    fetchData(){
      return this.$refs.scroller.reset()
    }
}
</script>

