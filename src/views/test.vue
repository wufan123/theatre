<template>
<page :footerText="`我是footer`" :footerLink="`/`" :header-title="`剧坊会员卡`">
    <div slot="contain">
     <page-scroller :api='getDataList' ref='scroller' :init-query='true' noRecordText='当前账户未添加会员卡' noRecordImage  usePulldown height='-92' >

       <list twoLine :title="`我是标题`" >
          <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
          :contentTitle="`我是contentTitle`"   extra="" isLink  :link="`/`" :contentBrief="`我是contentBasdfasdfasdfasdfasdfasrief`"  >
            </list-item>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
          :contentTitle="`我是contentTitle`"   extra="" isLink  :link="`/`" :contentBrief="`我是contentBasdfasdfasdfasdfasdfasrief`"  >
            </list-item>
        </list>
        <list twoLine :title="`我是标题`" >
          <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
          :contentTitle="`我是contentTitle`"   extra="" isLink  :link="`/`" :contentBrief="`我是contentBasdfasdfasdfasdfasdfasrief`"  >
            </list-item>
        </list>

       <list  :title="`我是标题`"  v-for="(item,index) in dataList" :key="index" >
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
  import orderApi from 'api/orderApi'
export default {
  data(){
    return {
      dataList:[]
    }
  },
  components: {List,ListItem,PageScroller},
  methods:{
    getDataList(page){
      return orderApi.getCinemaOrders(3,0).then(res =>{
        // res = {
        //   data:[],
        //   page:{
        //     number:0,size:10,totalElements:0,totalPages:0
        //   }
        // }
        console.log('res-------------------------',res)
        page == 0 ? this.dataList= res.data : this.dataList= this.dataList.concat(res.data)
        return res
      })
    }
  },
    fetchData(){
      return this.$refs.scroller.reset()
    }
}
</script>

