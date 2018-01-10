<template>
  <page :headerTitle="`邀请好友`">
    <div slot="contain">
        <div class='content'>
          <img :src="require('assets/images/me/bag.png')" class='bag-icon'>
          <p v-if="titleConfig">{{titleConfig}}</p>
          <p v-if="subtitleConfig" class='f20'>{{subtitleConfig}}</p>
          <p class='s-button khaki mt20' @click="ShareQQ">立即邀请</p>
        </div>
      <div class='warn' v-if="ruleConfig">
        <div class='title'></div>
        <div class='body'>{{ruleConfig}}</div>
      </div>

      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: 'auto', 'background-color': 'transparent'}">
        <div class="dialog">
            <div class="bg body">
              <qrcode value="http://jufang.zmaxfilm.com/#/Home" type="canvas" :size='100' ></qrcode>
              <!-- <img class="code" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514203011952&di=f382d7d2131f6277edb1cb8ef7b58ee5&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2F86%2F68%2F4%2Fe51eac8a98c2bd65c6b68bae86c_p1_mk1_wm35.gif"> -->
              <p>扫二维码向朋友分享</p>
              <div class="type">
                <div class="item" @click="ShareFriend"> <i class="wx"></i> <p>微信</p> </div>
                <div class="item" @click="friendArea"> <i class="friends"></i> <p>朋友圈</p> </div>
                <div class="item" @click="ShareQQ"> <i class="qq"></i> <p>QQ</p> </div>
                <div class="item" @click="ShareSina"> <i class="sina"></i> <p>QQ空间</p> </div>
                <!-- <div class="item"> <i class="link"></i> <p>复制邀请链接</p> </div> -->
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
import { XDialog,Qrcode } from 'vux'
import theatreApi from "api/theatreApi";
export default {
  data(){
    return{
      showDialogStyle: false,
      titleConfig: '',
      subtitleConfig: '',
      ruleConfig: ''
    }
  },
  components:{XDialog,Qrcode},
  methods:{
    fetchData(){
      theatreApi.getMiscConfig('invite_reg_title').then(res=>{
          if (res.data && res.data.length > 0) {
            this.titleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      theatreApi.getMiscConfig('invite_reg_subtitle').then(res=>{
          if (res.data && res.data.length > 0) {
            this.subtitleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      theatreApi.getMiscConfig('invite_reg_rule').then(res=>{
          if (res.data && res.data.length > 0) {
            this.ruleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
    },
    ShareQQ(){
      wx.ready(function(){ 
        wx.onMenuShareQQ({
          title: '这是一个测试的标题', // 分享标题
          desc: '这个是分享QQ的描述信息', // 分享描述
          link: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享链接
          imgUrl: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享图标
          success: function () {
          // 用户确认分享后执行的回调函数
          alert('分享成功');
          },
          cancel: function () {
            alert('你没有分享');
          // 用户取消分享后执行的回调函数
          }
        });
      });
    },
    ShareFriend(){
      wx.onMenuShareAppMessage({
        title: '这是一个测试的标题', // 分享标题
        desc: '这个是分享QQ的描述信息', // 分享描述
        link: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享链接
        imgUrl: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功');
        },
        cancel: function () {
          alert('你没有分享');
        // 用户取消分享后执行的回调函数
        }
      });
    },
    friendArea(){
      wx.onMenuShareTimeline({
        title: '这是一个测试的标题', // 分享标题
        desc: '这个是分享QQ的描述信息', // 分享描述
        link: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享链接
        imgUrl: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功');
        },
        cancel: function () {
          alert('你没有分享');
        // 用户取消分享后执行的回调函数
        }
      });
    },
    ShareSina(){
        wx.onMenuShareQZone({
        title: '这是一个测试的标题', // 分享标题
        desc: '这个是分享空间的描述信息', // 分享描述
        link: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享链接
        imgUrl: 'https://upload-images.jianshu.io/upload_images/5928779-e2548546e1a73321.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功');
        },
        cancel: function () {
          alert('你没有分享');
        // 用户取消分享后执行的回调函数
        }
      });
    }
  }
}
</script>


  
<style lang="less" scoped>
.content{margin: 75px 3px;display: flex;flex-direction: column;align-items: center; text-align: center;font-size: 16px;
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
