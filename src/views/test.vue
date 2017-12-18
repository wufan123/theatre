<template>
<div>

  <list  :title="`我是标题`"  >
    <list-item   is-link :content="`我是标题`"  @click.native="selectRefundCauseAlert"  >
        <div slot="subContent">我是副标题
        </div>
       </list-item>
  </list>

  <list twoLine :title="`我是标题`" >
    <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
     :contentTitle="`我是contentTitle`"   extra="3" isLink  :link="`/`" :contentBrief="`我是contentBasdfasdfasdfasdfasdfasrief`"  >
       </list-item>
  </list>
  </div>
</template>
<script>
  import {List,ListItem} from '@/views/components/list'
export default {
  data(){
    return {

    }
  },
  components: {List,ListItem},
}
</script>

