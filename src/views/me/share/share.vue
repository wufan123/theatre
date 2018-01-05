<template>
  <page :headerTitle="`邀请好友`">
    <div slot="contain">
        <div class='content'>
          <img :src="require('assets/images/me/bag.png')" class='bag-icon'>
          <p>邀请好友注册，您好友</p>
          <p class='f20 mb20'>获得 <em class="red f24">￥30</em> 优惠券</p>
          <p class='s-button khaki' @click="showDialogStyle = true">立即邀请</p>
        </div>
      <div class='warn'>
        <div class='title'></div>
        <div class='body'>通过您分享的链接,或扫描您分享二维码而进行注册的用户，即可获得30元观剧优惠券，使用优惠券可以抵等值的购票款（特价票除外）。</div>
      </div>

      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: 'auto', 'background-color': 'transparent'}">
        <div class="dialog">
            <div class="bg body">
              <img class="code" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514203011952&di=f382d7d2131f6277edb1cb8ef7b58ee5&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2F86%2F68%2F4%2Fe51eac8a98c2bd65c6b68bae86c_p1_mk1_wm35.gif">
              <p>扫二维码向朋友分享</p>
              <div class="type">
                <div class="item"> <i class="wx"></i> <p>微信</p> </div>
                <div class="item"> <i class="friends"></i> <p>朋友圈</p> </div>
                <div class="item"> <i class="qq"></i> <p>QQ</p> </div>
                <div class="item"> <i class="sina"></i> <p>新浪</p> </div>
                <div class="item"> <i class="link"></i> <p>复制邀请链接</p> </div>
              </div>
            </div>
            <div class="bg foot">
              <x-button @click.native="showDialogStyle=false">取消</x-button>
            </div>
        </div>
      </x-dialog>
    </div>
    

  </page>
</template>
<script>
import { XDialog } from 'vux'
export default {
  data(){
    return{
      showDialogStyle: false,
    }
  },
  components:{XDialog},
}
</script>


  
<style lang="less" scoped>
.content{margin: 75px 3px; text-align: center;font-size: 16px;
  .s-button{padding: 4px 10px;}
}
.bag-icon{width: 64px;height: 100px;margin-bottom:10px;}

.warn .title{height: 46px;width: 100%;background-size: 100%100%; background-image: url('../../../assets/images/me/share_title_bg.png')}
.warn .body{margin: 15px;}

.dialog{margin: 0 20px;
  .body{margin-bottom: 10px;padding:20px 0;
    .code{width: 100px;height: 100px;}
    .type{display: flex;flex-wrap: wrap;padding: 20px 20px 0;    width: -webkit-fill-available;
      .item{width: 33%;text-align: center;margin-bottom: 10px;
        i{width:44px;height: 44px;display: inline-block;background-size: 100%100%; 
          &.wx{background-image: url('../../../assets/images/me/wx.png');}
          &.friends{background-image: url('../../../assets/images/me/friends.png');}
          &.qq{background-image: url('../../../assets/images/me/qq.png');}
          &.sina{background-image: url('../../../assets/images/me/sina.png');}
          &.link{background-image: url('../../../assets/images/me/link.png');}
        }
      }
    }
  }
  .bg{background: #ffffff;border-radius: 4px;}
}

</style>
