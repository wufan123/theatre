<template>
  <page :footerText="!$util.isEmptyObject(userInfo)?`退出登录`:'登录'"  :footerFunc="!$util.isEmptyObject(userInfo)?logOut:$router.push('Login')" :headerTitle="`我的`">
      <div slot="contain" class="me">
          <div class="me-top" flex="dir:top cross:center main:center">
            <span class="bold f16">{{userInfo.userNickname}}</span>
            <!-- <p v-if="userInfo.memberCardBalance" ><em v-if="!userInfo.memberCardBalance" >余额：￥{{userInfo.userMoney}}</em>
               <em v-if="userInfo.memberCardBalance" >会员卡余额：￥{{userInfo.memberCardBalance.accBalance}}</em>
              丨  <em>积分：{{userInfo.integral}}</em></p> -->

            <i class="member f12">剧坊会员</i>
          </div>
          <div class="me-order">
            <div class="title"></div>
            <ul flex="box:mean">
              <li @click="$router.push('TicketList')"><i class="icon order"></i><a href="#">场次票</a> </li>
              <li @click="$router.push('PackageList')"><i class="icon package"></i><a href="#">组合购</a> </li>
              <li @click="$router.push('LocalProductList')"><i class="icon lacalProduct"></i><a href="#">福州特产</a> </li>
              <!-- <li><i class="icon ticket"></i><a href="#">通兑券</a> </li> -->
            </ul>
          </div>
          <list twoLine >
            <list-item :img="require('assets/images/me/cell_icon_01.png')"
              :contentTitle="`剧场会员卡`"   extra="" isLink  :link="`MemberCard`">
            </list-item>
            <list-item :img="require('assets/images/me/cell_icon_02.png')"
              :contentTitle="`优惠券`"   extra="" isLink  :link="'CouponList'">
            </list-item>
            <list-item :img="require('assets/images/me/cell_icon_03.png')"
              :contentTitle="`邀请好友`"   extra="" isLink  :link="`Share`"  >
            </list-item>
            <list-item :img="require('assets/images/me/cell_icon_04.png')" @click.native="callphone"
              :contentTitle="`联系客服`"   extra="" isLink   >
            </list-item>
          </list>
      </div>
  </page>
</template>
<script>
import AuthApi from 'api/authApi'
import {List,ListItem} from '@/views/components/settingList'
import {XButton} from 'vux'
import {mapState} from "vuex";
export default {
  components: {List,ListItem,XButton},
  data(){
    return {
    }
  },
  computed:{
    ...mapState('common',['userInfo'])
  },
  methods:{
    callphone(){
      window.location.href ='tel:400-850-7010';
    },
    fetchData(){
      console.log('走不走')
      if(this.$util.isEmptyObject(this.userInfo)){
        this.$router.push('Home')
        return;
      }
      AuthApi.getUserInfo().then(success => {
        this.$store.commit('common/setUserInfo', success.data)
        this.$set(this.userInfo,success.data);
      }, error => {
      })
    },
    async logOut(){
      this.$vux.loading.show({
        text:'正在登出'
      })
      let res;
      try{
          res = await  AuthApi.logout();
      }catch(e) {
        this.$util.showRequestErro(e);
      }
      if(res&&res.status==0){
          this.$store.commit('common/setUserInfo',{});
          this.$router.push('login')
      }
      this.$vux.loading.hide();
    }
  }
}
</script>
<style lang="less" scoped>
@import "~style/base-variables";
  .me-top{font-size: 13px;text-align: center;min-height: 105px; padding:20px 0;line-height: 30px;background-image:url('../../assets/images/me/top_bg.jpg');background-size: 100% 100%;background-repeat: no-repeat;}
    p em{margin: 0 10px;}
  i.member{margin-top:10px; border: 1px solid #1b2a3d; color: @color-sub; display: inline-block;line-height: 20px;padding: 2px 15px;border-radius: 20px;position: relative;
    &:before{ content:'';width: 15px;height: 15px;display: inline-block;background-size:100%;background-repeat: no-repeat;
    background-image:url('../../assets/images/me/vip.png') ; position: relative;margin:1px 8px -3px 0;
    }
  }
  .me-order{padding:10px 0;
    .title{margin: 20px 0;width: 375px;height: 42px;background-image: url('../../assets/images/me/me_order_title_bg.png');background-size: 100% 100%;background-repeat: no-repeat;}
    ul{text-align: center;
      i.icon{width: 31px;height: 55px;display: block;background-size:100%;background-repeat: no-repeat;margin: 0 auto 5px auto;
        &.order{ background-image:url('../../assets/images/me/me_menu_01.png')}
        &.package{ background-image:url('../../assets/images/me/me_menu_02.png')}
        &.lacalProduct{ background-image:url('../../assets/images/me/me_menu_03.png')}
        &.ticket{ background-image:url('../../assets/images/me/me_menu_04.png')}
      }
    }
  }

</style>
<style lang="less">
@import "~style/base-variables";
  .me{
    .am-list .am-list-item{border-top:1px solid @border-color2;padding:7px 15px 7px;
      &:last-child{border-bottom:1px solid @border-color2;}
    }
    .am-list .am-list-item.twoline .am-list-title{ font-weight: normal; }
    .am-list .am-list-item.twoline .am-list-thumb img{width:24px;height:24px;}
  }
</style>

