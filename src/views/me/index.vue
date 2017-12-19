<template>
  <page :footerText="`退出登录`" :footerLink="`/`" :headerTitle="`我的`">
      <div slot="contain">
          <div class="me-top">
            <span class="bold">138****800</span>
            <p>余额：￥0.00  丨  积分：88</p>
            <i class="member f12">剧坊会员</i>
          </div>
          <div class="me-order">
            <div class="title">我的订单</div>
            <ul flex="box:mean">
              <li><i class="c-gray ticket"></i><a href="#">场次票</a> </li>
              <li><i class="c-gray ticket"></i><a href="#">场次票</a> </li>
              <li><i class="c-gray ticket"></i><a href="#">场次票</a> </li>
              <li><i class="c-gray ticket"></i><a href="#">场次票</a> </li>
            </ul>
          </div>
          <list twoLine >
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
              :contentTitle="`剧场会员卡`"   extra="" isLink  :link="`memberCard`">
            </list-item>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
              :contentTitle="`优惠券`"   extra="" isLink  :link="'couponList'">
            </list-item>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
              :contentTitle="`邀请好友`"   extra="" isLink  :link="`/`"  >
            </list-item>
            <list-item :img="`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513599973802&di=e0ed1059c34a8eb1d89a8e8bd1c7da11&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4b90f603738da97726166db6ba51f8198618e376.jpg`"
              :contentTitle="`联系客服`"   extra="" isLink  :link="`/`"  >
            </list-item>
          </list>
      </div>
  </page>
</template>
<script>
  import {List,ListItem} from '@/views/components/list'
  import {XButton} from 'vux'
export default {
  components: {List,ListItem,XButton},
}
</script>
<style lang="less" scoped>
  .me-top{text-align: center;padding:20px 0;line-height: 30px;background: #ffffff;border-bottom: 1px solid #ccc;}
  i.member{background: #ccc;display: inline-block;line-height: 20px;padding: 2px 15px;border-radius: 20px;position: relative;
    &:before{ content:'';width: 15px;height: 15px;display: inline-block;background-size:100%;
    background-image:url('../../assets/images/member_icon.png'); position: relative;margin:1px 8px -3px 0;
    }
  }
  .me-order{background: #ffffff;padding:10px 0;
    .title{padding:0 10px;overflow: hidden}
    ul{text-align: center;
      i{ margin: 5px auto;;width: 50px;height: 50px;background: #ccc;display: block;border-radius: 50%;
        &.ticket{}
      }
    }
  }

</style>
<style lang="less">
  .me-index{
    .am-list .am-list-item.twoline .am-list-thumb img{width:30px;height:30px;}
  }
</style>

